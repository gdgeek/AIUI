# Lingzhu AIUI Release Handoff

Date: 2026-06-04

This document is the shortest path from the current Craft package state to an online Lingzhu AIUI release for `Inspiration Hunter`.

## Current Online State

Craft has already imported, run, previewed, and packaged the app from:

```text
https://github.com/gdgeek/AIUI/tree/main/apps/inspiration-hunter
```

The Lingzhu AIUI creation dialog has been reached from:

```text
https://rizon.rokid.com/space/7578750283849662464/develop
```

The form accepts:

- icon files: `.jpeg`, `.jpg`, `.png`, `.gif`
- agent packages: `.aix`

## Local Release Assets

Use these exact local files in the Lingzhu form:

```text
/Users/geek/Documents/AIUI/apps/inspiration-hunter/assets/icon.png
/Users/geek/Documents/AIUI/artifacts/gdgeek-AIUI-apps-inspiration-hunter.aix
```

The icon is 1024x1024 PNG.

The AIX candidate includes:

- `VERSION`
- `AGENTS.md`
- `app.js`
- `app.json`
- `assets/icon.png`
- `assets/icon.svg`
- `lib/scenarios.js`
- all three `.ink` pages
- `package.json`

## Recommended Lingzhu Form Values

Use these values for the AIUI agent:

```text
智能体名称: InspirationHunter
智能体版本: 1.0.0
类别: 娱乐
功能介绍: Turn real objects into clues stories and mini challenges for creative exploration on Rokid glasses.
开场白: Say start to hunt for inspiration.
```

Recommended permission checkboxes:

```text
网络
摄像头
语音识别
麦克风
```

Rationale: the current demo is deterministic, but the product direction is camera-first and voice-friendly. Enabling these permissions avoids a second review/edit pass when live recognition or voice triggers are added.

Current browser session status:

- the Lingzhu AIUI creation dialog is open
- the text fields are filled with the recommended values
- category `娱乐` is selected
- the four recommended permissions are checked
- the icon preview is visible in the form
- the remaining release blocker is the local `.aix` agent package upload

After the `.aix` package is uploaded, Lingzhu should parse and populate `文件md5值`, `jsui包标题`, `jsui包版本`, `jsui包页面`, and `jsui包工具`. Do not submit the form until those disabled parse fields are non-empty.

## Codex Browser Upload Limitation

Codex can read and fill the Lingzhu form in the in-app browser, but the in-app browser cannot programmatically attach local files to native file pickers. This is an intentional security boundary around local file upload.

Two completion paths are available:

- Best hands-free path: grant macOS Accessibility/Input Monitoring permission to the automation host, then retry the native file picker automation.
- Fastest reliable path: manually select the AIX file once when the file picker opens.

Use this exact file for the `agent程序包` picker:

```text
/Users/geek/Documents/AIUI/artifacts/gdgeek-AIUI-apps-inspiration-hunter.aix
```

## Manual Upload Steps

Codex's in-app browser can read the form, fill ordinary fields, and check permissions, but it cannot attach local files through the system file picker without OS-level permission. Finish the package field with one manual file selection if Accessibility automation is not available:

1. Upload `artifacts/gdgeek-AIUI-apps-inspiration-hunter.aix` into `agent程序包`.
2. Confirm Lingzhu fills `文件md5值`, `jsui包标题`, `jsui包版本`, `jsui包页面`, and `jsui包工具`.
3. Confirm the four permissions are checked.
4. Submit the AIUI agent creation form.
5. Return to Craft.
6. Bind the newly created Lingzhu AIUI agent.
7. Click `上传到灵珠`.
8. Verify launch from the Lingzhu console or target Rokid hardware.

## Acceptance Gate

Do not mark the project fully published until all of these are true:

- the AIUI agent exists in Lingzhu
- the AIX package has been uploaded to that agent
- Craft no longer blocks upload with `请先绑定灵珠智能体`
- the app can launch from the official release surface or target device
