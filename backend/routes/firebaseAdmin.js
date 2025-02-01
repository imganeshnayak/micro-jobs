import admin from "firebase-admin";
import fs from "fs";
import path from "path";

// Get absolute path
const serviceAccountPath = path.resolve("serviceAccountKey.json");

// Read JSON file synchronously
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
