/**
 * Generates the animated service illustrations in public/media/services/*.svg.
 * They are self-contained animated SVGs (CSS keyframes), so they animate inside <img>, stay crisp
 * at any size and weigh a few KB. Any of them can be replaced by a .gif/.webp/.mp4 — just point the
 * `media` field in content/services/*.md at the new file.
 *
 *   node scripts/gen-service-media.mjs
 */
import fs from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "public/media/services");
fs.mkdirSync(OUT, { recursive: true });

const C = {
  bg: "#0a0f0d",
  panel: "#111816",
  panel2: "#161f1c",
  line: "rgba(255,255,255,0.08)",
  line2: "rgba(255,255,255,0.14)",
  text: "#e6ede9",
  muted: "#7d8a83",
  dim: "#4b5752",
  red: "#f87171",
  amber: "#fbbf24",
  green: "#2ecc71",
  mint: "#b8f5d2",
};
const ACCENT = { emerald: "#2ecc71", violet: "#a78bfa", sky: "#38bdf8", amber: "#fbbf24", rose: "#fb7185" };
const SANS = "Inter, Segoe UI, system-ui, -apple-system, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Consolas, Menlo, monospace";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function svg(w, h, body, css = "") {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
<style>
text{font-family:${SANS}}
.m{font-family:${MONO}}
${css}
@media (prefers-reduced-motion: reduce){*{animation:none!important}}
</style>
<rect width="${w}" height="${h}" rx="20" fill="${C.bg}"/>
<rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="19.5" fill="none" stroke="${C.line2}"/>
${body}
</svg>
`;
}

// dotted background texture
const dots = (w, h, gap = 22, o = 0.07) => {
  let s = "";
  for (let y = gap; y < h; y += gap) for (let x = gap; x < w; x += gap) s += `<circle cx="${x}" cy="${y}" r="1" fill="#fff" opacity="${o}"/>`;
  return s;
};

const icons = {
  check: (x, y, c = C.green, s = 1) =>
    `<g transform="translate(${x} ${y}) scale(${s})"><circle r="9" fill="${c}" opacity="0.16"/><path d="M-4 0l3 3 5-6" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g>`,
  warn: (x, y, c = C.red, s = 1) =>
    `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 -8 L8 6 L-8 6 Z" fill="${c}" opacity="0.18" stroke="${c}" stroke-width="1.5" stroke-linejoin="round"/><path d="M0 -2v3" stroke="${c}" stroke-width="1.6" stroke-linecap="round"/><circle cy="3.8" r="0.9" fill="${c}"/></g>`,
  lock: (x, y, c = C.green) =>
    `<g transform="translate(${x} ${y})"><rect x="-7" y="-2" width="14" height="11" rx="2.5" fill="${c}" opacity="0.2" stroke="${c}" stroke-width="1.5"/><path d="M-4 -2v-3a4 4 0 0 1 8 0v3" fill="none" stroke="${c}" stroke-width="1.5"/></g>`,
};

// ---------------------------------------------------------------- tiles (560 x 400)

function attackPaths(a) {
  const nodes = [
    [110, 110], [110, 290], [230, 70], [230, 200], [230, 330], [360, 130], [360, 270], [460, 200],
  ];
  const edges = [[0, 3], [1, 3], [2, 5], [3, 5], [3, 6], [4, 6], [5, 7], [6, 7]];
  const path = [[1, 3], [3, 6], [6, 7]];
  let body = dots(560, 400);
  body += edges.map(([i, j]) => `<line x1="${nodes[i][0]}" y1="${nodes[i][1]}" x2="${nodes[j][0]}" y2="${nodes[j][1]}" stroke="${C.line2}" stroke-width="1.5"/>`).join("");
  body += path
    .map(([i, j], k) => `<line class="p p${k}" x1="${nodes[i][0]}" y1="${nodes[i][1]}" x2="${nodes[j][0]}" y2="${nodes[j][1]}" stroke="${C.red}" stroke-width="3" stroke-linecap="round" pathLength="1"/>`)
    .join("");
  body += nodes
    .slice(0, 7)
    .map(([x, y], i) => `<g class="n n${i}"><circle cx="${x}" cy="${y}" r="20" fill="${C.panel2}" stroke="${C.line2}"/>${icons.warn(x, y, i % 3 === 0 ? C.amber : C.red, 0.9)}</g>`)
    .join("");
  body += `<circle cx="460" cy="200" r="34" fill="${a}" opacity="0.15"><animate attributeName="r" values="30;44;30" dur="2.4s" repeatCount="indefinite"/></circle><circle cx="460" cy="200" r="28" fill="${C.panel}" stroke="${a}" stroke-width="2"/><text x="460" y="205" text-anchor="middle" font-size="12" font-weight="700" fill="${a}">DATA</text>`;
  body += `<text x="28" y="372" class="m" font-size="12" fill="${C.muted}">attack path · 3 hops · <tspan fill="${C.red}">critical</tspan></text>`;
  const css = `.p{stroke-dasharray:1;stroke-dashoffset:1;animation:draw 6s infinite}.p1{animation-delay:.6s}.p2{animation-delay:1.2s}
@keyframes draw{0%,8%{stroke-dashoffset:1}25%,80%{stroke-dashoffset:0}92%,100%{stroke-dashoffset:1}}
.n{animation:pulse 3s infinite}.n3{animation-delay:.4s}.n6{animation-delay:.8s}
@keyframes pulse{0%,100%{opacity:.75}50%{opacity:1}}`;
  return svg(560, 400, body, css);
}

