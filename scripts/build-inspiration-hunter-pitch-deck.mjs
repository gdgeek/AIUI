#!/usr/bin/env node

import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PRESENTATIONS_SKILL_DIR =
  "/Users/geek/.codex/plugins/cache/openai-primary-runtime/presentations/26.601.10930/skills/presentations";
const BUILD_SCRIPT = path.join(PRESENTATIONS_SKILL_DIR, "scripts/build_artifact_deck.mjs");
const BUNDLED_PYTHON = path.join(
  process.env.HOME || "/Users/geek",
  ".cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3",
);

const timestamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\..+$/, "Z");
const threadId = process.env.CODEX_THREAD_ID || `manual-${timestamp}-${randomBytes(3).toString("hex")}`;
const WORKSPACE = path.join(ROOT, "outputs", threadId, "presentations", "inspiration-hunter-pitch");
const SLIDES_DIR = path.join(WORKSPACE, "slides");
const PREVIEW_DIR = path.join(WORKSPACE, "preview");
const LAYOUT_DIR = path.join(WORKSPACE, "layout");
const QA_DIR = path.join(WORKSPACE, "qa");
const FINAL_PPTX = path.join(ROOT, "docs/contest/inspiration-hunter-pitch-deck.pptx");
const ICON_PATH = path.join(ROOT, "apps/inspiration-hunter/assets/icon.png");

const manifest = {
  deckTitle: "Inspiration Hunter Pitch Deck",
  finalPptx: FINAL_PPTX,
  workspace: WORKSPACE,
  slideCount: 7,
  sourceDocs: [
    "docs/contest/inspiration-hunter-submission.md",
    "docs/contest/inspiration-hunter-demo-runbook.md",
    "docs/contest/inspiration-hunter-judge-scorecard.md",
    "docs/contest/inspiration-hunter-release-manifest.json",
    "docs/rokid/deployment-inspiration-hunter.md",
  ],
};

