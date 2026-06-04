import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const PAGES = [
  {
    path: "apps/inspiration-hunter/pages/index/index.ink",
    requiredLabels: ["灵感猎手", "开始解析"],
  },
  {
    path: "apps/inspiration-hunter/pages/discovery/index.ink",
    requiredLabels: ["深挖", "收藏", "挑战模式"],
  },
  {
    path: "apps/inspiration-hunter/pages/challenge/index.ink",
    requiredLabels: ["返回结果", "揭晓答案"],
  },
];

test("Inspiration Hunter pages fit the 448x150 glasses preview viewport", async () => {
  for (const page of PAGES) {
    const source = await fs.readFile(path.join(ROOT, page.path), "utf8");

    assert.doesNotMatch(
      source,
      /min-height\s*:\s*100vh/,
      `${page.path} should not use tall mobile-style min-height`,
    );
    assert.match(
      source,
      /\.screen\s*\{[^}]*height\s*:\s*150px/s,
      `${page.path} should lock the main screen to the 150px Craft preview height`,
    );
    assert.match(
      source,
      /\.screen\s*\{[^}]*overflow\s*:\s*hidden/s,
      `${page.path} should keep all critical controls inside the visible viewport`,
    );
    assert.match(
      source,
      /\.action-row\s*\{[^}]*display\s*:\s*flex/s,
      `${page.path} should expose actions in a compact visible row`,
    );

    for (const label of page.requiredLabels) {
      assert.match(source, new RegExp(label), `${page.path} should keep ${label} visible in the flow`);
    }
  }
});