function scanVerify(a) {
  let body = dots(560, 400, 22, 0.05);
  const rows = 6, cols = 9;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const x = 70 + c * 52, y = 80 + r * 46;
      const keep = (r * 7 + c * 3) % 5 === 0;
      body += `<g class="cell" style="animation-delay:${(c * 0.18).toFixed(2)}s">
<g class="bad">${icons.warn(x, y, keep ? C.red : C.amber, 0.85)}</g>
<g class="${keep ? "real" : "gone"}">${keep ? icons.warn(x, y, C.red, 1.05) : `<circle cx="${x}" cy="${y}" r="3" fill="${C.dim}"/>`}</g></g>`;
    }
  body += `<g class="scan"><rect x="-3" y="50" width="6" height="300" rx="3" fill="${a}"/><rect x="-40" y="50" width="80" height="300" fill="${a}" opacity="0.08"/></g>`;
  body += `<text x="28" y="378" class="m" font-size="12" fill="${C.muted}">1,284 alerts → <tspan fill="${C.red}">11 exploitable</tspan> · manually verified</text>`;
  const css = `.scan{animation:sweep 5s linear infinite}
@keyframes sweep{0%{transform:translateX(40px)}70%,100%{transform:translateX(540px)}}
.cell .bad{animation:bad 5s infinite;animation-delay:inherit}.cell .real,.cell .gone{opacity:0;animation:good 5s infinite;animation-delay:inherit}
@keyframes bad{0%,10%{opacity:1}20%,85%{opacity:0}100%{opacity:1}}
@keyframes good{0%,10%{opacity:0}20%,85%{opacity:1}100%{opacity:0}}`;
  return svg(560, 400, body, css);
}

function findingsToFixed(a) {
  const rows = [
    ["IDOR on /api/invoices/:id", "HIGH", C.red],
    ["Stored XSS in comments", "HIGH", C.red],
    ["Missing rate limit on login", "MED", C.amber],
    ["Verbose error messages", "LOW", C.muted],
    ["Weak TLS configuration", "MED", C.amber],
  ];
  let body = `<rect x="28" y="28" width="504" height="344" rx="14" fill="${C.panel}" stroke="${C.line}"/>
<text x="52" y="62" font-size="15" font-weight="600" fill="${C.text}">Findings</text>
<text x="508" y="62" text-anchor="end" class="m" font-size="12" fill="${C.muted}"><tspan class="cnt">0</tspan>/5 fixed</text>`;
  rows.forEach(([t, sev, c], i) => {
    const y = 90 + i * 54;
    body += `<g><rect x="44" y="${y}" width="472" height="44" rx="10" fill="${C.panel2}" stroke="${C.line}"/>
<rect x="58" y="${y + 13}" width="44" height="18" rx="9" fill="${c}" opacity="0.15"/><text x="80" y="${y + 26}" text-anchor="middle" class="m" font-size="10" font-weight="700" fill="${c}">${sev}</text>
<text x="116" y="${y + 27}" font-size="13" fill="${C.text}">${esc(t)}</text>
<g class="st st${i}"><rect x="420" y="${y + 11}" width="82" height="22" rx="11" fill="${C.green}" opacity="0.15"/><text x="461" y="${y + 26}" text-anchor="middle" class="m" font-size="11" font-weight="700" fill="${C.green}">✓ FIXED</text></g>
<g class="op op${i}"><rect x="420" y="${y + 11}" width="82" height="22" rx="11" fill="none" stroke="${C.line2}"/><text x="461" y="${y + 26}" text-anchor="middle" class="m" font-size="11" fill="${C.muted}">OPEN</text></g></g>`;
  });
  let css = "";
  rows.forEach((_, i) => {
    const d = (0.6 + i * 0.7).toFixed(1);
    css += `.st${i}{opacity:0;animation:on 7s infinite;animation-delay:${d}s}.op${i}{animation:off 7s infinite;animation-delay:${d}s}`;
  });
  css += `@keyframes on{0%{opacity:0}6%,80%{opacity:1}90%,100%{opacity:0}}@keyframes off{0%{opacity:1}6%,80%{opacity:0}90%,100%{opacity:1}}`;
  body = body.replace('<tspan class="cnt">0</tspan>', `<tspan fill="${a}">5</tspan>`);
  return svg(560, 400, body, css);
}