function commonSource() {
  return `
export const C = {
  bg: "#06161a",
  bg2: "#0a2025",
  panel: "#0e2b30",
  panel2: "#123a40",
  ink: "#eefcfb",
  muted: "#92bdbe",
  dim: "#557f82",
  cyan: "#31f6e0",
  cyan2: "#16b7c2",
  amber: "#ffb84d",
  coral: "#ff6b5f",
  green: "#87f7a2",
  grid: "#1b454b",
  line: "#2b626a"
};

export function bg(slide, ctx, title = "Inspiration Hunter") {
  ctx.addShape(slide, { x: 0, y: 0, width: ctx.W, height: ctx.H, fill: C.bg });
  ctx.addShape(slide, { x: 0, y: 0, width: ctx.W, height: 720, fill: "#06161a" });
  for (let x = 0; x <= ctx.W; x += 80) {
    ctx.addShape(slide, { x, y: 0, width: 1, height: ctx.H, fill: "#0f2b30" });
  }
  for (let y = 0; y <= ctx.H; y += 80) {
    ctx.addShape(slide, { x: 0, y, width: ctx.W, height: 1, fill: "#0f2b30" });
  }
  ctx.addShape(slide, { x: -120, y: 500, width: 1520, height: 4, fill: "#12383e" });
  ctx.addText(slide, {
    text: title.toUpperCase(),
    x: 48,
    y: 660,
    width: 460,
    height: 24,
    fontSize: 12,
    color: C.dim,
    bold: true,
    typeface: ctx.fonts.mono
  });
}

export function title(slide, ctx, kicker, headline, subhead) {
  ctx.addText(slide, {
    text: kicker,
    x: 56,
    y: 44,
    width: 620,
    height: 24,
    fontSize: 14,
    color: C.cyan,
    bold: true,
    typeface: ctx.fonts.mono
  });
  ctx.addText(slide, {
    text: headline,
    x: 56,
    y: 78,
    width: 760,
    height: 104,
    fontSize: 42,
    color: C.ink,
    bold: true,
    typeface: ctx.fonts.title
  });
  if (subhead) {
    ctx.addText(slide, {
      text: subhead,
      x: 58,
      y: 174,
      width: 620,
      height: 56,
      fontSize: 18,
      color: C.muted,
      typeface: ctx.fonts.body
    });
  }
}

export function footer(slide, ctx, n) {
  ctx.addText(slide, {
    text: String(n).padStart(2, "0"),
    x: 1168,
    y: 650,
    width: 60,
    height: 30,
    fontSize: 15,
    color: C.cyan,
    bold: true,
    align: "right",
    typeface: ctx.fonts.mono
  });
}

export function label(slide, ctx, text, x, y, w, tone = C.cyan) {
  ctx.addShape(slide, { x, y, width: w, height: 30, fill: "#0a2328", line: ctx.line(tone, 1) });
  ctx.addText(slide, {
    text,
    x: x + 12,
    y: y + 7,
    width: w - 24,
    height: 18,
    fontSize: 12,
    color: tone,
    bold: true,
    typeface: ctx.fonts.mono
  });
}

export function card(slide, ctx, x, y, w, h, head, body, tone = C.cyan) {
  ctx.addShape(slide, { x, y, width: w, height: h, fill: C.panel, line: ctx.line("#25545b", 1) });
  ctx.addShape(slide, { x, y, width: 5, height: h, fill: tone });
  ctx.addText(slide, {
    text: head,
    x: x + 22,
    y: y + 18,
    width: w - 34,
    height: 30,
    fontSize: 19,
    color: C.ink,
    bold: true,
    typeface: ctx.fonts.title
  });
  ctx.addText(slide, {
    text: body,
    x: x + 22,
    y: y + 56,
    width: w - 34,
    height: h - 68,
    fontSize: 14,
    color: C.muted,
    typeface: ctx.fonts.body
  });
}

export function stat(slide, ctx, x, y, value, labelText, tone = C.cyan) {
  ctx.addShape(slide, { x, y, width: 178, height: 88, fill: "#09252a", line: ctx.line("#24545c", 1) });
  ctx.addText(slide, {
    text: value,
    x: x + 14,
    y: y + 12,
    width: 150,
    height: 34,
    fontSize: 25,
    color: tone,
    bold: true,
    typeface: ctx.fonts.title
  });
  ctx.addText(slide, {
    text: labelText,
    x: x + 14,
    y: y + 50,
    width: 146,
    height: 28,
    fontSize: 12,
    color: C.muted,
    typeface: ctx.fonts.body
  });
}

export function stage(slide, ctx, x, y, w, n, head, body, tone = C.cyan) {
  ctx.addShape(slide, { x, y, width: w, height: 128, fill: "#0a252a", line: ctx.line("#275b63", 1) });
  ctx.addShape(slide, { x: x + 18, y: y + 18, width: 34, height: 34, fill: tone });
  ctx.addText(slide, {
    text: n,
    x: x + 18,
    y: y + 23,
    width: 34,
    height: 20,
    fontSize: 16,
    color: C.bg,
    bold: true,
    align: "center",
    typeface: ctx.fonts.mono
  });
  ctx.addText(slide, {
    text: head,
    x: x + 66,
    y: y + 19,
    width: w - 82,
    height: 28,
    fontSize: 17,
    color: C.ink,
    bold: true,
    typeface: ctx.fonts.title
  });
  ctx.addText(slide, {
    text: body,
    x: x + 20,
    y: y + 66,
    width: w - 38,
    height: 48,
    fontSize: 12,
    color: C.muted,
    typeface: ctx.fonts.body
  });
}
`;
}

