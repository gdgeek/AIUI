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
6. `03b-award-defense.md`
7. `04-contest-submission.md`
8. `05-demo-runbook.md`
9. `06-release-checklist.md`
10. `07-judge-scorecard.md`
11. `08-final-release-evidence.md`
12. `09-lingzhu-aiui-release-handoff.md`
13. `10-demo-storyboard.svg`
14. `11-aiui-craft-lingzhu-project-playbook.md`
15. `12-aiui-craft-lingzhu-end-to-end-zh.md`
16. `13-rokid-glasses-device-constraints.md`
17. `14-post-review-launch-checklist.md`
18. `15-craft-glasses-discovery.png`
19. `16-craft-glasses-final.png`
20. `17-lingzhu-review-status.png`
21. `manifest.json`

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

Use `03b-award-defense.md` as the hard-question playbook. It covers why the app can win, how to explain the semi-real recognition strategy, how the design maps to Rokid Glasses hardware constraints, and what not to claim while Lingzhu remains `审核中`.

Use `10-demo-storyboard.svg` as a visual companion when reviewers need to understand the app before opening Craft. It is a storyboard derived from the implemented demo flow, not a device screenshot.

Use `11-aiui-craft-lingzhu-project-playbook.md` as the reusable process record for future AIUI projects. It captures the exact Craft, Lingzhu, native file picker, binding, review, and testing gates that prevented detours in this project.

Use `12-aiui-craft-lingzhu-end-to-end-zh.md` as the Chinese SOP for future projects. It is the fastest teammate-facing path from idea, local development, Craft import, Lingzhu upload, binding, review, and final launch verification.

Use `13-rokid-glasses-device-constraints.md` before designing the next AIUI app. It turns Rokid Glasses hardware parameters into UI, interaction, and demo constraints.

Use `14-post-review-launch-checklist.md` after Lingzhu leaves `审核中`. It is the five-minute path for official launch or Rokid Glasses device verification.

Use `15-craft-glasses-discovery.png`, `16-craft-glasses-final.png`, and `17-lingzhu-review-status.png` as visual evidence: Craft runtime discovery, Craft runtime challenge completion, and Lingzhu `审核中` status.

## Why This Pack Exists

The Codex in-app browser cannot attach local files through the platform file picker. This pack makes the remaining manual step safer by copying the required upload files into a single folder with short, obvious names.
