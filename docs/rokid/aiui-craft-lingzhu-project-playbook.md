# AIUI Craft and Lingzhu Project Playbook

Date: 2026-06-04

Use this playbook for future AIUI projects that need to move from idea to a Craft build, Lingzhu AIUI agent, review submission, and contest/demo materials without repeating the detours from `Inspiration Hunter`.

Chinese SOP for future projects:

```text
docs/rokid/aiui-craft-lingzhu-end-to-end-zh.md
```

## Golden Path

1. Define the app concept and judging hook.
2. Build the AIUI app locally in `apps/<project-name>`.
3. Verify page metadata, schemas, icon, and deterministic demo flow locally.
4. Push the source to GitHub.
5. Import the GitHub subdirectory into Craft.
6. Run the app in Craft and confirm `初始化成功`.
7. Package the app as `.aix`.
8. Create a Lingzhu `AIUI智能体`.
9. Upload the icon and `.aix` package to Lingzhu.
10. Confirm Lingzhu parsed md5, title, version, pages, and tools.
11. Confirm the Lingzhu agent creation form.
12. Return to Craft with `defaultAgentId=<agent-id>` in the URL.
13. Run the app again from Craft.
14. Open `提审`, confirm the bound agent, fill version notes, and submit.
15. Verify launch from the official review/release surface or device.

Do not call a project published until the final launch surface is verified. A valid `.aix` and a created Lingzhu draft are necessary but not sufficient.

## Repository Layout

Recommended layout:

```text
apps/<project-name>/
  AGENTS.md
  VERSION
  app.js
  app.json
  package.json
  assets/
    icon.png
    icon.svg
  lib/
    scenarios.js
  pages/
    index/index.ink
    <feature>/index.ink

docs/contest/
docs/rokid/
scripts/
artifacts/
release/
```

Keep `artifacts/` and `release/` ignored by Git unless the project explicitly requires binary artifacts in source control.

## App Requirements

Each AIUI app should include:

- `app.json` with the app title, icon, pages, and entry point.
- `VERSION` with the user-visible app package version.
- One 1024x1024 PNG icon for Lingzhu upload.
- One SVG source icon if future edits are expected.
- `.ink` pages with `description` and `schema.data` metadata so Lingzhu can generate useful tools.
- A deterministic demo scenario that works without external services.
- A short `AGENTS.md` explaining app intent and demo flow.

For contest projects, design around a 60 to 90 second judge path:

```text
start -> first delight -> deeper value -> mini challenge or payoff -> clear ending
```

## Glasses Preview Fit

Treat the Craft runtime preview as a glasses-first surface, not a phone webpage. The `Inspiration Hunter` flow initially initialized successfully but was still unusable because the 448x150 preview only showed the top hero card and hid the primary action.

Design rules for future projects:

- keep the primary route visible inside 448x150.
- use a fixed visible stage such as `.screen { height: 150px; overflow: hidden; }`.
- avoid `min-height: 100vh` for the main interaction shell.
- keep the title, status, and primary CTA visible on first render.
- prefer compact horizontal panels over tall stacked cards.
- verify each critical button is present in the first viewport before packaging.

For `Inspiration Hunter`, this guard is encoded in:

```bash
node --test scripts/inspiration-hunter-viewport-fit.test.mjs
```

Future projects should clone that pattern with project-specific page paths and labels.

## Local Verification

Run the project verifier before each handoff:

```bash
node scripts/verify-inspiration-hunter-release.mjs
```

For future projects, clone this verifier pattern and check:

- icon exists, is PNG, and is accepted by Lingzhu.
- `.aix` exists and can be parsed by the official AIX reader.
- title and version match expectations.
- all expected pages are present.
- each page has schema keys.
- generated tools have useful descriptions.

For submission packs, also run:

```bash
node --test scripts/build-inspiration-hunter-submission-pack.test.mjs
node scripts/build-inspiration-hunter-submission-pack.mjs
unzip -t release/inspiration-hunter-submission-pack.zip
```

Future projects should keep equivalent tests so a release bundle is not assembled by memory.

## GitHub Publishing

Craft imports cleanly from a GitHub subdirectory. Push the app source before importing:

