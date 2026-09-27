const fs = require("fs");
const path = require("path");

const summaryPath = path.join(__dirname, "..", "coverage", "coverage-summary.json");
const total = JSON.parse(fs.readFileSync(summaryPath, "utf8")).total;

const keys = ["statements", "branches", "functions", "lines"];
const rows = keys.map(
  (k) => "| " + k + " | " + total[k].pct + "% (" + total[k].covered + "/" + total[k].total + ") |"
);

const md = [
  "## Coverage report",
  "",
  "| Metric | Covered |",
  "|--------|---------|",
  ...rows,
  ""
].join("\n");

const out = process.env.GITHUB_STEP_SUMMARY;
if (out) {
  fs.appendFileSync(out, md);
}
console.log(md);
