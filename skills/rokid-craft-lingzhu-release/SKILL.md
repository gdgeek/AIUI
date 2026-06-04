---
name: rokid-craft-lingzhu-release
description: Package, bind, and release Rokid AIUI apps through Craft and Lingzhu. Use when importing a GitHub AIUI subdirectory into `https://js.rokid.com/craft`, building `.aix` packages, creating or binding Lingzhu AIUI agents, uploading icons or AIX packages, using SSH over port 443 for GitHub, or documenting final publish status.
---

# Rokid Craft Lingzhu Release

## Release Workflow

1. Verify GitHub source is pushed and Craft-importable.
2. Import the app in Craft from the GitHub subdirectory.
3. Run the agent and wait for initialization success.
4. Package the app in Craft with JSON validation enabled.
5. Create or bind a Lingzhu AIUI agent.
6. Upload the icon and `.aix` package.
7. Bind the Lingzhu AIUI agent in Craft.
8. Upload to Lingzhu and verify launch.

## Required References

- Current deployment guide: `/Users/geek/Documents/AIUI/docs/rokid/deployment-inspiration-hunter.md`
- Lingzhu handoff: `/Users/geek/Documents/AIUI/docs/rokid/lingzhu-aiui-release-handoff.md`
- Release checklist: `/Users/geek/Documents/AIUI/docs/contest/inspiration-hunter-release-checklist.md`
- Local package: `/Users/geek/Documents/AIUI/artifacts/gdgeek-AIUI-apps-inspiration-hunter.aix`
- Local icon: `/Users/geek/Documents/AIUI/apps/inspiration-hunter/assets/icon.png`

## Browser Constraint

The Codex in-app browser can fill ordinary form fields and check permissions, but it does not support file uploads. Do not keep retrying hidden file inputs after the in-app browser reports unsupported uploads or hidden-element failures. Hand off the two file-picker actions clearly instead.

## SSH 443 GitHub Path

Use this remote when port 22 is blocked:

```text
ssh://git@ssh.github.com:443/gdgeek/AIUI.git
```

Verify with:

```bash
git remote -v
git status --short --branch
```

## Publish Claim Rule

Do not call the app fully published until evidence proves:

- the Lingzhu AIUI agent exists
- the AIX file is uploaded to that agent
- Craft is bound to that agent
- `上传到灵珠` has completed
- launch is verified from Lingzhu or target Rokid hardware

