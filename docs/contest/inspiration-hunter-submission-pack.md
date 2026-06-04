# Inspiration Hunter Submission Pack

Date: 2026-06-04

This document describes the local package prepared for final Lingzhu upload and contest submission.

## Build Command

```bash
node /Users/geek/Documents/AIUI/scripts/build-inspiration-hunter-submission-pack.mjs
```

## Output

Folder:

```text
/Users/geek/Documents/AIUI/release/inspiration-hunter-submission-pack
```

Zip archive:

```text
/Users/geek/Documents/AIUI/release/inspiration-hunter-submission-pack.zip
```

The `release/` directory is intentionally ignored by Git because it contains generated local upload bundles and the `.aix` package copy.

## File Order

Use this order when submitting or uploading:

1. `00-UPLOAD-FIRST.txt`
2. `01-InspirationHunter-icon.png`
3. `02-InspirationHunter-v0.1.0.aix`
4. `03-InspirationHunter-pitch-deck.pptx`
5. `03a-cn-judge-one-pager.md`
6. `04-contest-submission.md`
7. `05-demo-runbook.md`
8. `06-release-checklist.md`
9. `07-judge-scorecard.md`
10. `08-final-release-evidence.md`
11. `09-lingzhu-aiui-release-handoff.md`
12. `10-demo-storyboard.svg`
13. `11-aiui-craft-lingzhu-project-playbook.md`
14. `manifest.json`

## Lingzhu Upload Fields

Use these exact files in the Lingzhu AIUI form:

```text
图标*: 01-InspirationHunter-icon.png
agent程序包: 02-InspirationHunter-v0.1.0.aix
```

The pack builder verifies these files against `docs/contest/inspiration-hunter-release-manifest.json` before writing the bundle.

## Judge Materials

Use `03a-cn-judge-one-pager.md` when the reviewer or event context is Chinese-first. It includes Chinese content with an ASCII file name for safer upload and zip compatibility:

- the one-line Chinese product pitch
- the AI glasses fit argument
- a 60-second demo rhythm
- a 90-second spoken pitch
- likely judge Q&A
- the closing line for live presentation

Use `10-demo-storyboard.svg` as a visual companion when reviewers need to understand the app before opening Craft. It is a storyboard derived from the implemented demo flow, not a device screenshot.

Use `11-aiui-craft-lingzhu-project-playbook.md` as the reusable process record for future AIUI projects. It captures the exact Craft, Lingzhu, native file picker, binding, review, and testing gates that prevented detours in this project.

## Why This Pack Exists

The Codex in-app browser cannot attach local files through the platform file picker. This pack makes the remaining manual step safer by copying the required upload files into a single folder with short, obvious names.