function secureCode(a) {
  const lines = [
    ["kw", "app.get(\"/api/invoices/:id\", auth, async (req, res) => {"],
    ["bad", "  const inv = await db.invoice.find({ id: req.params.id });"],
    ["good", "  const inv = await db.invoice.find({ id: req.params.id, owner: req.user.id });"],
    ["n", "  if (!inv) return res.status(404).end();"],
    ["n", "  res.json(inv);"],
    ["kw", "});"],
  ];
  let body = `<rect x="28" y="28" width="504" height="344" rx="14" fill="${C.panel}" stroke="${C.line}"/>
<circle cx="50" cy="50" r="5" fill="${C.dim}"/><circle cx="66" cy="50" r="5" fill="${C.dim}"/><circle cx="82" cy="50" r="5" fill="${C.dim}"/>
<text x="508" y="54" text-anchor="end" class="m" font-size="11" fill="${C.muted}">invoices.ts</text>
<line x1="28" y1="72" x2="532" y2="72" stroke="${C.line}"/>`;
  let y = 110;
  lines.forEach(([k, t]) => {
    const col = k === "kw" ? "#c4b5fd" : C.text;
    if (k === "bad")
      body += `<g class="bad"><rect x="40" y="${y - 16}" width="480" height="24" fill="${C.red}" opacity="0.12"/><text x="52" y="${y}" class="m" font-size="11.5" fill="${C.red}">- ${esc(t.trim())}</text></g>`;
    else if (k === "good") {
      body += `<g class="good"><rect x="40" y="${y - 16 - 34}" width="480" height="24" fill="${C.green}" opacity="0.12"/><text x="52" y="${y - 34}" class="m" font-size="10.4" fill="${C.green}">+ ${esc(t.trim())}</text></g>`;
      return;
    } else body += `<text x="52" y="${y}" class="m" font-size="11.5" fill="${col}">${esc(t)}</text>`;
    y += 34;
  });
  body += `<g class="badge"><rect x="360" y="318" width="156" height="34" rx="17" fill="${a}" opacity="0.16"/><text x="438" y="340" text-anchor="middle" class="m" font-size="12" font-weight="700" fill="${a}">✓ ownership check</text></g>`;
  const css = `.bad{animation:bad 6s infinite}.good{opacity:0;animation:good 6s infinite}.badge{opacity:0;animation:good 6s infinite;animation-delay:.3s}
@keyframes bad{0%,35%{opacity:1}45%,90%{opacity:0}100%{opacity:1}}
@keyframes good{0%,40%{opacity:0}50%,88%{opacity:1}100%{opacity:0}}`;
  return svg(560, 400, body, css);
}

function pipeline(a) {
  const st = ["Commit", "Build", "Test", "Scan", "Deploy"];
  let body = dots(560, 400);
  const y = 190;
  body += `<line x1="70" y1="${y}" x2="490" y2="${y}" stroke="${C.line2}" stroke-width="2"/>`;
  body += `<line class="flow" x1="70" y1="${y}" x2="490" y2="${y}" stroke="${a}" stroke-width="3" pathLength="1"/>`;
  st.forEach((s, i) => {
    const x = 70 + i * 105;
    body += `<g><circle cx="${x}" cy="${y}" r="24" fill="${C.panel2}" stroke="${C.line2}"/>
<g class="ok ok${i}">${icons.check(x, y, a, 1.35)}</g>
<text x="${x}" y="${y + 50}" text-anchor="middle" font-size="13" fill="${C.text}">${s}</text></g>`;
  });
  body += `<rect x="150" y="286" width="260" height="40" rx="20" fill="${C.panel}" stroke="${C.line}"/>
<text x="280" y="311" text-anchor="middle" class="m" font-size="12" fill="${C.muted}">main · <tspan fill="${a}">deployed in 4m 12s</tspan></text>`;
  body += `<text x="280" y="112" text-anchor="middle" class="m" font-size="12" fill="${C.muted}">every change · every time</text>`;
  let css = `.flow{stroke-dasharray:1;stroke-dashoffset:1;animation:flow 6s infinite}
@keyframes flow{0%{stroke-dashoffset:1}60%,85%{stroke-dashoffset:0}100%{stroke-dashoffset:0;opacity:0}}`;
  st.forEach((_, i) => (css += `.ok${i}{opacity:0;animation:ok 6s infinite;animation-delay:${(i * 0.72).toFixed(2)}s}`));
  css += `@keyframes ok{0%,2%{opacity:0;transform:scale(.6)}8%,80%{opacity:1}95%,100%{opacity:0}}.ok{transform-box:fill-box;transform-origin:center}`;
  return svg(560, 400, body, css);
}

