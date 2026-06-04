import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function readPage(pagePath) {
  return fs.readFile(path.join(ROOT, pagePath), "utf8");
}

test("Inspiration Hunter supports Rokid glasses key and hands-free interaction", async () => {
  const home = await readPage("apps/inspiration-hunter/pages/index/index.ink");
  const discovery = await readPage("apps/inspiration-hunter/pages/discovery/index.ink");
  const challenge = await readPage("apps/inspiration-hunter/pages/challenge/index.ink");

  for (const [name, source] of [
    ["home", home],
    ["discovery", discovery],
    ["challenge", challenge],
  ]) {
    assert.match(source, /onKeyDown\(event\)/, `${name} page should handle glasses key events`);
    assert.match(source, /event\?\.code === 'Enter'/, `${name} page should support Enter as the primary glasses action`);
  }

  assert.match(home, /setTimeout\(\(\) => \{\s*this\.beginDiscovery\(\);/s, "home should auto-enter discovery after target lock");
  assert.match(discovery, /setTimeout\(\(\) => \{\s*this\.setData\(\{\s*expanded: true,\s*saved: true,/s, "discovery should auto-expand and save for hands-free demo");
  assert.match(discovery, /setTimeout\(\(\) => \{\s*this\.goToChallenge\(\);/s, "discovery should auto-continue to challenge");
  assert.match(challenge, /setTimeout\(\(\) => \{\s*this\.solveChallenge\(\);/s, "challenge should auto-reveal the answer");
});