```bash
git status --short --branch
git add .
git commit -m "feat: add <project-name> AIUI app"
git push origin main
```

If SSH port `22` is blocked, use SSH over port `443`:

```bash
git remote set-url origin ssh://git@ssh.github.com:443/<owner>/<repo>.git
git push origin main
```

Acceptance evidence:

- `git status --short --branch` is clean or only has intentional ignored artifacts.
- GitHub `main` contains the app subdirectory.
- Craft can import from `https://github.com/<owner>/<repo>/tree/main/apps/<project-name>`.

## Craft Import and Runtime Check

In [Craft](https://js.rokid.com/craft):

1. Log in.
2. Import the GitHub subdirectory.
3. Confirm the file tree contains app files, `lib/`, and `pages/`.
4. Confirm the page panel shows all expected pages as `READY`.
5. Click `运行智能体`.
6. Wait for `初始化成功`.
7. Use the preview to run the golden path.

Acceptance evidence:

- current project name appears in the Craft file tree.
- page cards show expected route paths.
- session status shows `初始化成功`.
- the first screen renders in the preview.

Known limitation: Craft preview can behave like a canvas or embedded runtime. DOM automation may not see every in-app tap. Pair source-level tests with visual/manual preview checks instead of relying on DOM-only testing.

If Craft still shows stale source after a GitHub push:

1. Click `重新加载当前工程`.
2. Re-import the same GitHub subdirectory URL.
3. If the main branch still appears stale, import a commit-specific URL:

```text
https://github.com/<owner>/<repo>/tree/<commit-sha>/apps/<project-name>
```

4. Open the changed `.ink` file in Craft and confirm the source contains the latest layout.
5. Run again and capture a screenshot before continuing to package or review.

## Packaging

Use Craft packaging when the local CLI is missing or unstable:

1. Click `打包`.
2. Keep defaults unless you know why to change them:
   - `资源优化`: on
   - `JSON 校验`: on
   - optimization level: default or `Level 2`
3. Click `开始打包`.
4. Download the `.aix`.
5. Store the release candidate under `artifacts/`.
6. Parse it locally with the verifier.

Do not upload a zip to Lingzhu. Lingzhu `agent程序包` requires `.aix`.

## Lingzhu AIUI Agent Creation

Open the Lingzhu project development page:

```text
https://rizon.rokid.com/space/<space-id>/develop
```

Choose `项目开发` -> `AIUI智能体` -> `创建`.

Recommended form pattern:

```text
智能体名称: <PascalOrCamelName>
智能体版本: 1.0.0
类别: choose the closest user-facing category
功能介绍: one concise sentence explaining the value
开场白: one short phrase users can say
```

Recommended permissions depend on the app. For glasses-first camera/voice demos, usually enable:

```text
网络
摄像头
语音识别
麦克风
```

Upload:

```text
图标: apps/<project-name>/assets/icon.png
agent程序包: artifacts/<package-name>.aix
```

After uploading the `.aix`, wait for Lingzhu to populate all parse fields:

```text
文件md5值
jsui包标题
jsui包版本
jsui包页面
jsui包工具
```

Only click `确认` after those fields are non-empty.

## File Picker Reality

Codex's in-app browser can fill text fields, check boxes, click buttons, and inspect state, but it cannot programmatically attach local files to native file pickers. This is a platform security boundary.

Fastest reliable workaround:

1. Let Codex open the file picker.
2. Press `Shift + Command + G`.
3. Paste the exact file path.
4. Press Enter, then Enter again to choose.
5. Let Codex verify the parsed fields and continue.

If macOS Accessibility/Input Monitoring permission is granted to the automation host, system-level file picker automation may work. Without that permission, `osascript` will fail with an error like `not allowed to send keystrokes`.

Do not spend time trying to inject `File`, `Blob`, `DataTransfer`, `fetch`, or `localStorage` through the in-app browser sandbox; these APIs are not exposed reliably in this environment.

## Craft Binding After Lingzhu Creation

After clicking `确认` in Lingzhu:

- Lingzhu should show `操作成功`.
- The new AIUI agent appears in the `AIUI智能体` list.
- Craft can reopen with a URL like:

```text
https://js.rokid.com/craft?defaultAgentId=<agent-id>
```

For `Inspiration Hunter`, the created agent was:

```text
7c5ebbe8edc04f1fa09b6bf9c59a3f26
```

Acceptance evidence:

- Craft URL contains `defaultAgentId`.
- Craft `提审` panel shows the current bound agent.
- Agent title, version, description, icon, and ID match the Lingzhu record.

## Review Submission

In Craft:

1. Click `提审`.
2. Step 1: confirm the bound Lingzhu agent.
3. Click `下一步`.
4. Leave `需要用户协议` off unless the app truly needs a user agreement.
5. Add version notes when useful.
6. Click `提交提审`.
7. Wait for the success message.

Suggested version note:

```text
Initial contest demo release. Includes scan landing, discovery explanation, and challenge payoff flow for Inspiration Hunter.
```

Acceptance evidence:

- `提交成功` or equivalent success message appears.
- The panel closes or the review status changes.
- Lingzhu/Craft no longer shows the agent only as an unsubmitted draft.

## Testing Checklist

Test in three layers.

Source and package:

- verifier returns `"ok": true`
- expected icon SHA/size is stable
- expected AIX title and version are parsed
- expected pages and tools are present

Craft runtime:

- project imports from GitHub
- `运行智能体` reaches `初始化成功`
- first page renders
- golden path can move through the designed screens
- logs do not show fatal runtime errors

Lingzhu/release:

- AIUI agent exists
- package parse fields are filled
- Craft URL has `defaultAgentId`
- `提审` shows the correct bound agent
- review submission returns success
- app launches from the official surface or target device

## Contest Pack

For a contest entry, maintain a repeatable release bundle:

```text
00-UPLOAD-FIRST.txt
01-<AppName>-icon.png
02-<AppName>-v<version>.aix
03-<AppName>-pitch-deck.pptx
03a-cn-judge-one-pager.md
04-contest-submission.md
05-demo-runbook.md
06-release-checklist.md
07-judge-scorecard.md
08-final-release-evidence.md
09-lingzhu-aiui-release-handoff.md
10-demo-storyboard.svg
11-aiui-craft-lingzhu-project-playbook.md
12-aiui-craft-lingzhu-end-to-end-zh.md
manifest.json
```

Every generated bundle should have a manifest with SHA-256 values. That makes it possible to prove exactly which package and materials were submitted.

## Avoid These Detours

- Do not try to upload `.zip` where Lingzhu asks for `agent程序包`; use `.aix`.
- Do not click `确认` before Lingzhu fills all disabled parse fields.
- Do not assume a visible filename means upload succeeded; verify md5, pages, and tools.
- Do not treat `草稿` as published.
- Do not treat a created Lingzhu agent as Craft-bound unless `defaultAgentId` appears or Craft `提审` shows that agent.
- Do not rely only on browser DOM testing for Craft preview; use screenshots/manual preview plus local verifiers.
- Do not spend time fighting native file upload automation unless Accessibility permission is available.
- Do not submit a contest entry without a demo runbook and fallback screenshots/storyboard.

## Fast Recovery

If a session breaks:

1. Check Git status and latest pushed commit.
2. Check `artifacts/` for the latest `.aix`.
3. Run the verifier.
4. Reopen Craft from the GitHub subdirectory.
5. If a Lingzhu agent already exists, use Craft with `defaultAgentId=<agent-id>`.
6. Reopen `提审` and inspect the bound agent.
7. Continue from the first missing acceptance gate.

For `Inspiration Hunter`, the key recovery values are:

```text
Craft import: https://github.com/gdgeek/AIUI/tree/main/apps/inspiration-hunter
Local app: /Users/geek/Documents/AIUI/apps/inspiration-hunter
Icon: /Users/geek/Documents/AIUI/apps/inspiration-hunter/assets/icon.png
AIX: /Users/geek/Documents/AIUI/artifacts/gdgeek-AIUI-apps-inspiration-hunter.aix
Lingzhu agent ID: 7c5ebbe8edc04f1fa09b6bf9c59a3f26
Craft bound URL: https://js.rokid.com/craft?defaultAgentId=7c5ebbe8edc04f1fa09b6bf9c59a3f26
```