function architecture(a) {
  const layers = [
    ["Clients", "web · mobile · partners", 70],
    ["API gateway", "auth · rate limits · WAF", 160],
    ["Services", "orders · billing · users", 250],
    ["Data", "postgres · redis · object storage", 340],
  ];
  let body = dots(560, 400, 22, 0.05);
  layers.forEach(([t, s, y], i) => {
    body += `<g class="l l${i}"><rect x="90" y="${y - 32}" width="380" height="56" rx="12" fill="${C.panel}" stroke="${i === 1 ? a : C.line2}"/>
<text x="112" y="${y - 3}" font-size="14" font-weight="600" fill="${C.text}">${t}</text><text x="112" y="${y + 15}" class="m" font-size="11" fill="${C.muted}">${s}</text>
${i === 1 || i === 3 ? icons.lock(440, y - 4, a) : ""}</g>`;
    if (i < 3) body += `<line x1="280" y1="${y + 24}" x2="280" y2="${y + 58}" stroke="${a}" stroke-width="2" class="dash"/>`;
  });
  let css = `.dash{stroke-dasharray:4 5;animation:d 1s linear infinite}@keyframes d{to{stroke-dashoffset:-18}}`;
  layers.forEach((_, i) => (css += `.l${i}{animation:up 6s infinite;animation-delay:${i * 0.25}s}`));
  css += `@keyframes up{0%{opacity:.35}12%,85%{opacity:1}100%{opacity:.35}}`;
  return svg(560, 400, body, css);
}

function cloudMap(a) {
  const clouds = [
    ["AWS", 120, 120],
    ["Azure", 440, 120],
    ["GCP", 280, 300],
  ];
  let body = dots(560, 400);
  body += `<g stroke="${C.line2}" stroke-width="1.5"><line x1="120" y1="120" x2="440" y2="120"/><line x1="120" y1="120" x2="280" y2="300"/><line x1="440" y1="120" x2="280" y2="300"/></g>`;
  body += `<g class="ping"><circle cx="280" cy="180" r="10" fill="${a}" opacity="0.3"/></g><circle cx="280" cy="180" r="30" fill="${C.panel2}" stroke="${a}" stroke-width="2"/><text x="280" y="185" text-anchor="middle" font-size="11" font-weight="700" fill="${a}">1 view</text>`;
  clouds.forEach(([t, x, y], i) => {
    body += `<g><rect x="${x - 62}" y="${y - 34}" width="124" height="68" rx="14" fill="${C.panel}" stroke="${C.line2}"/>
<text x="${x}" y="${y - 8}" text-anchor="middle" font-size="14" font-weight="600" fill="${C.text}">${t}</text>`;
    for (let k = 0; k < 5; k++) body += `<rect class="res r${(i + k) % 5}" x="${x - 44 + k * 18}" y="${y + 6}" width="12" height="12" rx="3" fill="${k === (i + 2) % 5 ? C.red : a}" opacity="0.8"/>`;
    body += `</g>`;
  });
  body += `<text x="28" y="378" class="m" font-size="12" fill="${C.muted}">142 resources · <tspan fill="${C.red}">1 public bucket</tspan> → <tspan fill="${a}">fixed</tspan></text>`;
  const css = `.ping{transform-box:fill-box;transform-origin:center;animation:p 2.4s infinite}@keyframes p{0%{transform:scale(1);opacity:1}100%{transform:scale(6);opacity:0}}
.res{animation:r 3s infinite}.r1{animation-delay:.3s}.r2{animation-delay:.6s}.r3{animation-delay:.9s}.r4{animation-delay:1.2s}
@keyframes r{0%,100%{opacity:.35}50%{opacity:1}}`;
  return svg(560, 400, body, css);
}

function deployTerm(a) {
  const lines = [
    [C.muted, "$ terraform apply -auto-approve"],
    [C.text, "aws_vpc.main: Creating..."],
    [C.text, "aws_subnet.private[0]: Creating..."],
    [C.text, "aws_db_instance.primary: Creating... (encrypted)"],
    [C.text, "aws_ecs_service.api: Creating..."],
    [C.text, "aws_cloudwatch_alarm.p95: Creating..."],
    [a, "Apply complete! Resources: 24 added, 0 changed."],
  ];
  let body = `<rect x="28" y="28" width="504" height="344" rx="14" fill="#050807" stroke="${C.line}"/>
<circle cx="50" cy="50" r="5" fill="${C.dim}"/><circle cx="66" cy="50" r="5" fill="${C.dim}"/><circle cx="82" cy="50" r="5" fill="${C.dim}"/>
<text x="508" y="54" text-anchor="end" class="m" font-size="11" fill="${C.muted}">production</text>`;
  lines.forEach(([c, t], i) => (body += `<text class="t t${i}" x="50" y="${100 + i * 34}" font-family="${MONO}" font-size="12.5" fill="${c}">${esc(t)}</text>`));
  body += `<rect x="50" y="340" width="460" height="6" rx="3" fill="${C.panel2}"/><rect class="bar" x="50" y="340" width="460" height="6" rx="3" fill="${a}"/>`;
  let css = `.bar{transform-origin:50px 343px;animation:b 7s infinite}@keyframes b{0%{transform:scaleX(0)}75%,90%{transform:scaleX(1)}100%{transform:scaleX(0)}}`;
  lines.forEach((_, i) => (css += `.t${i}{opacity:0;animation:t 7s infinite;animation-delay:${(i * 0.75).toFixed(2)}s}`));
  css += `@keyframes t{0%{opacity:0}4%,85%{opacity:1}95%,100%{opacity:0}}`;
  return svg(560, 400, body, css);
}

