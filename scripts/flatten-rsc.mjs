/**
 * Post-build fix for Next 16 static export: the client prefetches segment payloads at flat paths
 * (e.g. /academy/__next.academy.__PAGE__.txt) but the export writes them nested
 * (/academy/__next.academy/__PAGE__.txt). Copy every nested payload to its flat name.
 */
import fs from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "out");
let copied = 0;

function walkSegments(baseDir, segDir, prefix) {
  for (const entry of fs.readdirSync(segDir, { withFileTypes: true })) {
    const full = path.join(segDir, entry.name);
    const flatName = `${prefix}.${entry.name}`;
    if (entry.isDirectory()) walkSegments(baseDir, full, flatName);
    else if (entry.name.endsWith(".txt")) {
      const target = path.join(baseDir, flatName);
      if (!fs.existsSync(target)) {
        fs.copyFileSync(full, target);
        copied++;
      }
    }
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith("__next.")) walkSegments(dir, full, entry.name);
    else walk(full);
  }
}

if (fs.existsSync(OUT)) {
  walk(OUT);
  console.log(`flatten-rsc: wrote ${copied} prefetch payload(s)`);
}
