# Inspiration Hunter Deployment Guide

Date: 2026-06-04

## Current Status

The local app source is ready at:

- `/Users/geek/Documents/AIUI/apps/inspiration-hunter`

Current known blocker:

- Craft is still in logged-out state, so project import, editing session, and package actions are disabled until a Rokid account login is completed.

## Project Files

Core app files:

- `/Users/geek/Documents/AIUI/apps/inspiration-hunter/AGENTS.md`
- `/Users/geek/Documents/AIUI/apps/inspiration-hunter/app.js`
- `/Users/geek/Documents/AIUI/apps/inspiration-hunter/app.json`
- `/Users/geek/Documents/AIUI/apps/inspiration-hunter/lib/scenarios.js`
- `/Users/geek/Documents/AIUI/apps/inspiration-hunter/pages/index/index.ink`
- `/Users/geek/Documents/AIUI/apps/inspiration-hunter/pages/discovery/index.ink`
- `/Users/geek/Documents/AIUI/apps/inspiration-hunter/pages/challenge/index.ink`

## How To Open In Craft

1. Open `https://js.rokid.com/craft`
2. Log in with your Rokid account
3. Enter the project workspace
4. Import the local project directory:

```text
/Users/geek/Documents/AIUI/apps/inspiration-hunter
```

5. Confirm the file tree shows:

- `AGENTS.md`
- `app.js`
- `app.json`
- `pages/index/index.ink`
- `pages/discovery/index.ink`
- `pages/challenge/index.ink`

## What To Verify In Craft

### Golden Path

1. Open the home page
2. Check the scan-state styling and `开始解析` action
3. Enter the discovery page
4. Click `深挖`
5. Click `收藏`
6. Enter `挑战模式`
7. Click `揭晓答案`

### Expected Experience

- page 1 feels like a scanning interface
- page 2 feels like an information reveal
- page 3 feels like a short reward loop

## Local Packaging Paths To Verify

Official docs currently describe:

```bash
aiui --help
aiui --version
aiui open <path>
aiui pack
```

Older compatibility docs mention:

```bash
aiui-open <project-root> -i <page>
aiui-aix pack --optimize -o <name.aix> <project-root>
```

## Recommended Packaging Sequence

After Craft preview is confirmed:

1. verify which CLI exists on the machine
2. use the unified `aiui` path if available
3. only fall back to `aiui-aix` if the newer CLI is absent

Verification commands:

```bash
aiui --help
aiui --version
```

Fallback verification:

```bash
aiui-open --help
aiui-aix --help
```

## Target Packaging Commands

Preferred:

```bash
cd /Users/geek/Documents/AIUI/apps/inspiration-hunter
aiui pack
```

Fallback:

```bash
aiui-aix pack --optimize -o inspiration-hunter.aix /Users/geek/Documents/AIUI/apps/inspiration-hunter
```

## Device Demo Flow

After a package is produced:

1. upload or sync the artifact through the Rokid-supported flow
2. refresh resources on the device
3. launch `Inspiration Hunter`
4. run the golden path from scan to challenge completion

## Stage Demo Script

Recommended live script:

1. “I’m looking at a real-world object.”
2. “The glasses lock onto it.”
3. “AI reveals why it matters.”
4. “I go deeper.”
5. “I enter a challenge and unlock the answer.”

## Immediate Next Step

To continue online development, the user must first complete Rokid account login in Craft.