function cost(a) {
  const hi = [220, 190, 240, 210, 230, 200, 215];
  const lo = [150, 120, 130, 110, 100, 95, 90];
  let body = `<rect x="28" y="28" width="504" height="344" rx="14" fill="${C.panel}" stroke="${C.line}"/>
<text x="52" y="64" font-size="15" font-weight="600" fill="${C.text}">Monthly cloud spend</text>
<g class="save"><rect x="382" y="44" width="126" height="28" rx="14" fill="${a}" opacity="0.16"/><text x="445" y="63" text-anchor="middle" class="m" font-size="12" font-weight="700" fill="${a}">−38% / month</text></g>`;
  for (let i = 0; i < 7; i++) {
    const x = 74 + i * 64;
    body += `<g transform="translate(${x} 330)"><rect class="bar b${i}" x="0" y="-${hi[i]}" width="36" height="${hi[i]}" rx="6" fill="${a}" style="--lo:${(lo[i] / hi[i]).toFixed(3)}"/></g>`;
    body += `<text x="${x + 18}" y="352" text-anchor="middle" class="m" font-size="10" fill="${C.muted}">${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"][i]}</text>`;
  }
  let css = `.bar{transform-box:fill-box;transform-origin:bottom;animation:s 6s infinite}.save{opacity:0;animation:v 6s infinite}
@keyframes s{0%,15%{transform:scaleY(1);opacity:.55}45%,85%{transform:scaleY(var(--lo));opacity:1}100%{transform:scaleY(1);opacity:.55}}
@keyframes v{0%,40%{opacity:0}50%,85%{opacity:1}100%{opacity:0}}`;
  for (let i = 0; i < 7; i++) css += `.b${i}{animation-delay:${(i * 0.08).toFixed(2)}s}`;
  return svg(560, 400, body, css);
}

function iac(a) {
  const code = ['module "network" {', '  source = "./vpc"', '  cidr   = "10.0.0.0/16"', "}", "", 'module "cluster" {', '  source  = "./eks"', "  nodes   = 3", "}"];
  let body = `<rect x="28" y="28" width="250" height="344" rx="14" fill="#050807" stroke="${C.line}"/>`;
  code.forEach((t, i) => (body += `<text x="46" y="${70 + i * 28}" font-family="${MONO}" font-size="12" fill="${t.startsWith("module") ? "#c4b5fd" : t.includes("=") ? C.text : C.muted}">${esc(t)}</text>`));
  body += `<path d="M290 200 h24" stroke="${a}" stroke-width="2" class="arr"/><path d="M308 193 l8 7 -8 7" fill="none" stroke="${a}" stroke-width="2"/>`;
  const boxes = [
    [340, 60, "VPC"], [440, 60, "Subnets"], [340, 150, "EKS"], [440, 150, "Nodes ×3"], [340, 240, "IAM"], [440, 240, "Logs"],
  ];
  boxes.forEach(([x, y, t], i) => (body += `<g class="bx bx${i}"><rect x="${x}" y="${y}" width="88" height="70" rx="12" fill="${C.panel}" stroke="${a}" stroke-opacity="0.5"/><text x="${x + 44}" y="${y + 40}" text-anchor="middle" font-size="12.5" fill="${C.text}">${t}</text></g>`));
  body += `<text x="386" y="350" text-anchor="middle" class="m" font-size="11" fill="${C.muted}">reviewed · repeatable</text>`;
  let css = `.arr{stroke-dasharray:4 4;animation:d 1s linear infinite}@keyframes d{to{stroke-dashoffset:-16}}`;
  boxes.forEach((_, i) => (css += `.bx${i}{opacity:0;animation:bx 7s infinite;animation-delay:${(0.5 + i * 0.45).toFixed(2)}s}`));
  css += `@keyframes bx{0%{opacity:0;transform:translateY(8px)}6%,82%{opacity:1;transform:none}95%,100%{opacity:0}}`;
  return svg(560, 400, body, css);
}

