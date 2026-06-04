#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const DEFAULT_ROOT = path.resolve(path.dirname(SCRIPT_PATH), "..");

const PACK_FILES = [
  {
    name: "01-InspirationHunter-icon.png",
    source: "apps/inspiration-hunter/assets/icon.png",
    role: "Lingzhu upload: 图标*",
    manifestKey: "icon",
  },
  {
    name: "02-InspirationHunter-v0.1.0.aix",
    source: "artifacts/gdgeek-AIUI-apps-inspiration-hunter.aix",
    role: "Lingzhu upload: agent程序包",
    manifestKey: "aix",
  },
  {
    name: "03-InspirationHunter-pitch-deck.pptx",
    source: "docs/contest/inspiration-hunter-pitch-deck.pptx",
    role: "Contest presentation deck",
  },
  {
    name: "03a-cn-judge-one-pager.md",
    source: "docs/contest/inspiration-hunter-cn-one-pager.md",
    role: "Chinese judge-facing one-pager and 90-second pitch",
  },
  {
    name: "04-contest-submission.md",
    source: "docs/contest/inspiration-hunter-submission.md",
    role: "Judge-facing submission brief",
  },
  {
    name: "05-demo-runbook.md",
    source: "docs/contest/inspiration-hunter-demo-runbook.md",
    role: "Live demo script and fallback plan",
  },
  {
    name: "06-release-checklist.md",
    source: "docs/contest/inspiration-hunter-release-checklist.md",
    role: "Release readiness checklist",
  },
  {
    name: "07-judge-scorecard.md",
    source: "docs/contest/inspiration-hunter-judge-scorecard.md",
    role: "Contest judging map",
  },
  {
    name: "08-final-release-evidence.md",
    source: "docs/contest/inspiration-hunter-final-release-evidence.md",
    role: "Evidence capture guide",
  },
  {
    name: "09-lingzhu-aiui-release-handoff.md",
    source: "docs/rokid/lingzhu-aiui-release-handoff.md",
    role: "Lingzhu form values and upload steps",
  },
  {
    name: "10-demo-storyboard.svg",
    source: "docs/contest/inspiration-hunter-demo-storyboard.svg",
    role: "Visual storyboard of the three-screen demo arc",
  },
  {
    name: "11-aiui-craft-lingzhu-project-playbook.md",
    source: "docs/rokid/aiui-craft-lingzhu-project-playbook.md",
    role: "Reusable AIUI Craft/Lingzhu development and release playbook",
  },
];

async function sha256File(filePath) {
  const hash = crypto.createHash("sha256");
  const bytes = await fs.readFile(filePath);
  hash.update(bytes);
  return hash.digest("hex");
}

async function copyPackFile(root, outputDir, entry, releaseManifest) {
  const sourcePath = path.join(root, entry.source);
  const targetPath = path.join(outputDir, entry.name);
  const sourceStat = await fs.stat(sourcePath);
  if (!sourceStat.isFile() || sourceStat.size <= 0) {
    throw new Error(`Expected non-empty file: ${sourcePath}`);
  }

  await fs.copyFile(sourcePath, targetPath);
  const sha256 = await sha256File(targetPath);

  if (entry.manifestKey) {
    const expected = releaseManifest.releaseFiles?.[entry.manifestKey];
    if (!expected) {
      throw new Error(`Release manifest is missing releaseFiles.${entry.manifestKey}`);
    }
    if (expected.sha256 !== sha256) {
      throw new Error(`${entry.name} sha256 mismatch. Expected ${expected.sha256}, got ${sha256}.`);
    }
    if (expected.bytes !== sourceStat.size) {
      throw new Error(`${entry.name} byte size mismatch. Expected ${expected.bytes}, got ${sourceStat.size}.`);
    }
  }

  return {
    name: entry.name,
    role: entry.role,
    source: entry.source,
    bytes: sourceStat.size,
    sha256,
  };
}

