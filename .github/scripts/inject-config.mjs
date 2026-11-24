// Copies index.html into _site/ with the FIREBASE_CONFIG secret filled in.
// The real values never get committed.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const raw = (process.env.FIREBASE_CONFIG || "").trim();
const body = raw.match(/\{[\s\S]*\}/)?.[0] ?? "";
const config = {};
for (const key of ["apiKey", "authDomain", "projectId", "storageBucket", "messagingSenderId", "appId"]) {
  const value = body.match(new RegExp(`["']?\\b${key}["']?\\s*:\\s*["']([^"']+)["']`))?.[1];
  if (!value) {
    console.error(`The FIREBASE_CONFIG secret is missing "${key}". Paste the whole firebaseConfig object.`);
    process.exit(1);
  }
  config[key] = value;
}

const page = readFileSync("index.html", "utf8");
const block = /const FIREBASE_CONFIG = \{[\s\S]*?\n\};/;
if (!block.test(page)) {
  console.error("Couldn't find the FIREBASE_CONFIG block in index.html.");
  process.exit(1);
}
mkdirSync("_site", { recursive: true });
writeFileSync("_site/index.html", page.replace(block, () => `const FIREBASE_CONFIG = ${JSON.stringify(config, null, 2)};`));
console.log("Built _site/index.html");
