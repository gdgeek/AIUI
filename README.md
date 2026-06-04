# AIUI

Contest-ready Rokid AIUI demos and working notes.

## Included

- `apps/inspiration-hunter`: immersive AIUI demo for Craft and Rokid glasses
- `docs/rokid`: AIUI and Craft notes
- `docs/contest`: submission brief, demo runbook, and release checklist
- `docs/superpowers`: design specs and implementation plans
- `skills`: reusable Rokid AIUI development, release, and contest-polish workflows

## Current Demo

`Inspiration Hunter` is a semi-real immersive AIUI app. It uses a deterministic hero scenario to make the contest demo reliable while presenting the product as a future-facing AI glasses discovery experience.

Craft import URL:

```text
https://github.com/gdgeek/AIUI/tree/main/apps/inspiration-hunter
```

Verified package result:

```text
gdgeek-AIUI-apps-inspiration-hunter.aix
```

Local release assets:

```text
/Users/geek/Documents/AIUI/apps/inspiration-hunter/assets/icon.png
/Users/geek/Documents/AIUI/artifacts/gdgeek-AIUI-apps-inspiration-hunter.aix
```

## Publish Status

Craft import, run, preview, and package build have been verified. The repository remote is configured for SSH over port `443` at `ssh://git@ssh.github.com:443/gdgeek/AIUI.git`. The remaining online release step is binding or creating a Lingzhu AIUI agent in Craft/Lingzhu, then uploading the icon and AIX package.

## Reusable Skills

- `skills/rokid-aiui-app-builder`: build and improve Craft-importable AIUI apps
- `skills/rokid-craft-lingzhu-release`: package, bind, and release through Craft/Lingzhu
- `skills/aiui-contest-polisher`: sharpen the judge-facing story, demo, and evidence

## Final Evidence

- `docs/contest/inspiration-hunter-final-release-evidence.md`: exact manual upload and screenshot checklist
- `docs/contest/inspiration-hunter-judge-scorecard.md`: judge-facing score map and verified claims
- `docs/contest/inspiration-hunter-release-manifest.json`: SHA-256 hashes and upload metadata for the final release files
- `scripts/verify-inspiration-hunter-release.mjs`: local pre-upload verifier for icon, AIX, pages, schemas, and tools

GitHub Actions:

- `.github/workflows/release-verify.yml`: rebuilds the AIX candidate from tracked source and runs the same release verifier on `main` and pull requests