function k8s(a) {
  let body = dots(560, 400);
  const hex = (x, y, cls, c) =>
    `<g class="${cls}"><path d="M${x} ${y - 26} l23 13 v26 l-23 13 l-23 -13 v-26 z" fill="${C.panel}" stroke="${c}" stroke-width="1.6"/><circle cx="${x}" cy="${y}" r="5" fill="${c}"/></g>`;
  const pos = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) pos.push([90 + c * 58 + (r % 2) * 29, 110 + r * 52]);
  pos.forEach(([x, y], i) => (body += hex(x, y, i < 10 ? "pod" : `pod up u${i - 10}`, i === 4 ? C.amber : a)));
  body += `<rect x="60" y="290" width="440" height="60" rx="14" fill="${C.panel}" stroke="${C.line}"/>
<text x="84" y="316" class="m" font-size="12" fill="${C.muted}">deployment/api</text>
<text x="84" y="336" class="m" font-size="12" fill="${C.text}">replicas <tspan class="n1" fill="${a}">10</tspan><tspan class="n2" fill="${a}">18</tspan>/18 · HPA · PodSecurity: restricted</text>`;
  let css = `.up{opacity:0;animation:u 6s infinite}@keyframes u{0%,25%{opacity:0;transform:scale(.6)}35%,85%{opacity:1;transform:none}100%{opacity:0}}
.up{transform-box:fill-box;transform-origin:center}
.n2{opacity:0;animation:n2 6s infinite}.n1{animation:n1 6s infinite}
@keyframes n1{0%,30%{opacity:1}35%,85%{opacity:0}100%{opacity:1}}@keyframes n2{0%,30%{opacity:0}35%,85%{opacity:1}100%{opacity:0}}`;
  for (let i = 0; i < 8; i++) css += `.u${i}{animation-delay:${(i * 0.12).toFixed(2)}s}`;
  return svg(560, 400, body, css);
}