function slide01() {
  return `
import { bg, footer, label, stat, C } from "./common.mjs";
const ICON = ${JSON.stringify(ICON_PATH)};

export async function slide01(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx, "Contest pitch deck");
  label(slide, ctx, "ROKID AIUI / CRAFT CONTEST BUILD", 56, 46, 300);
  ctx.addText(slide, { text: "Inspiration\\nHunter", x: 56, y: 104, width: 570, height: 150, fontSize: 64, color: C.ink, bold: true, typeface: ctx.fonts.title });
  ctx.addText(slide, { text: "灵感猎手", x: 60, y: 254, width: 300, height: 40, fontSize: 26, color: C.cyan, bold: true, typeface: ctx.fonts.title });
  ctx.addText(slide, { text: "Turn seeing into discovery.", x: 60, y: 316, width: 560, height: 48, fontSize: 30, color: C.amber, bold: true, typeface: ctx.fonts.title });
  ctx.addText(slide, { text: "A glasses-native AIUI experience that transforms a real-world object into a short story, clue challenge, and memory loop.", x: 62, y: 382, width: 530, height: 88, fontSize: 20, color: C.muted, typeface: ctx.fonts.body });
  stat(slide, ctx, 62, 514, "3", "schema-backed AIUI pages", C.cyan);
  stat(slide, ctx, 258, 514, "AIX", "local package verified", C.amber);
  stat(slide, ctx, 454, 514, "443", "GitHub SSH release route", C.green);
  ctx.addShape(slide, { x: 748, y: 88, width: 384, height: 384, fill: "#09252a", line: ctx.line(C.cyan, 2) });
  ctx.addShape(slide, { x: 788, y: 128, width: 304, height: 304, fill: "#06161a", line: ctx.line("#23545c", 1) });
  await ctx.addImage(slide, { path: ICON, x: 820, y: 160, width: 240, height: 240, fit: "contain", alt: "Inspiration Hunter app icon" });
  label(slide, ctx, "RELEASE FILES READY", 780, 508, 220, C.green);
  ctx.addText(slide, { text: "Icon PNG + verified AIX candidate are prepared for the final Lingzhu upload step.", x: 780, y: 554, width: 350, height: 60, fontSize: 17, color: C.muted, typeface: ctx.fonts.body });
  footer(slide, ctx, 1);
  return slide;
}
`;
}

function slide02() {
  return `
import { bg, footer, title, C } from "./common.mjs";

export async function slide02(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  title(slide, ctx, "01 / PROBLEM", "Recognition alone is too shallow for AI glasses.", "Most demos answer “what is this?” and stop exactly when the wearable context becomes interesting.");
  const steps = [
    ["LABEL", "It is a poster.", C.coral],
    ["FACT", "It has sci-fi visual language.", C.amber],
    ["MEANING", "It hints at a future city story.", C.cyan],
    ["ACTION", "Find the clue and remember it.", C.green]
  ];
  for (let i = 0; i < steps.length; i += 1) {
    const [head, body, tone] = steps[i];
    const y = 285 + i * 78;
    ctx.addShape(slide, { x: 112 + i * 24, y, width: 802 - i * 48, height: 54, fill: i === 0 ? "#351c22" : "#0d2a30", line: ctx.line(tone, 1) });
    ctx.addText(slide, { text: head, x: 140 + i * 24, y: y + 11, width: 120, height: 24, fontSize: 16, color: tone, bold: true, typeface: ctx.fonts.mono });
    ctx.addText(slide, { text: body, x: 286 + i * 24, y: y + 11, width: 520, height: 24, fontSize: 18, color: C.ink, bold: i > 1, typeface: ctx.fonts.body });
  }
  ctx.addShape(slide, { x: 900, y: 286, width: 246, height: 286, fill: "#0b262b", line: ctx.line("#25545b", 1) });
  ctx.addText(slide, { text: "The gap", x: 930, y: 316, width: 180, height: 30, fontSize: 24, color: C.ink, bold: true, typeface: ctx.fonts.title });
  ctx.addText(slide, { text: "Glasses already know where attention is. The product should convert that attention into a useful next move.", x: 930, y: 368, width: 180, height: 118, fontSize: 16, color: C.muted, typeface: ctx.fonts.body });
  ctx.addText(slide, { text: "The app starts after the label.", x: 930, y: 510, width: 180, height: 36, fontSize: 16, color: C.cyan, bold: true, typeface: ctx.fonts.body });
  footer(slide, ctx, 2);
  return slide;
}
`;
}