function uploadGuide(releaseManifest) {
  return [
    "Inspiration Hunter upload guide",
    "",
    "Use these two files first in the Lingzhu AIUI form:",
    "",
    "1. 图标*: 01-InspirationHunter-icon.png",
    "2. agent程序包: 02-InspirationHunter-v0.1.0.aix",
    "",
    "Recommended Lingzhu form values:",
    "",
    `智能体名称: ${releaseManifest.lingzhuAgentDraft.name}`,
    `智能体版本: ${releaseManifest.lingzhuAgentDraft.version}`,
    `类别: ${releaseManifest.lingzhuAgentDraft.category}`,
    `功能介绍: ${releaseManifest.lingzhuAgentDraft.intro}`,
    `开场白: ${releaseManifest.lingzhuAgentDraft.greeting}`,
    `权限: ${releaseManifest.lingzhuAgentDraft.permissions.join(", ")}`,
    "",
    "After upload, capture evidence listed in 08-final-release-evidence.md.",
    "Do not call the project fully published until Lingzhu accepts the AIX and the app launches.",
    "",
  ].join("\n");
}

async function createZipArchive(outputDir, zipPath) {
  await fs.rm(zipPath, { force: true });
  const parent = path.dirname(outputDir);
  const folderName = path.basename(outputDir);
  const result = spawnSync("zip", ["-qr", zipPath, folderName], {
    cwd: parent,
    encoding: "utf8",
  });
  if (result.status !== 0) {
    throw new Error(
      [
        `zip failed with exit code ${result.status}.`,
        result.stdout.trim(),
        result.stderr.trim(),
      ]
        .filter(Boolean)
        .join("\n"),
    );
  }
  const stat = await fs.stat(zipPath);
  return {
    path: zipPath,
    bytes: stat.size,
    sha256: await sha256File(zipPath),
  };
}

export async function createSubmissionPack(options = {}) {
  const root = path.resolve(options.root || DEFAULT_ROOT);
  const outputDir = path.resolve(
    options.outputDir || path.join(root, "release/inspiration-hunter-submission-pack"),
  );
  const zipPath = path.resolve(
    options.zipPath || path.join(path.dirname(outputDir), `${path.basename(outputDir)}.zip`),
  );
  const shouldCreateZip = options.createZip !== false;
  const releaseManifestPath = path.join(root, "docs/contest/inspiration-hunter-release-manifest.json");
  const releaseManifest = JSON.parse(await fs.readFile(releaseManifestPath, "utf8"));

  await fs.rm(outputDir, { recursive: true, force: true });
  await fs.mkdir(outputDir, { recursive: true });

  await fs.writeFile(path.join(outputDir, "00-UPLOAD-FIRST.txt"), uploadGuide(releaseManifest), "utf8");

  const uploadGuideStat = await fs.stat(path.join(outputDir, "00-UPLOAD-FIRST.txt"));
  const files = [
    {
      name: "00-UPLOAD-FIRST.txt",
      role: "First-read upload instructions",
      source: "generated",
      bytes: uploadGuideStat.size,
      sha256: await sha256File(path.join(outputDir, "00-UPLOAD-FIRST.txt")),
    },
  ];

  for (const entry of PACK_FILES) {
    files.push(await copyPackFile(root, outputDir, entry, releaseManifest));
  }

  const packManifest = {
    project: releaseManifest.project,
    generatedAt: new Date().toISOString(),
    craftImportUrl: releaseManifest.craftImportUrl,
    lingzhuAgentDraft: releaseManifest.lingzhuAgentDraft,
    uploadFiles: {
      icon: files.find((entry) => entry.name === "01-InspirationHunter-icon.png"),
      aix: files.find((entry) => entry.name === "02-InspirationHunter-v0.1.0.aix"),
    },
    files,
  };

  await fs.writeFile(path.join(outputDir, "manifest.json"), `${JSON.stringify(packManifest, null, 2)}\n`, "utf8");
  const manifestStat = await fs.stat(path.join(outputDir, "manifest.json"));
  files.push({
    name: "manifest.json",
    role: "Machine-readable submission pack manifest",
    source: "generated",
    bytes: manifestStat.size,
    sha256: await sha256File(path.join(outputDir, "manifest.json")),
  });

  const zip = shouldCreateZip ? await createZipArchive(outputDir, zipPath) : undefined;

  return {
    outputDir,
    zip,
    files,
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === SCRIPT_PATH) {
  createSubmissionPack()
    .then((result) => {
      process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    })
    .catch((error) => {
      process.stderr.write(`${error.stack || error.message || String(error)}\n`);
      process.exit(1);
    });
}

export const expectedPackFiles = PACK_FILES.map((entry) => entry.name);
