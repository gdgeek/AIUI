# Inspiration Hunter Release Checklist

Date: 2026-06-04

## Release Readiness

- [x] Local AIUI source exists at `/Users/geek/Documents/AIUI/apps/inspiration-hunter`
- [x] App identity is defined in `AGENTS.md`
- [x] Routes are limited to the three MVP pages
- [x] All three AIUI pages include `description` and `schema.data` metadata
- [x] Deterministic hero scenario exists in `lib/scenarios.js`
- [x] App version file exists at `/Users/geek/Documents/AIUI/apps/inspiration-hunter/VERSION`
- [x] Lingzhu-compatible PNG icon exists at `/Users/geek/Documents/AIUI/apps/inspiration-hunter/assets/icon.png`
- [x] Craft imports the project from the GitHub subdirectory
- [x] Craft reports all three pages as `Ready`
- [x] Craft `运行智能体` initializes successfully
- [x] Craft homepage preview renders
- [x] Craft package build completes
- [x] AIX package result is named `gdgeek-AIUI-apps-inspiration-hunter.aix`
- [x] Local AIX candidate exists at `/Users/geek/Documents/AIUI/artifacts/gdgeek-AIUI-apps-inspiration-hunter.aix`
- [x] Local AIX candidate parses with the official `@yodaos-pkg/aix` reader
- [x] AIX reader reports schema-backed tools for scan, discovery, and challenge pages without missing-schema warnings
- [x] Lingzhu AIUI form has name, version, category, intro, greeting, and four recommended permissions prepared in the current browser session
- [x] Reusable repo skills exist for AIUI app building, Craft/Lingzhu release, and contest polishing
- [x] Lingzhu AIUI agent `InspirationHunter` was created successfully
- [x] Lingzhu accepted and parsed the uploaded AIX package
- [x] Craft is opened with `defaultAgentId=7c5ebbe8edc04f1fa09b6bf9c59a3f26`
- [x] Craft `提审` reaches the bound-agent confirmation flow
- [x] The local app has a 448x150 viewport regression test
- [x] Rokid Glasses hardware constraints are documented locally
- [x] The local app has a glasses key and hands-free interaction regression test
- [x] The latest local AIX candidate was rebuilt after the 448x150 viewport fix
- [x] Craft has re-imported the latest 448x150 source from GitHub
- [x] Craft runtime golden path is verified after the latest re-import
- [x] Craft `提交提审` succeeds
- [ ] Device-side launch is verified on target Rokid hardware

## Required Craft Import URL

```text
https://github.com/gdgeek/AIUI/tree/main/apps/inspiration-hunter
```

## Required Package Name

```text
gdgeek-AIUI-apps-inspiration-hunter.aix
```

## Required Local Upload Files

```text
/Users/geek/Documents/AIUI/apps/inspiration-hunter/assets/icon.png
/Users/geek/Documents/AIUI/artifacts/gdgeek-AIUI-apps-inspiration-hunter.aix
```

## Reusable Skills

```text
/Users/geek/Documents/AIUI/skills/rokid-aiui-app-builder
/Users/geek/Documents/AIUI/skills/rokid-craft-lingzhu-release
/Users/geek/Documents/AIUI/skills/aiui-contest-polisher
```

## Final Evidence Guides

```text
/Users/geek/Documents/AIUI/docs/contest/inspiration-hunter-final-release-evidence.md
/Users/geek/Documents/AIUI/docs/contest/inspiration-hunter-demo-storyboard.svg
/Users/geek/Documents/AIUI/docs/contest/inspiration-hunter-judge-scorecard.md
/Users/geek/Documents/AIUI/docs/contest/inspiration-hunter-cn-one-pager.md
/Users/geek/Documents/AIUI/docs/contest/inspiration-hunter-pitch-deck.md
/Users/geek/Documents/AIUI/docs/contest/inspiration-hunter-pitch-deck.pptx
/Users/geek/Documents/AIUI/docs/contest/inspiration-hunter-submission-pack.md
/Users/geek/Documents/AIUI/docs/contest/inspiration-hunter-release-manifest.json
/Users/geek/Documents/AIUI/scripts/build-inspiration-hunter-submission-pack.mjs
/Users/geek/Documents/AIUI/scripts/verify-inspiration-hunter-release.mjs
/Users/geek/Documents/AIUI/.github/workflows/release-verify.yml
```

## Final Online Publish Steps

1. Open [https://js.rokid.com/craft](https://js.rokid.com/craft).
2. Confirm the imported project is `gdgeek/AIUI/apps/inspiration-hunter`.
3. Run the agent and wait for `初始化成功`.
4. Open `打包`.
5. Confirm or rebuild the package.
6. Bind a Lingzhu AI agent if Craft still shows `请先绑定灵珠智能体`.
7. If no AIUI agent exists yet, create one in Lingzhu using the icon and AIX files above.
8. Click `上传到灵珠`.
9. Verify the uploaded build from the Lingzhu agent console or target device flow.

## Acceptance Gate

Do not call the project fully published until these are true:

- the latest AIX package is uploaded to the bound Lingzhu AI agent
- Craft is running the latest 448x150 source, not a stale pre-fix import
- the target device or official release surface can launch the build
- the scan, discovery, and challenge flow has been exercised at least once after upload

## Current Release Gate

The Lingzhu file upload and agent creation steps are complete. Craft now loads the latest pushed 448x150 source, the visual golden path has been verified, the latest Craft-built AIX was uploaded to the bound Lingzhu AIUI agent as version `1.0.1`, and Craft `提交提审` succeeded. The remaining release gate is to verify launch on a target Rokid device or official release surface after review state permits it.

Current verification pass:

- 2026-06-04: pushed commit `988f3d8` to GitHub `main`, re-imported `https://github.com/gdgeek/AIUI/tree/main/apps/inspiration-hunter` through Craft's GitHub 子目录 form, clicked `运行智能体`, and visually verified the hands-free glasses flow from discovery to challenge completion.
- 2026-06-04: bound the Craft GitHub directory key `github:gdgeek/AIUI#main:apps/inspiration-hunter` to Lingzhu AIUI agent `InspirationHunter`, rebuilt the AIX in Craft with default package settings, uploaded it to Lingzhu as version `1.0.1`, refreshed the Craft binding so the review target showed `版本 1.0.1`, and submitted review successfully.
- 2026-06-04: Lingzhu `AIUI智能体` list shows `InspirationHunter` with status `审核中`.
- Screenshots saved locally:
  - `/Users/geek/Documents/AIUI/docs/contest/evidence/craft-glasses-discovery.png`
  - `/Users/geek/Documents/AIUI/docs/contest/evidence/craft-glasses-final.png`
  - `/Users/geek/Documents/AIUI/docs/contest/evidence/lingzhu-review-status.png`

If Craft still shows the old tall layout, re-import:

```text
https://github.com/gdgeek/AIUI/tree/main/apps/inspiration-hunter
```

If `main` is cached, prefer reopening the GitHub 子目录 import form and confirming the same `main` URL again. In this Craft session, `重新加载当前工程` did not prove enough by itself, but a fresh GitHub 子目录 import did.
