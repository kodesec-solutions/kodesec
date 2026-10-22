/**
 * Tell Bing, Yandex and other IndexNow engines which URLs exist after a production deploy.
 * Run by .github/workflows/deploy-cloudflare.yml on push to master. Run locally: node scripts/indexnow.mjs
 * The key file public/<key>.txt proves we own the host. Failures never fail the deploy.
 */
import fs from "node:fs";
import path from "node:path";

const HOST = "kodesec.com";
const KEY = "07450c0b6128987c5869772e7e387e88";
const out = path.join(process.cwd(), "out");

const locs = (file) => [...fs.readFileSync(path.join(out, file), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const urlList = locs("sitemap.xml").flatMap((child) => locs(new URL(child).pathname));

try {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
  });
  console.log(`IndexNow: submitted ${urlList.length} URLs, HTTP ${res.status}`);
} catch (e) {
  console.warn("IndexNow failed (ignored):", e.message);
}
