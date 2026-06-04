# Inspiration Hunter Deployment Guide

Date: 2026-06-04

## Current Status

`Inspiration Hunter` has been verified through the current practical release path:

- source of truth: `/Users/geek/Documents/AIUI/apps/inspiration-hunter`
- GitHub remote push works over SSH on port `443`
- Craft import works from a GitHub subdirectory
- Craft run initialization succeeds
- Craft package build succeeds
- a local AIX candidate exists at `/Users/geek/Documents/AIUI/artifacts/gdgeek-AIUI-apps-inspiration-hunter.aix`
- a Lingzhu-compatible PNG icon exists at `/Users/geek/Documents/AIUI/apps/inspiration-hunter/assets/icon.png`
- all three pages expose AIUI `description` and `schema.data` metadata for cleaner tool generation

Current known limitations:

- Craft preview renders the app correctly, but the embedded preview surface is canvas-like, so full browser automation of every in-app tap is less reliable than normal DOM testing.
- Codex's in-app browser cannot reliably download Craft-generated files or attach local files through the system file picker. The final Lingzhu icon and AIX upload should be completed manually with the local files listed below.

## Project Files

Core app files:

- `/Users/geek/Documents/AIUI/apps/inspiration-hunter/AGENTS.md`
- `/Users/geek/Documents/AIUI/apps/inspiration-hunter/VERSION`
- `/Users/geek/Documents/AIUI/apps/inspiration-hunter/app.js`
- `/Users/geek/Documents/AIUI/apps/inspiration-hunter/app.json`
- `/Users/geek/Documents/AIUI/apps/inspiration-hunter/assets/icon.png`
- `/Users/geek/Documents/AIUI/apps/inspiration-hunter/assets/icon.svg`
- `/Users/geek/Documents/AIUI/apps/inspiration-hunter/lib/scenarios.js`
- `/Users/geek/Documents/AIUI/apps/inspiration-hunter/pages/index/index.ink`
- `/Users/geek/Documents/AIUI/apps/inspiration-hunter/pages/discovery/index.ink`
- `/Users/geek/Documents/AIUI/apps/inspiration-hunter/pages/challenge/index.ink`

## GitHub Publish Path

The repository is published from this machine using SSH over port `443`:

```bash
cd /Users/geek/Documents/AIUI
env GIT_SSH_COMMAND='ssh -o StrictHostKeyChecking=accept-new -p 443' \
  git push -u ssh://git@ssh.github.com:443/gdgeek/AIUI.git main:main
```

This is the preferred fallback when port `22` is blocked.

The configured remote is:

```text
ssh://git@ssh.github.com:443/gdgeek/AIUI.git
```

## How To Open In Craft

