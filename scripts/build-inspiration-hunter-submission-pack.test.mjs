import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { createSubmissionPack } from "./build-inspiration-hunter-submission-pack.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("createSubmissionPack copies upload assets and contest materials with verified manifest data", async () => {
  const tmp = await fs.mkdtemp(path.join(os.tmpdir(), "inspiration-hunter-pack-"));
  const outputDir = path.join(tmp, "submission-pack");

  const result = await createSubmissionPack({
    root: ROOT,
    outputDir,
    createZip: false,
  });

  const expectedFiles = [
    "00-UPLOAD-FIRST.txt",
    "01-InspirationHunter-icon.png",
    "02-InspirationHunter-v0.1.0.aix",
    "03-InspirationHunter-pitch-deck.pptx",
    "03a-cn-judge-one-pager.md",
    "04-contest-submission.md",
    "05-demo-runbook.md",
    "06-release-checklist.md",
    "07-judge-scorecard.md",
    "08-final-release-evidence.md",
    "09-lingzhu-aiui-release-handoff.md",
    "10-demo-storyboard.svg",
    "11-aiui-craft-lingzhu-project-playbook.md",
    "manifest.json",
  ];

  assert.deepEqual(
    result.files.map((entry) => entry.name),
    expectedFiles,
  );

  for (const fileName of expectedFiles) {
    const stat = await fs.stat(path.join(outputDir, fileName));
    assert.ok(stat.size > 0, `${fileName} should not be empty`);
  }

  const manifest = JSON.parse(await fs.readFile(path.join(outputDir, "manifest.json"), "utf8"));
  assert.equal(manifest.project, "Inspiration Hunter");
  assert.equal(manifest.lingzhuAgentDraft.name, "InspirationHunter");
  assert.equal(manifest.uploadFiles.icon.sha256, "d007f489dfb4c3727b7e67552fe6255c21fdc624e5841dae550a92cc416c4ee1");
  assert.equal(manifest.uploadFiles.aix.sha256, "a6ab2dde6663013406e2edf98c2dda0eb33f982383d701efa9014edbe2ab1e09");

  const uploadGuide = await fs.readFile(path.join(outputDir, "00-UPLOAD-FIRST.txt"), "utf8");
  assert.match(uploadGuide, /图标/);
  assert.match(uploadGuide, /agent程序包/);
  assert.match(uploadGuide, /01-InspirationHunter-icon\.png/);
  assert.match(uploadGuide, /02-InspirationHunter-v0\.1\.0\.aix/);

  const chineseBrief = await fs.readFile(path.join(outputDir, "03a-cn-judge-one-pager.md"), "utf8");
  assert.match(chineseBrief, /灵感猎手/);
  assert.match(chineseBrief, /90 秒路演话术/);
  assert.match(chineseBrief, /不是把聊天机器人搬到眼镜上/);

  const storyboard = await fs.readFile(path.join(outputDir, "10-demo-storyboard.svg"), "utf8");
  assert.match(storyboard, /<svg/);
  assert.match(storyboard, /SCAN/);
  assert.match(storyboard, /REVEAL/);
  assert.match(storyboard, /CHALLENGE/);
  assert.match(storyboard, /银翼猎影海报/);

  const playbook = await fs.readFile(
    path.join(outputDir, "11-aiui-craft-lingzhu-project-playbook.md"),
    "utf8",
  );
  assert.match(playbook, /Golden Path/);
  assert.match(playbook, /File Picker Reality/);
  assert.match(playbook, /Review Submission/);
});
