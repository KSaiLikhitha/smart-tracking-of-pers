// ✅ backend/server.js
const express = require("express");
const bodyParser = require("body-parser");
const NodeCouchDb = require("node-couchdb");
const { authenticate, isUserInGroup } = require("./ldapAuth");

const app = express();

// ✅ Middleware setup
app.use(bodyParser.json());

// ✅ CORS configuration
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  next();
});
app.options("*", (req, res) => res.sendStatus(200));

// ✅ CouchDB connection setup
const couch = new NodeCouchDb({
  auth: {
    user: "admin",  // Replace with your CouchDB username
    pass: "user",   // Replace with your CouchDB password
  },
});

const dbName = "salesforcedata";
const viewUrl = "_design/all_docs/_view/all";

// ✅ API: Get all Salesforce data
app.get("/api/salesforce-data", (req, res) => {
  couch.get(dbName, viewUrl).then(
    (data) => {
      const result = data.data.rows.map((row) => {
        const doc = { id: row.id, ...row.value };
        return doc;
      });
      res.json(result);
    },
    (err) => {
      console.error("❌ CouchDB fetch error:", err.message);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  );
});

// ✅ API: Get document by ID
app.get("/api/salesforce-data/:id", (req, res) => {
  const id = req.params.id;
  couch.get(dbName, id).then(
    (data) => res.json(data.data),
    (err) => {
      console.error("❌ Document fetch error:", err.message);
      res.status(500).json({ error: "Failed to fetch document" });
    }
  );
});

// ✅ API: Delivery Manager login
app.post("/api/login-dm", async (req, res) => {
  const { email, password } = req.body;
  const groupName = "PER"; // Replace with actual group name if needed

  if (!email || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  authenticate(email, password, async (err, isAuth) => {
    if (err || !isAuth) {
      console.warn("❌ LDAP auth failed:", err?.message || "Invalid credentials");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const inGroup = await isUserInGroup(email, groupName);
    if (!inGroup) {
      console.warn(`❌ Access denied: ${email} not in group ${groupName}`);
      return res.status(403).json({ message: "Access denied: Not in Delivery Manager group" });
    }

    console.log(`✅ Login success: ${email} in group ${groupName}`);
    res.json({ message: "Login successful", role: "DeliveryManager" });
  });
});

// ✅ API: Project Executive login
app.post("/api/login-pe", async (req, res) => {
  const { email, password } = req.body;
  const groupName = "PE"; // Group name for Project Executives

  if (!email || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  authenticate(email, password, async (err, isAuth) => {
    if (err || !isAuth) {
      console.warn("❌ LDAP auth failed:", err?.message || "Invalid credentials");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const inGroup = await isUserInGroup(email, groupName);
    if (!inGroup) {
      console.warn(`❌ Access denied: ${email} not in group ${groupName}`);
      return res.status(403).json({ message: "Access denied: Not in Project Executive group" });
    }

    console.log(`✅ Login success: ${email} in group ${groupName}`);
    res.json({ message: "Login successful", role: "ProjectExecutive" });
  });
});


// ✅ Server start
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend server running at http://localhost:${PORT}`);
});
