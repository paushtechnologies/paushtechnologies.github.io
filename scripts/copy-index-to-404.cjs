// scripts/copy-index-to-404.js
const fs = require("fs");
const path = require("path");

const distIndex = path.join(__dirname, "..", "dist", "index.html");
const dist404 = path.join(__dirname, "..", "dist", "404.html");

if (fs.existsSync(distIndex)) {
  fs.copyFileSync(distIndex, dist404);
  console.log("Copied index.html -> 404.html");
} else {
  console.error("dist/index.html not found. Run build first.");
  process.exit(1);
}
