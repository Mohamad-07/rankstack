/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const targets = ["content", "components", "app", "Data", "constant"];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      walk(full, out);
    } else if (/\.(js|jsx|ts|tsx|mjs)$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

const urlRe = /(?:href|src)=["'{](https?:\/\/[^"'}\s>]+)/g;
const bareRe = /https?:\/\/[^\s"'<>)\]}]+/g;

const rows = [];
for (const t of targets) {
  const files = walk(path.join(root, t));
  for (const file of files) {
    const rel = path.relative(root, file).replace(/\\/g, "/");
    const text = fs.readFileSync(file, "utf8");
    const lines = text.split(/\r?\n/);
    lines.forEach((line, i) => {
      let m;
      urlRe.lastIndex = 0;
      while ((m = urlRe.exec(line))) {
        rows.push({ file: rel, line: i + 1, url: m[1], attr: "href/src" });
      }
    });
  }
}

// Group by hostname
const byHost = {};
for (const r of rows) {
  let host = "";
  try {
    host = new URL(r.url).hostname;
  } catch {
    host = "(invalid)";
  }
  (byHost[host] = byHost[host] || []).push(r);
}

const hosts = Object.keys(byHost).sort((a, b) => byHost[b].length - byHost[a].length);
console.log(`TOTAL external href/src links: ${rows.length}`);
console.log(`Distinct hosts: ${hosts.length}\n`);
for (const h of hosts) {
  console.log(`### ${h}  (${byHost[h].length})`);
  for (const r of byHost[h]) {
    console.log(`  ${r.file}:${r.line}  ${r.url}`);
  }
  console.log("");
}
