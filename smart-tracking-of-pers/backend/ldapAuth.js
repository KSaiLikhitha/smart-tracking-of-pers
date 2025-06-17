// ✅ backend/ldapAuth.js
const ldap = require("ldapjs");
const axios = require("axios");
const { DOMParser } = require("xmldom");
const xpath = require("xpath");

const ldapConfig = {
  options: {
    url: "ldaps://bluepages.ibm.com:636",
  },
};

// 🔍 Get DN from Bluepages XML API using email
async function getDNFromBluepages(email) {
  const url = `https://bluepages.ibm.com/BpHttpApisv3/slaphapi?ibmperson/preferredidentity=${email}.list/byxml`;
  try {
    const { data: xml } = await axios.get(url);
    const doc = new DOMParser().parseFromString(xml);
    const dnAttr = xpath.select1("//entry/@dn", doc);
    return dnAttr ? dnAttr.value : null;
  } catch (err) {
    console.error("❌ Error fetching DN from Bluepages:", err.message);
    return null;
  }
}

// ✅ Authenticate user using DN from Bluepages and password
async function authenticate(email, password, callback) {
  if (!email || !password || !callback) {
    const error = new Error("Invalid arguments");
    if (!callback) console.error(error);
    else callback(error, false);
    return;
  }

  const dn = await getDNFromBluepages(email);
  if (!dn) {
    console.warn("❌ No DN found for email:", email);
    return callback(null, false);
  }

  const ldapClient = ldap.createClient(ldapConfig.options);

  ldapClient.bind(dn, password, (err) => {
    if (err) {
      console.error("❌ LDAP bind failed:", err.message);
      return callback(null, false);
    }
    console.log("✅ LDAP bind successful for", dn);
    ldapClient.unbind();
    return callback(null, true);
  });
}

// ✅ Check if user is in a group via Bluepages group check API
async function isUserInGroup(email, groupName) {
  const url = `https://bluepages.ibm.com/tools/groups/groupsxml.wss?task=inAGroup&email=${email}&group=${groupName}`;

  try {
    const { data: xml } = await axios.get(url);
    const doc = new DOMParser().parseFromString(xml);
    const rc = xpath.select("//rc/text()", doc)[0];
    return rc && rc.nodeValue === "0";
  } catch (error) {
    console.error("Error checking group membership:", error.message);
    return false;
  }
}

// ✅ Optionally still used to pre-check if a user exists
async function checkIfUserExists(email, callback) {
  const dn = await getDNFromBluepages(email);
  callback(null, !!dn);
}

module.exports = {
  authenticate,
  isUserInGroup,
  checkIfUserExists,
};
