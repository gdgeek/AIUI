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

## Current Lingzhu Form State

The open Lingzhu AIUI creation dialog is prepared with:

```text
智能体名称: InspirationHunter
智能体版本: 1.0.0
类别: 娱乐
功能介绍: Turn real objects into clues stories and mini challenges for creative exploration on Rokid glasses.
开场白: Say start to hunt for inspiration.
权限: 网络, 摄像头, 语音识别, 麦克风
```

The two remaining fields are:

- `图标*`
- `agent程序包`

## Manual Release Steps

1. In the open Lingzhu AIUI dialog, upload `icon.png` into `图标*`.
2. Upload `gdgeek-AIUI-apps-inspiration-hunter.aix` into `agent程序包`.
3. Confirm the upload chips or file names are visible.
4. Click `确认`.
5. Confirm the new `InspirationHunter` AIUI agent appears in the AIUI agent list.
6. Return to Craft at [https://js.rokid.com/craft](https://js.rokid.com/craft).
7. Open the `gdgeek/AIUI/apps/inspiration-hunter` project.
8. Bind the newly created Lingzhu AIUI agent.
9. Rebuild or confirm the package result.
10. Click `上传到灵珠`.
11. Verify the uploaded build in Lingzhu or on target Rokid hardware.

## Evidence To Capture

Capture these screenshots or notes:

- Lingzhu AIUI agent list showing `InspirationHunter`.
- Lingzhu agent detail page showing version `1.0.0`.
- Upload record or package status showing the AIX was accepted.
- Craft package panel with `上传到灵珠` completed or no longer blocked by binding.
- Device or official launch surface showing the scan page.
- One post-upload run through scan, discovery, and challenge.

## Completion Statement Template

Only use this statement after all evidence above exists:

```text
Inspiration Hunter is published to Lingzhu AIUI. Evidence captured: agent list, version detail, accepted AIX upload, Craft binding/upload completion, and post-upload launch flow through scan, discovery, and challenge.
```

If any evidence is missing, say exactly which item is missing instead of calling the project fully published.