1. Open [https://js.rokid.com/craft](https://js.rokid.com/craft)
2. Log in with your Rokid account
3. Choose `GitHub 子目录` import
4. Paste this source path:

```text
https://github.com/gdgeek/AIUI/tree/main/apps/inspiration-hunter
```

5. Confirm the file tree shows:

- `AGENTS.md`
- `app.js`
- `app.json`
- `lib/scenarios.js`
- `pages/index/index.ink`
- `pages/discovery/index.ink`
- `pages/challenge/index.ink`

## What Has Been Verified In Craft

Verified successfully:

- project import from GitHub subdirectory
- page list readiness for all three pages
- `运行智能体`
- initialization success state
- homepage preview render
- `打包` dialog open
- successful AIX package build inside Craft

Verified app flow at the source level:

- home page enters discovery page
- discovery page supports `深挖`
- discovery page supports `收藏`
- discovery page enters `挑战模式`
- challenge page reveals answer and success state

## Packaging Path

The current machine does not have a working local `aiui` CLI on `PATH`, so the known-good packaging route is Craft.

The local handoff package candidate is:

```text
/Users/geek/Documents/AIUI/artifacts/gdgeek-AIUI-apps-inspiration-hunter.aix
```

It has been parsed by the official local `@yodaos-pkg/aix` reader. The reader reports version `0.1.0`, title `Inspiration Hunter`, the three expected pages, and schema-backed tools for the scan, discovery, and challenge screens without missing-schema warnings.

### Craft Packaging Steps

1. Import the GitHub subdirectory into Craft
2. Click `运行智能体` and wait for `初始化成功`
3. Click `打包`
4. Keep the default options unless you have a specific need:
   - `资源优化`: on
   - `JSON 校验`: on
   - `优化等级`: `Level 2`
5. Click `开始打包`
6. Wait for the result panel
7. Download the generated package file:

```text
gdgeek-AIUI-apps-inspiration-hunter.aix
```

8. If you have already bound a 灵珠智能体 in Craft, you can continue with `上传到灵珠`

## Lingzhu AIUI Binding

The Lingzhu AIUI agent creation form accepts:

- icon files: `.jpeg`, `.jpg`, `.png`, `.gif`
- agent packages: `.aix`

Use these local files:

```text
/Users/geek/Documents/AIUI/apps/inspiration-hunter/assets/icon.png
/Users/geek/Documents/AIUI/artifacts/gdgeek-AIUI-apps-inspiration-hunter.aix
```

Recommended form values:

```text
智能体名称: InspirationHunter
智能体版本: 1.0.0
类别: 娱乐
功能介绍: Turn real objects into clues stories and mini challenges for creative exploration on Rokid glasses.
开场白: Say start to hunt for inspiration.
```

Recommended permissions:

```text
网络
摄像头
语音识别
麦克风
```

Detailed handoff: `/Users/geek/Documents/AIUI/docs/rokid/lingzhu-aiui-release-handoff.md`

## Optional Local CLI Checks

If you later install the official tooling locally, verify which path exists:

```bash
aiui --help
aiui --version
aiui-open --help
aiui-aix --help
```

If a supported CLI becomes available later, you can add a secondary offline package path.

## Device Demo Flow

After a package is produced:

1. upload or sync the artifact through the Rokid-supported release flow
2. refresh resources on the target device if required
3. launch `Inspiration Hunter`
4. run the golden path from scan to challenge completion

## Stage Demo Script

Recommended live script:

1. “I’m looking at a real-world object.”
2. “The glasses lock onto it.”
3. “AI reveals why it matters.”
4. “I go deeper.”
5. “I enter a challenge and unlock the answer.”

## Contest Materials

Use these files for submission and presentation:

- `/Users/geek/Documents/AIUI/docs/contest/inspiration-hunter-submission.md`
- `/Users/geek/Documents/AIUI/docs/contest/inspiration-hunter-demo-runbook.md`
- `/Users/geek/Documents/AIUI/docs/contest/inspiration-hunter-demo-storyboard.svg`
- `/Users/geek/Documents/AIUI/docs/contest/inspiration-hunter-cn-one-pager.md`
- `/Users/geek/Documents/AIUI/docs/contest/inspiration-hunter-pitch-deck.md`
- `/Users/geek/Documents/AIUI/docs/contest/inspiration-hunter-pitch-deck.pptx`
- `/Users/geek/Documents/AIUI/docs/contest/inspiration-hunter-submission-pack.md`
- `/Users/geek/Documents/AIUI/docs/contest/inspiration-hunter-release-checklist.md`
- `/Users/geek/Documents/AIUI/docs/rokid/lingzhu-aiui-release-handoff.md`

To create a local upload/submission bundle with short file names:

```bash
node /Users/geek/Documents/AIUI/scripts/build-inspiration-hunter-submission-pack.mjs
```

Generated folder:

```text
/Users/geek/Documents/AIUI/release/inspiration-hunter-submission-pack
```

## Fast Recovery Checklist

If the session breaks and you need to recover fast:

1. confirm GitHub has the latest `main`
2. reopen Craft
3. re-import `https://github.com/gdgeek/AIUI/tree/main/apps/inspiration-hunter`
4. run the app
5. package from Craft again
