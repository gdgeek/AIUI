# Inspiration Hunter Release Checklist

Date: 2026-06-04

## Release Readiness

- [x] Local AIUI source exists at `/Users/geek/Documents/AIUI/apps/inspiration-hunter`
- [x] App identity is defined in `AGENTS.md`
- [x] Routes are limited to the three MVP pages
- [x] Deterministic hero scenario exists in `lib/scenarios.js`
- [x] Craft imports the project from the GitHub subdirectory
- [x] Craft reports all three pages as `Ready`
- [x] Craft `运行智能体` initializes successfully
- [x] Craft homepage preview renders
- [x] Craft package build completes
- [x] AIX package result is named `gdgeek-AIUI-apps-inspiration-hunter.aix`
- [ ] Lingzhu AI agent is bound in Craft
- [ ] AIX package is uploaded to Lingzhu
- [ ] Device-side launch is verified on target Rokid hardware

## Required Craft Import URL

```text
https://github.com/gdgeek/AIUI/tree/main/apps/inspiration-hunter
```

## Required Package Name

```text
gdgeek-AIUI-apps-inspiration-hunter.aix
```

## Final Online Publish Steps

1. Open [https://js.rokid.com/craft](https://js.rokid.com/craft).
2. Confirm the imported project is `gdgeek/AIUI/apps/inspiration-hunter`.
3. Run the agent and wait for `初始化成功`.
4. Open `打包`.
5. Confirm or rebuild the package.
6. Bind a Lingzhu AI agent if Craft still shows `请先绑定灵珠智能体`.
7. Click `上传到灵珠`.
8. Verify the uploaded build from the Lingzhu agent console or target device flow.

## Acceptance Gate

Do not call the project fully published until these are true:

- the AIX package is uploaded to the bound Lingzhu AI agent
- the target device or official release surface can launch the build
- the scan, discovery, and challenge flow has been exercised at least once after upload

## Current Blocker

The remaining publish action requires a Lingzhu AI agent binding in Craft. Craft packaging itself is already verified.
