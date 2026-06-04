# Inspiration Hunter Final Release Evidence Guide

Date: 2026-06-04

Use this guide for the final manual release pass. Its purpose is to turn the last platform-only steps into concrete evidence that the app is published and launchable.

## Files To Upload

Use these exact files:

```text
/Users/geek/Documents/AIUI/apps/inspiration-hunter/assets/icon.png
/Users/geek/Documents/AIUI/artifacts/gdgeek-AIUI-apps-inspiration-hunter.aix
```

Do not upload a different AIX unless it has been rebuilt and re-verified with the local AIX reader.

Machine-readable release manifest:

```text
/Users/geek/Documents/AIUI/docs/contest/inspiration-hunter-release-manifest.json
```

Pre-upload verification command:

```bash
node /Users/geek/Documents/AIUI/scripts/verify-inspiration-hunter-release.mjs
```

The command must print `"ok": true` before final upload.

Remote repository verification:

```text
.github/workflows/release-verify.yml
```

The workflow rebuilds the AIX candidate from tracked source and runs the same verifier on GitHub Actions.

Local CI-path simulation:

```bash
AIX_VERIFY_REBUILD=1 node /Users/geek/Documents/AIUI/scripts/verify-inspiration-hunter-release.mjs
```

This mode ignores the existing local `artifacts/` package and rebuilds a temporary AIX from tracked source.

## Current Online State

The Lingzhu AIUI agent has been created and Craft has been reopened with the bound agent ID:

```text
智能体名称: InspirationHunter
智能体版本: 1.0.0
类别: 娱乐
功能介绍: Turn real objects into clues stories and mini challenges for creative exploration on Rokid glasses.
开场白: Say start to hunt for inspiration.
权限: 网络, 摄像头, 语音识别, 麦克风
Lingzhu agent ID: 7c5ebbe8edc04f1fa09b6bf9c59a3f26
Craft bound URL: https://js.rokid.com/craft?defaultAgentId=7c5ebbe8edc04f1fa09b6bf9c59a3f26
```

The uploaded AIX parsed in Lingzhu with:

```text
文件md5值: d032ae84aff3df9be8732cef53f0768d
jsui包标题: Inspiration Hunter
jsui包版本: 0.1.0
jsui包页面: pages/index/index, pages/discovery/index, pages/challenge/index
jsui包工具: generated for all three AIUI pages
```

The latest local source and AIX were updated after a 448x150 Craft preview fix. Final evidence must prove Craft is running that latest layout, not the earlier tall layout.

Current local AIX after the AI glasses key and hands-free interaction fix:

```text
文件md5值: 737ef9993dfd34aeff13642a218a7387
sha256: e50f392e1fe659fcad8f26af29de9913bc90cbc8efe44613ef093455959c839f
bytes: 211055
```

Current Craft runtime evidence after the Rokid Glasses interaction fix:

```text
GitHub commit pushed to main: 988f3d8
Craft import URL: https://github.com/gdgeek/AIUI/tree/main/apps/inspiration-hunter
Craft status: 初始化成功 · 最新
Observed flow: discovery screen auto-opened, challenge answer auto-revealed, final status showed 已完成
Screenshot: /Users/geek/Documents/AIUI/docs/contest/evidence/craft-glasses-discovery.png
Screenshot: /Users/geek/Documents/AIUI/docs/contest/evidence/craft-glasses-final.png
```

Important caveat: the Lingzhu upload record above still references the older uploaded package MD5. Before final `提交提审`, re-upload or re-package the latest AIX if Craft/Lingzhu has not already attached the current package.

## Final Release Steps

1. In Craft, re-import the GitHub subdirectory if the preview still shows the old tall layout.
2. Run the agent and wait for `初始化成功`.
3. Capture the home preview showing the 448x150 layout with the primary action visible.
4. Run the golden path: scan -> discovery -> challenge -> reveal answer.
5. Rebuild/package again if Craft requires packaging from the latest imported source.
6. Re-upload the latest AIX to Lingzhu if the platform does not automatically use the latest Craft package.
7. Open `提审` in the `defaultAgentId` Craft session.
8. Confirm the bound agent is `InspirationHunter`.
9. Fill version notes.
10. Click `提交提审`.
11. Capture the success message or review status.
12. Verify the uploaded build in Lingzhu or on target Rokid hardware.

If the Lingzhu agent ever needs to be recreated, use the upload recovery steps in:

```text
/Users/geek/Documents/AIUI/docs/rokid/lingzhu-aiui-release-handoff.md
```

## Evidence To Capture

Capture these screenshots or notes:

- Lingzhu AIUI agent list showing `InspirationHunter`.
- Lingzhu agent detail page showing version `1.0.0`.
- Upload record or package status showing the AIX was accepted.
- Craft source or import state showing the latest GitHub source is loaded.
- Craft preview showing the compact 448x150 home layout with `开始解析` visible.
- Release manifest hash values for `icon.png` and `.aix`.
- Craft package panel with `上传到灵珠` completed or no longer blocked by binding.
- Craft `提审` success or review status.
- Device or official launch surface showing the scan page.
- One post-upload run through scan, discovery, and challenge.

## Completion Statement Template

Only use this statement after all evidence above exists:

```text
Inspiration Hunter is published to Lingzhu AIUI. Evidence captured: agent list, version detail, accepted AIX upload, Craft binding/upload completion, and post-upload launch flow through scan, discovery, and challenge.
```

If any evidence is missing, say exactly which item is missing instead of calling the project fully published.