function observability(a) {
  let pts = [];
  for (let i = 0; i <= 40; i++) {
    const x = 50 + i * 11.5;
    let y = 230 - 30 * Math.sin(i / 3) - 10 * Math.sin(i / 1.3);
    if (i === 26) y = 110;
    if (i === 25 || i === 27) y = 170;
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  let body = `<rect x="28" y="28" width="504" height="344" rx="14" fill="${C.panel}" stroke="${C.line}"/>
<text x="52" y="62" font-size="15" font-weight="600" fill="${C.text}">api · p95 latency</text>`;
  for (let i = 0; i < 5; i++) body += `<line x1="50" y1="${100 + i * 50}" x2="510" y2="${100 + i * 50}" stroke="${C.line}"/>`;
  body += `<polyline class="ln" points="${pts.join(" ")}" fill="none" stroke="${a}" stroke-width="2.5" pathLength="1" stroke-linejoin="round"/>`;
  body += `<g class="al"><circle cx="349" cy="110" r="7" fill="${C.red}"/><circle cx="349" cy="110" r="7" fill="${C.red}" class="ring"/>
<rect x="364" y="80" width="150" height="30" rx="8" fill="${C.red}" opacity="0.15"/><text x="439" y="100" text-anchor="middle" class="m" font-size="11" font-weight="700" fill="${C.red}">⚑ alert → on-call</text></g>`;
  body += `<text x="52" y="352" class="m" font-size="11" fill="${C.muted}">logs · metrics · traces · alerts</text>`;
  const css = `.ln{stroke-dasharray:1;stroke-dashoffset:1;animation:l 7s infinite}@keyframes l{0%{stroke-dashoffset:1}60%,90%{stroke-dashoffset:0}100%{stroke-dashoffset:0;opacity:0}}
.al{opacity:0;animation:a 7s infinite}@keyframes a{0%,42%{opacity:0}46%,90%{opacity:1}100%{opacity:0}}
.ring{transform-box:fill-box;transform-origin:center;animation:ring 1.4s infinite}@keyframes ring{from{transform:scale(1);opacity:.8}to{transform:scale(3.2);opacity:0}}`;
  return svg(560, 400, body, css);
}

function testRun() {
  const tests = ["checkout › pays with saved card", "auth › blocks after 5 failed logins", "invoices › user B cannot read user A", "search › escapes query input", "profile › uploads avatar ≤ 5 MB", "api › returns 429 when rate limited"];
  let body = `<rect x="28" y="28" width="504" height="344" rx="14" fill="${C.panel}" stroke="${C.line}"/>
<text x="52" y="62" font-size="15" font-weight="600" fill="${C.text}">Regression suite</text>
<text x="508" y="62" text-anchor="end" class="m" font-size="12" fill="${C.green}">6 / 6 passed</text>`;
  tests.forEach((t, i) => {
    const y = 100 + i * 44;
    body += `<g><circle class="spin sp${i}" cx="62" cy="${y}" r="8" fill="none" stroke="${C.muted}" stroke-width="2" stroke-dasharray="30 20"/>
<g class="ok ok${i}">${icons.check(62, y, C.green)}</g><text x="84" y="${y + 4}" class="m" font-size="12" fill="${C.text}">${esc(t)}</text>
<text x="508" y="${y + 4}" text-anchor="end" class="m ok ok${i}" font-size="11" fill="${C.muted}">${120 + i * 37}ms</text></g>`;
  });
  let css = `.spin{transform-box:fill-box;transform-origin:center;animation:r 1s linear infinite}@keyframes r{to{transform:rotate(360deg)}}`;
  tests.forEach((_, i) => {
    const d = (0.4 + i * 0.6).toFixed(2);
    css += `.ok${i}{opacity:0;animation:o 7s infinite;animation-delay:${d}s}.sp${i}{animation:r 1s linear infinite,h 7s infinite;animation-delay:0s,${d}s}`;
  });
  css += `@keyframes o{0%{opacity:0}3%,85%{opacity:1}95%,100%{opacity:0}}@keyframes h{0%{opacity:1}3%,85%{opacity:0}95%,100%{opacity:1}}`;
  return svg(560, 400, body, css);
}

function devices() {
  let body = dots(560, 400);
  body += `<g class="d d0"><rect x="60" y="120" width="220" height="150" rx="10" fill="${C.panel}" stroke="${C.line2}" stroke-width="2"/><rect x="40" y="270" width="260" height="12" rx="6" fill="${C.panel2}"/>${icons.check(170, 195, C.green, 1.6)}</g>`;
  body += `<g class="d d1"><rect x="318" y="110" width="120" height="170" rx="14" fill="${C.panel}" stroke="${C.line2}" stroke-width="2"/>${icons.check(378, 195, C.green, 1.6)}</g>`;
  body += `<g class="d d2"><rect x="460" y="150" width="66" height="130" rx="14" fill="${C.panel}" stroke="${C.line2}" stroke-width="2"/>${icons.check(493, 215, C.green, 1.3)}</g>`;
  body += `<text x="280" y="340" text-anchor="middle" class="m" font-size="12" fill="${C.muted}">Chrome · Safari · Firefox · Android · iOS</text>`;
  const css = `.d .check{}.d>g{opacity:0;animation:c 6s infinite}.d0>g{animation-delay:.4s}.d1>g{animation-delay:1.2s}.d2>g{animation-delay:2s}
@keyframes c{0%{opacity:0}6%,85%{opacity:1}95%,100%{opacity:0}}`;
  return svg(560, 400, body, css);
}

// ---------------------------------------------------------------- hero app mocks (720 x 480)

function hero({ a, crumb, title, tabs, stats, rows }) {
  let body = `<rect x="24" y="24" width="672" height="432" rx="16" fill="${C.panel}" stroke="${C.line}"/>
<rect x="24" y="24" width="150" height="432" rx="16" fill="#0d1311"/><line x1="174" y1="24" x2="174" y2="456" stroke="${C.line}"/>
<circle cx="50" cy="52" r="8" fill="${a}"/><text x="66" y="57" font-size="13" font-weight="700" fill="${C.text}">kodesec</text>`;
  ["Overview", "Findings", "Assets", "Reports", "Settings"].forEach((t, i) => {
    body += `<rect x="36" y="${84 + i * 34}" width="126" height="26" rx="7" fill="${i === 0 ? a : "none"}" opacity="${i === 0 ? 0.14 : 1}"/><text x="50" y="${102 + i * 34}" font-size="12" fill="${i === 0 ? a : C.muted}">${t}</text>`;
  });
  body += `<text x="198" y="58" class="m" font-size="11" fill="${C.muted}">${esc(crumb)}</text>
<text x="198" y="88" font-size="19" font-weight="600" fill="${C.text}">${esc(title)}</text>`;
  tabs.forEach((t, i) => (body += `<text x="${198 + i * 92}" y="122" font-size="12" fill="${i === 0 ? a : C.muted}">${t}</text>`));
  body += `<line x1="198" y1="132" x2="672" y2="132" stroke="${C.line}"/><line x1="198" y1="132" x2="262" y2="132" stroke="${a}" stroke-width="2"/>`;
  // progress
  body += `<rect x="198" y="148" width="474" height="56" rx="12" fill="${C.panel2}" stroke="${C.line}"/>
<circle class="spin" cx="222" cy="176" r="9" fill="none" stroke="${a}" stroke-width="2.4" stroke-dasharray="36 20"/>
<text x="242" y="172" font-size="12.5" font-weight="600" fill="${C.text}">Running</text><text x="242" y="189" class="m" font-size="10.5" fill="${C.muted}">in progress</text>
<rect x="340" y="172" width="312" height="6" rx="3" fill="${C.bg}"/><rect class="pg" x="340" y="172" width="312" height="6" rx="3" fill="${a}"/>`;
  // stats
  stats.forEach(([k, v], i) => {
    const x = 198 + i * 160;
    body += `<rect x="${x}" y="218" width="150" height="70" rx="12" fill="${C.panel2}" stroke="${C.line}"/><text x="${x + 16}" y="244" class="m" font-size="10.5" fill="${C.muted}">${k}</text><text x="${x + 16}" y="274" font-size="22" font-weight="700" fill="${C.text}">${v}</text>`;
  });
  // rows
  rows.forEach(([t, sev, c], i) => {
    const y = 302 + i * 46;
    body += `<g class="row r${i}"><rect x="198" y="${y}" width="474" height="38" rx="10" fill="${C.panel2}" stroke="${C.line}"/>
<rect x="212" y="${y + 11}" width="46" height="16" rx="8" fill="${c}" opacity="0.16"/><text x="235" y="${y + 23}" text-anchor="middle" class="m" font-size="9.5" font-weight="700" fill="${c}">${sev}</text>
<text x="270" y="${y + 24}" font-size="12" fill="${C.text}">${esc(t)}</text></g>`;
  });
  let css = `.spin{transform-box:fill-box;transform-origin:center;animation:s 1.1s linear infinite}@keyframes s{to{transform:rotate(360deg)}}
.pg{transform-origin:340px 175px;animation:p 8s ease-in-out infinite}@keyframes p{0%{transform:scaleX(.05)}80%,92%{transform:scaleX(1)}100%{transform:scaleX(.05)}}`;
  rows.forEach((_, i) => (css += `.r${i}{opacity:0;animation:rw 8s infinite;animation-delay:${(0.8 + i * 1.1).toFixed(1)}s}`));
  css += `@keyframes rw{0%{opacity:0;transform:translateX(10px)}5%,85%{opacity:1;transform:none}95%,100%{opacity:0}}`;
  return svg(720, 480, body, css);
}

// ---------------------------------------------------------------- write

const files = {
  "attack-paths": attackPaths(ACCENT.emerald),
  "scan-verify": scanVerify(ACCENT.emerald),
  "findings-to-fixed": findingsToFixed(ACCENT.emerald),
  "secure-code": secureCode(ACCENT.violet),
  pipeline: pipeline(ACCENT.amber),
  architecture: architecture(ACCENT.violet),
  "cloud-map": cloudMap(ACCENT.sky),
  deploy: deployTerm(ACCENT.sky),
  cost: cost(ACCENT.sky),
  iac: iac(ACCENT.amber),
  k8s: k8s(ACCENT.amber),
  observability: observability(ACCENT.amber),
  "test-run": testRun(),
  devices: devices(),
  "cyber-hero": hero({
    a: ACCENT.emerald,
    crumb: "Pentest › api.acme.com",
    title: "Whitebox pentest: production API",
    tabs: ["Overview", "Findings", "Attack paths", "Coverage"],
    stats: [["Endpoints", "128"], ["Findings", "11"], ["Re-tested", "9"]],
    rows: [["Broken access control on /invoices", "HIGH", C.red], ["JWT accepts alg=none", "HIGH", C.red], ["Missing rate limit on login", "MED", C.amber]],
  }),
  "code-hero": hero({
    a: ACCENT.violet,
    crumb: "Project › payments-platform",
    title: "Secure build: Payments platform",
    tabs: ["Overview", "Milestones", "Security", "Releases"],
    stats: [["Milestone", "4 / 6"], ["Test coverage", "87%"], ["Open vulns", "0"]],
    rows: [["Threat model approved", "DONE", C.green], ["Checkout flow · code review", "DONE", C.green], ["Pre-launch pentest scheduled", "NEXT", ACCENT.violet]],
  }),
  "cloud-hero": hero({
    a: ACCENT.sky,
    crumb: "Cloud › acme-production",
    title: "AWS production environment",
    tabs: ["Overview", "Resources", "Costs", "Alerts"],
    stats: [["Resources", "142"], ["Monthly cost", "−38%"], ["Uptime", "99.98%"]],
    rows: [["Public S3 bucket made private", "FIXED", C.green], ["Oversized RDS instance right-sized", "SAVED", ACCENT.sky], ["Root account MFA enforced", "FIXED", C.green]],
  }),
  "devops-hero": hero({
    a: ACCENT.amber,
    crumb: "Platform › eks-prod",
    title: "Kubernetes platform: eks-prod",
    tabs: ["Overview", "Pipelines", "Clusters", "Alerts"],
    stats: [["Deploys / day", "24"], ["Lead time", "12m"], ["Failed deploys", "0"]],
    rows: [["api · v2.14.0 deployed", "LIVE", C.green], ["Terraform plan · 3 changes", "REVIEW", ACCENT.amber], ["Node pool scaled 3 → 6", "AUTO", ACCENT.amber]],
  }),
  "qa-hero": hero({
    a: ACCENT.rose,
    crumb: "QA › release 3.2",
    title: "Release 3.2 · regression run",
    tabs: ["Overview", "Test runs", "Devices", "Bugs"],
    stats: [["Tests", "642"], ["Passed", "639"], ["Devices", "18"]],
    rows: [["Checkout fails on iOS 16 Safari", "HIGH", C.red], ["API returns 500 on empty cart", "MED", C.amber], ["638 other tests passed", "PASS", C.green]],
  }),
};

for (const [name, content] of Object.entries(files)) fs.writeFileSync(path.join(OUT, `${name}.svg`), content);
console.log(`wrote ${Object.keys(files).length} animations to public/media/services/`);
