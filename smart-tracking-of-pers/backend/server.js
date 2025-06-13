// backend/server.js
const express = require("express");
const bodyParser = require("body-parser");
const NodeCouchDb = require("node-couchdb");
const fetch = require("node-fetch");
const xpath = require("xpath");
const { DOMParser } = require("xmldom");
const fs = require("fs");

const app = express();

app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const couch = new NodeCouchDb({
  auth: {
    user: "admin",
    pass: "user",
  },
});

const dbName = "salesforcedata";
const viewUrl = "_design/all_docs/_view/all";

// API to fetch data
app.get("/api/salesforce-data", (req, res) => {
  couch.get(dbName, viewUrl).then(
    (data) => {
      const result = data.data.rows.map((row) => {
        const doc = { id: row.id };
        for (const key in row.value) {
          doc[key] = row.value[key];
        }
        return doc;
      });
      res.json(result);
    },
    (err) => {
      res.status(500).json({ error: err });
    }
  );
});

// API to fetch by ID
app.get("/api/salesforce-data/:id", (req, res) => {
  const id = req.params.id;
  couch.get(dbName, id).then(
    (data) => res.json(data.data),
    (err) => res.status(500).json({ error: err })
  );
});

// Authentication API using email
app.post("/api/authenticate-email", async (req, res) => {
  const { email } = req.body;
  if (!email)
    return res.status(400).json({ success: false, message: "Email required" });

  try {
    const url = `https://bluepages.ibm.com/BpHttpApisv3/slaphapi?ibmperson/preferredidentity=${email}.list/byxml`;
    const response = await fetch(url);
    const xml = await response.text();

    const doc = new DOMParser().parseFromString(xml);
    const nodes = xpath.select("//entry/@dn", doc);
    const dnValue = nodes.length > 0 ? nodes[0].value : null;

    const uidMatch = dnValue && dnValue.match(/uid=([^,]+)/);
    const uid = uidMatch ? uidMatch[1] : null;

    if (!uid)
      return res.status(404).json({ success: false, message: "UID not found" });

    const deliveryManagers = JSON.parse(
      fs.readFileSync("./backend/deliveryManagers.json")
    ).allowedUIDs;

    if (deliveryManagers.includes(uid)) {
      res.json({ success: true, role: "deliveryManager", uid });
    } else {
      res.status(403).json({ success: false, message: "Not authorized" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error verifying user" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