function slide03() {
  return `
import { bg, footer, title, stage, C } from "./common.mjs";

export async function slide03(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  title(slide, ctx, "02 / PRODUCT LOOP", "A repeatable discovery loop, not a chat transcript.", "The same pattern works for a poster today and for museums, streets, retail, or classrooms later.");
  const xs = [72, 306, 540, 774, 1008];
  const data = [
    ["1", "See", "User looks at a meaningful real-world object.", C.cyan],
    ["2", "Lock", "The interface frames attention and confidence.", C.amber],
    ["3", "Reveal", "The app explains identity, context, and why it matters.", C.cyan],
    ["4", "Challenge", "A clue task turns passive info into interaction.", C.green],
    ["5", "Remember", "Saved discovery becomes a lightweight memory hook.", C.coral]
  ];
  for (let i = 0; i < data.length; i += 1) {
    const [n, head, body, tone] = data[i];
    stage(slide, ctx, xs[i], 312, 192, n, head, body, tone);
    if (i < data.length - 1) {
      ctx.addShape(slide, { x: xs[i] + 192, y: 374, width: 42, height: 4, fill: "#2b626a" });
    }
  }
  ctx.addShape(slide, { x: 76, y: 520, width: 1090, height: 70, fill: "#09252a", line: ctx.line("#24545c", 1) });
  ctx.addText(slide, { text: "Product principle", x: 106, y: 536, width: 170, height: 24, fontSize: 16, color: C.cyan, bold: true, typeface: ctx.fonts.mono });
  ctx.addText(slide, { text: "Every screen must answer: what should I notice next?", x: 300, y: 534, width: 780, height: 28, fontSize: 24, color: C.ink, bold: true, typeface: ctx.fonts.title });
  footer(slide, ctx, 3);
  return slide;
}
`;
}

function slide04() {
  return `
import { bg, footer, title, C } from "./common.mjs";

export async function slide04(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  title(slide, ctx, "03 / LIVE DEMO", "A one-minute arc with a clean ending.", "The stage path is deterministic, fast, and easy to recover if the network or preview environment misbehaves.");
  const beats = [
    ["0-10s", "Scan", "Open 灵感猎手; target locks onto the poster."],
    ["10-25s", "Reveal", "Tap 开始解析; show identity, insight, story, meaning."],
    ["25-40s", "Deepen", "Tap 深挖 and 收藏; prove the UI reacts in place."],
    ["40-60s", "Challenge", "Tap 挑战模式 then 揭晓答案; end on reward."]
  ];
  for (let i = 0; i < beats.length; i += 1) {
    const [time, head, body] = beats[i];
    const x = 92 + i * 282;
    ctx.addShape(slide, { x, y: 318, width: 236, height: 190, fill: "#0d2a30", line: ctx.line(i === 3 ? C.green : "#285b63", 1) });
    ctx.addShape(slide, { x, y: 318, width: 236, height: 8, fill: i === 0 ? C.cyan : i === 1 ? C.amber : i === 2 ? C.coral : C.green });
    ctx.addText(slide, { text: time, x: x + 22, y: 344, width: 120, height: 24, fontSize: 17, color: C.cyan, bold: true, typeface: ctx.fonts.mono });
    ctx.addText(slide, { text: head, x: x + 22, y: 382, width: 190, height: 34, fontSize: 26, color: C.ink, bold: true, typeface: ctx.fonts.title });
    ctx.addText(slide, { text: body, x: x + 22, y: 428, width: 185, height: 58, fontSize: 14, color: C.muted, typeface: ctx.fonts.body });
    if (i < beats.length - 1) {
      ctx.addShape(slide, { x: x + 236, y: 410, width: 46, height: 3, fill: "#2b626a" });
    }
  }
  ctx.addText(slide, { text: "Fallback: present three deliberate screens if preview navigation is unreliable.", x: 92, y: 556, width: 730, height: 30, fontSize: 18, color: C.amber, bold: true, typeface: ctx.fonts.body });
  footer(slide, ctx, 4);
  return slide;
}
`;
}

