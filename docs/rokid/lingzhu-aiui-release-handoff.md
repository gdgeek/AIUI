# Lingzhu AIUI Release Handoff

Date: 2026-06-04

This document is the shortest path from the current Craft package state to an online Lingzhu AIUI release for `Inspiration Hunter`.

For the reusable end-to-end workflow, use:

```text
/Users/geek/Documents/AIUI/docs/rokid/aiui-craft-lingzhu-project-playbook.md
```

## Current Online State

Craft has already imported, run, previewed, and packaged the app from:

```text
https://github.com/gdgeek/AIUI/tree/main/apps/inspiration-hunter
```

The Lingzhu AIUI creation dialog was reached from:

```text
https://rizon.rokid.com/space/7578750283849662464/develop
```

The AIUI agent was created successfully and Craft reopened with the bound ID:

```text
https://js.rokid.com/craft?defaultAgentId=7c5ebbe8edc04f1fa09b6bf9c59a3f26
```

Current agent status:

```text
智能体名称: InspirationHunter
智能体版本: 1.0.0
Lingzhu agent ID: 7c5ebbe8edc04f1fa09b6bf9c59a3f26
Craft review flow: Step 2/2, ready for version notes and 提交提审 after final runtime testing
Important: local AIX was rebuilt after the 448x150 viewport fix. Re-upload if Lingzhu still points to the earlier package md5.
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

Current local AIX identity:

```text
md5: 7f892baf3010841e8f1e3b1ac2d5059a
sha256: 6f50cbaf2195b487c9c85f8f2d20ed00a1ab581dd80ae715ded33c7024a1ebf4
bytes: 210506
```

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

- the Lingzhu AIUI creation form has been submitted successfully
- Craft is open with the bound Lingzhu agent ID
- Craft `提审` has confirmed the bound target
- the current open review panel is on `步骤 2/2`
- final runtime testing should happen before clicking `提交提审`

The earlier uploaded `.aix` package produced these Lingzhu parse values:

```text
文件md5值: d032ae84aff3df9be8732cef53f0768d
jsui包标题: Inspiration Hunter
jsui包版本: 0.1.0
jsui包页面: pages/index/index, pages/discovery/index, pages/challenge/index
jsui包工具: generated for all three AIUI pages
```

If Lingzhu still shows `d032ae84aff3df9be8732cef53f0768d`, the platform is still referencing the pre-viewport-fix package. Re-upload `/Users/geek/Documents/AIUI/artifacts/gdgeek-AIUI-apps-inspiration-hunter.aix` and confirm the md5 updates before final review submission.

## Codex Browser Upload Limitation

Codex can read and fill the Lingzhu form in the in-app browser, but the in-app browser cannot programmatically attach local files to native file pickers. This is an intentional security boundary around local file upload.

Two completion paths are available:

- Best hands-free path: grant macOS Accessibility/Input Monitoring permission to the automation host, then retry the native file picker automation.
- Fastest reliable path: manually select the AIX file once when the file picker opens.

Use this exact file for the `agent程序包` picker:

```text
/Users/geek/Documents/AIUI/artifacts/gdgeek-AIUI-apps-inspiration-hunter.aix
```

## Manual Upload Steps For Recovery

Codex's in-app browser can read the form, fill ordinary fields, and check permissions, but it cannot attach local files through the system file picker without OS-level permission. If the Lingzhu agent ever needs to be recreated, finish the package field with one manual file selection if Accessibility automation is not available:

1. Upload `artifacts/gdgeek-AIUI-apps-inspiration-hunter.aix` into `agent程序包`.
2. Confirm Lingzhu fills `文件md5值`, `jsui包标题`, `jsui包版本`, `jsui包页面`, and `jsui包工具`.
3. Confirm the four permissions are checked.
4. Submit the AIUI agent creation form.
5. Return to Craft and confirm the URL contains `defaultAgentId=<agent-id>`.
6. Open `提审`.
7. Confirm the bound agent in step 1.
8. Fill version notes in step 2.
9. Click `提交提审` only after final runtime testing.
10. Verify launch from the Lingzhu console or target Rokid hardware.

## Acceptance Gate

Do not mark the project fully published until all of these are true:

- the AIUI agent exists in Lingzhu
- the AIX package has been uploaded to that agent
- Craft no longer blocks upload with `请先绑定灵珠智能体`
- Craft `提审` returns a success message
- the app can launch from the official release surface or target device
