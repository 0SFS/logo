import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { logoMetadata, logoUrl } from "../index.mjs";

const bytes = readFileSync(new URL(logoUrl));
assert.equal(bytes.byteLength, logoMetadata.sizeBytes);
assert.equal(createHash("sha256").update(bytes).digest("hex"), logoMetadata.sha256);
const svg = bytes.toString("utf8");
assert.match(svg, /^<svg\s/);
assert.ok(svg.includes('width="48" height="46"'));
assert.ok(svg.includes('viewBox="0 0 48 46"'));
assert.ok(!/<(?:script|foreignObject)\b/i.test(svg));
assert.ok(!/\b(?:href|src)\s*=\s*["'](?:https?:|\/\/|javascript:)/i.test(svg));
assert.equal(logoMetadata.generation.available, false);
assert.equal(logoMetadata.provenance.path, "public/favicon.svg");
assert.ok(Object.isFrozen(logoMetadata.rights));
if (process.argv.includes("--release")) {
  assert.equal(logoMetadata.rights.publicationAllowed, true, "Logo creator/redistribution license is unresolved; publication cannot pass.");
}
console.log("Logo bytes, dimensions, package-relative URL and honest provenance verified.");