function slide05() {
  return `
import { bg, footer, title, card, C } from "./common.mjs";

export async function slide05(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  title(slide, ctx, "04 / SYSTEM MAP", "Simple enough to ship. Open enough to grow.", "The current release is deterministic for demo reliability; live recognition can replace the selected scenario later without rewriting the UI loop.");
  card(slide, ctx, 74, 300, 216, 150, "Real-world target", "Poster, object, place, product, exhibit. The user is already looking at it.", C.cyan);
  card(slide, ctx, 360, 236, 250, 108, "Scan page", "Frames attention, lock state, and the call to start解析.", C.cyan);
  card(slide, ctx, 360, 380, 250, 108, "Discovery page", "Identity, context, story, deep dive, save feedback.", C.amber);
  card(slide, ctx, 360, 524, 250, 108, "Challenge page", "Clue prompt, answer reveal, success ending.", C.green);
  card(slide, ctx, 704, 300, 220, 150, "Scenario module", "Curated deterministic data keeps the hero path stable for judging.", C.amber);
  card(slide, ctx, 984, 300, 210, 150, "Future recognizer", "Camera and model output can choose the scenario later.", C.coral);
  ctx.addShape(slide, { x: 290, y: 373, width: 70, height: 4, fill: "#2b626a" });
  ctx.addShape(slide, { x: 610, y: 288, width: 94, height: 4, fill: "#2b626a" });
  ctx.addShape(slide, { x: 610, y: 432, width: 94, height: 4, fill: "#2b626a" });
  ctx.addShape(slide, { x: 610, y: 576, width: 94, height: 4, fill: "#2b626a" });
  ctx.addShape(slide, { x: 924, y: 373, width: 60, height: 4, fill: "#2b626a" });
  ctx.addText(slide, { text: "AIUI pages are presentation surfaces; scenario data is the swappable product brain.", x: 360, y: 638, width: 650, height: 22, fontSize: 15, color: C.muted, typeface: ctx.fonts.body });
  footer(slide, ctx, 5);
  return slide;
}
`;
}

function slide06() {
  return `
import { bg, footer, title, C } from "./common.mjs";

export async function slide06(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  title(slide, ctx, "05 / RELEASE EVIDENCE", "The contest build has concrete shipping evidence.", "We separate what is verified from the one remaining platform-only manual upload step.");
  const rows = [
    ["Source", "GitHub subdirectory import path is ready for Craft.", "github.com/gdgeek/AIUI/tree/main/apps/inspiration-hunter", C.cyan],
    ["Package", "Local AIX candidate is parsed by the official reader.", "a6ab2dde6663... / 210,294 bytes", C.green],
    ["AIUI", "All three pages expose schema-backed tool metadata.", "scan / discovery / challenge", C.amber],
    ["Release", "Lingzhu AIUI form prepared; manual file upload remains.", "icon.png + gdgeek-AIUI-apps-inspiration-hunter.aix", C.coral]
  ];
  for (let i = 0; i < rows.length; i += 1) {
    const [label, claim, proof, tone] = rows[i];
    const y = 270 + i * 82;
    ctx.addShape(slide, { x: 84, y, width: 1070, height: 62, fill: "#0b262b", line: ctx.line("#25545b", 1) });
    ctx.addShape(slide, { x: 84, y, width: 7, height: 62, fill: tone });
    ctx.addText(slide, { text: label, x: 112, y: y + 17, width: 105, height: 22, fontSize: 15, color: tone, bold: true, typeface: ctx.fonts.mono });
    ctx.addText(slide, { text: claim, x: 238, y: y + 9, width: 820, height: 24, fontSize: 17, color: C.ink, bold: true, typeface: ctx.fonts.body });
    ctx.addText(slide, { text: proof, x: 238, y: y + 36, width: 820, height: 18, fontSize: 11, color: C.muted, typeface: ctx.fonts.mono });
  }
  ctx.addShape(slide, { x: 846, y: 92, width: 260, height: 114, fill: "#09252a", line: ctx.line(C.green, 1) });
  ctx.addText(slide, { text: "Verified locally", x: 872, y: 112, width: 190, height: 28, fontSize: 22, color: C.green, bold: true, typeface: ctx.fonts.title });
  ctx.addText(slide, { text: "verify-inspiration-hunter-release.mjs", x: 872, y: 154, width: 200, height: 32, fontSize: 12, color: C.muted, typeface: ctx.fonts.mono });
  footer(slide, ctx, 6);
  return slide;
}
`;
}

