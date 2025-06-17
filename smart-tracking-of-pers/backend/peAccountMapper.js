// backend/utils/peAccountMapper.js
const XLSX = require("xlsx");
const path = require("path");

const sheet1Path = path.join(
  "/Users/kambojisailikhitha/Documents/IBM_Sterling_B2B_Integration_SaaS_Clients.xlsx"
);
const sheet2Path = path.join(
  "/Users/kambojisailikhitha/Documents/Distribution_sheet.xlsx"
);

// 📌 Get all Account Names for a given Project Executive Email
function getAccountNamesByPEEmail(peEmail) {
  // Load workbook 1 and map email to Project Executive name
  const wb1 = XLSX.readFile(sheet1Path);
  const sheet1 = wb1.Sheets[wb1.SheetNames[0]];
  const sheet1Data = XLSX.utils.sheet_to_json(sheet1);

  const peEntry = sheet1Data.find(
    (row) => row["Project Executive Email"]?.toLowerCase() === peEmail.toLowerCase()
  );

  if (!peEntry) return [];

  const peName = peEntry["Project Executive"];
  if (!peName) return [];

  // Load workbook 2 and find Account Names for the Project Executive
  const wb2 = XLSX.readFile(sheet2Path);
  const sheet2 = wb2.Sheets[wb2.SheetNames[0]];
  const sheet2Data = XLSX.utils.sheet_to_json(sheet2);

  const accountNames = sheet2Data
    .filter((row) => row["Project Executive"]?.toLowerCase() === peName.toLowerCase())
    .map((row) => row["Account Name"]);

  return accountNames;
}

module.exports = { getAccountNamesByPEEmail };