function slide07() {
  return `
import { bg, footer, title, card, C } from "./common.mjs";

export async function slide07(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  title(slide, ctx, "06 / WHY IT CAN WIN", "It is native to glasses, reliable on stage, and big enough to grow.", "The project tells judges a credible story: useful now, extensible later.");
  card(slide, ctx, 76, 290, 310, 164, "Native fit", "The experience begins with the thing already in front of the user, not with a text prompt.", C.cyan);
  card(slide, ctx, 466, 290, 310, 164, "Demo reliability", "The hero scenario is curated and deterministic, so the pitch does not depend on fragile recognition live on stage.", C.green);
  card(slide, ctx, 856, 290, 310, 164, "Expandable product", "The same loop can serve museums, city walks, retail learning, and education field trips.", C.amber);
  ctx.addShape(slide, { x: 92, y: 516, width: 1058, height: 82, fill: "#09252a", line: ctx.line("#24545c", 1) });
  ctx.addText(slide, { text: "Closing line", x: 122, y: 534, width: 150, height: 22, fontSize: 15, color: C.cyan, bold: true, typeface: ctx.fonts.mono });
  ctx.addText(slide, { text: "Inspiration Hunter is not a chatbot on glasses. It is a discovery loop that begins where glasses are strongest: the thing already in front of the user.", x: 292, y: 526, width: 790, height: 48, fontSize: 22, color: C.ink, bold: true, typeface: ctx.fonts.title });
  footer(slide, ctx, 7);
  return slide;
}
`;
}

async function writeWorkspaceNotes() {
  await fs.mkdir(SLIDES_DIR, { recursive: true });
  await fs.mkdir(QA_DIR, { recursive: true });
  await fs.writeFile(
    path.join(WORKSPACE, "profile-plan.txt"),
    [
      "# Profile Plan",
      "",
      "task mode: create",
      "primary deck-profile: product-platform",
      "secondary gates: engineering credibility, contest judge clarity",
      "required proof objects: workflow loop, system map, release evidence, roadmap/use-case expansion",
      "source requirements: use repository docs and verified package manifest only; do not invent metrics",
      "brand authenticity: use the project-owned app icon from apps/inspiration-hunter/assets/icon.png",
      "known missing inputs: final Lingzhu upload and device launch remain manual platform steps",
      "",
    ].join("\n"),
    "utf8",
  );
  await fs.writeFile(
    path.join(WORKSPACE, "source-notes.txt"),
    [
      "# Source Notes",
      "",
      "Identity asset: apps/inspiration-hunter/assets/icon.png, generated and tracked in this repository for Inspiration Hunter.",
      "Story source: docs/contest/inspiration-hunter-submission.md.",
      "Demo timing source: docs/contest/inspiration-hunter-demo-runbook.md.",
      "Judging source: docs/contest/inspiration-hunter-judge-scorecard.md.",
      "Release source: docs/contest/inspiration-hunter-release-manifest.json and docs/rokid/deployment-inspiration-hunter.md.",
      "No external logos, screenshots, or unverified identity assets are used.",
      "",
    ].join("\n"),
    "utf8",
  );
  await fs.writeFile(
    path.join(WORKSPACE, "claim-spine.txt"),
    [
      "# Claim Spine",
      "",
      "1. Turn seeing into discovery.",
      "2. Recognition alone is too shallow for AI glasses.",
      "3. A repeatable discovery loop creates the product.",
      "4. The demo has a reliable 60-second story.",
      "5. The architecture can ship now and grow later.",
      "6. The release package has concrete verification evidence.",
      "7. The project can win because it is native, reliable, and expandable.",
      "",
    ].join("\n"),
    "utf8",
  );
  await fs.writeFile(
    path.join(WORKSPACE, "design-system.txt"),
    [
      "# Design System",
      "",
      "Direction: dark teal scanner interface with editorial presentation discipline.",
      "Palette: deep teal background, cyan scan lines, amber discovery highlights, green verification, coral caveats.",
      "Typography: Aptos Display for claims, Aptos for body, Aptos Mono for evidence rails and file/hash labels.",
      "Primitives: scan frame, stage cards, proof rows, thin grid, status rail.",
      "Anti-patterns avoided: generic SaaS feature-card grids, fake brand marks, decorative logos, and invented metrics.",
      "",
    ].join("\n"),
    "utf8",
  );
  await fs.writeFile(
    path.join(WORKSPACE, "contact-sheet-plan.txt"),
    [
      "# Contact Sheet Plan",
      "",
      "Slide 1: cover with identity object and release status rail.",
      "Slide 2: problem ladder with depth progression.",
      "Slide 3: horizontal product loop with five stages.",
      "Slide 4: timed demo sequence.",
      "Slide 5: system architecture map.",
      "Slide 6: release evidence table.",
      "Slide 7: three-pillar judge close with statement block.",
      "",
      "Macro-layout check: no three consecutive slides share the same pattern; only one three-card slide is used.",
      "",
    ].join("\n"),
    "utf8",
  );
}

async function writeSlides() {
  await fs.writeFile(path.join(SLIDES_DIR, "common.mjs"), commonSource(), "utf8");
  const slides = [slide01, slide02, slide03, slide04, slide05, slide06, slide07];
  for (let i = 0; i < slides.length; i += 1) {
    const name = `slide-${String(i + 1).padStart(2, "0")}.mjs`;
    await fs.writeFile(path.join(SLIDES_DIR, name), slides[i](), "utf8");
  }
}

async function main() {
  if (!fsSync.existsSync(BUILD_SCRIPT)) {
    throw new Error(`Missing presentation build script: ${BUILD_SCRIPT}`);
  }
  if (!fsSync.existsSync(ICON_PATH)) {
    throw new Error(`Missing icon asset: ${ICON_PATH}`);
  }

  await writeWorkspaceNotes();
  await writeSlides();
  await fs.mkdir(path.dirname(FINAL_PPTX), { recursive: true });

  const result = spawnSync(
    process.execPath,
    [
      BUILD_SCRIPT,
      "--workspace",
      WORKSPACE,
      "--slides-dir",
      SLIDES_DIR,
      "--out",
      FINAL_PPTX,
      "--preview-dir",
      PREVIEW_DIR,
      "--layout-dir",
      LAYOUT_DIR,
      "--contact-sheet",
      path.join(PREVIEW_DIR, "contact-sheet.png"),
      "--manifest",
      path.join(QA_DIR, "artifact-build-manifest.json"),
      "--slide-count",
      String(manifest.slideCount),
      "--slide-size",
      "1280x720",
      "--scale",
      "1",
    ],
    {
      cwd: ROOT,
      encoding: "utf8",
      env: {
        ...process.env,
        PYTHON: process.env.PYTHON || (fsSync.existsSync(BUNDLED_PYTHON) ? BUNDLED_PYTHON : "python3"),
      },
    },
  );

  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.status !== 0) {
    throw new Error(`Deck build failed with exit code ${result.status}`);
  }

  const finalStat = await fs.stat(FINAL_PPTX);
  const buildManifest = {
    ...manifest,
    outputBytes: finalStat.size,
    previewDir: PREVIEW_DIR,
    layoutDir: LAYOUT_DIR,
    contactSheet: path.join(PREVIEW_DIR, "contact-sheet.png"),
    buildManifest: path.join(QA_DIR, "artifact-build-manifest.json"),
  };
  await fs.writeFile(path.join(QA_DIR, "pitch-deck-build-summary.json"), `${JSON.stringify(buildManifest, null, 2)}\n`, "utf8");
  console.log(JSON.stringify(buildManifest, null, 2));
}

main().catch((error) => {
  console.error(error.stack || error.message || String(error));
  process.exit(1);
});
