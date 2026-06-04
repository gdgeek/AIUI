# Inspiration Hunter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a contest-ready immersive AIUI demo called `Inspiration Hunter` using Craft as the primary development surface and a local AIUI project as the source of truth.

**Architecture:** Create a fresh AIUI app under `apps/inspiration-hunter/`, keep the interaction inside three focused `.ink` pages, store all scenario content locally, and iterate visually in Craft before attempting packaging or release. The app will use one golden-path curated target and a deterministic state machine rather than live recognition.

**Tech Stack:** AIUI, Ink `.ink` SFC pages, Craft, npm, local scenario data, GitHub remote `git@github.com:gdgeek/AIUI.git`

---

### Task 1: Prepare the repo and workspace

**Files:**
- Verify: `.git/config`
- Verify: `docs/superpowers/specs/2026-06-04-inspiration-hunter-design.md`
- Create: `apps/`

- [x] **Step 1: Verify the Git remote is configured**

Run:

```bash
git -C /Users/geek/Documents/AIUI remote -v
```

Expected: `origin` points to `git@github.com:gdgeek/AIUI.git`.

- [x] **Step 2: Re-read the approved design spec**

Run:

```bash
sed -n '1,260p' /Users/geek/Documents/AIUI/docs/superpowers/specs/2026-06-04-inspiration-hunter-design.md
```

Expected: the implementation still matches the approved scope before code is written.

- [x] **Step 3: Create the app parent directory**

Run:

```bash
mkdir -p /Users/geek/Documents/AIUI/apps
```

Expected: `apps/` exists and is ready for the generated project.

### Task 2: Scaffold the AIUI project

**Files:**
- Create: `apps/inspiration-hunter/AGENTS.md`
- Create: `apps/inspiration-hunter/app.js`
- Create: `apps/inspiration-hunter/app.json`
- Create: `apps/inspiration-hunter/package.json`
- Create: `apps/inspiration-hunter/pages/index/index.ink`

- [x] **Step 1: Verify the official scaffold package is available**

Run:

```bash
ls -la /Users/geek/Documents/AIUI/tools/npm-packages/yodaos-pkg-create-aiui-agent-2.1.2.tgz
```

Expected: the official scaffold tarball exists locally.

- [x] **Step 2: Generate the project from the official scaffold**

Run:

```bash
cd /Users/geek/Documents/AIUI
npx @yodaos-pkg/create-aiui-agent apps/inspiration-hunter
```

Expected: the generated app includes the starter AIUI files.

- [x] **Step 3: Verify the generated file tree**

Run:

```bash
find /Users/geek/Documents/AIUI/apps/inspiration-hunter -maxdepth 3 -type f | sort
```

Expected: the project contains `AGENTS.md`, `app.js`, `app.json`, `package.json`, and at least one starter page file.

### Task 3: Replace the starter identity with Inspiration Hunter

**Files:**
- Modify: `apps/inspiration-hunter/AGENTS.md`
- Modify: `apps/inspiration-hunter/app.json`
- Modify: `apps/inspiration-hunter/app.js`

- [x] **Step 1: Update the manifest identity**

Set `AGENTS.md` to include:

```md
# Agent Manifest

## Identity
- **Name**: Inspiration Hunter
- **Version**: 0.1.0
- **Description**: A future-facing AI glasses explorer that turns real-world objects into interactive discovery experiences.
- **Author**: gdgeek

## Capabilities
- **Permissions**:
  - network
  - audio
```

Expected: the app identity matches the approved product concept.

- [x] **Step 2: Update global app routing and window config**

Set `app.json` to:

```json
{
  "pages": [
    "pages/index/index",
    "pages/discovery/index",
    "pages/challenge/index"
  ],
  "window": {
    "navigationBarTitleText": "Inspiration Hunter",
    "viewport": {
      "width": "device-width"
    }
  }
}
```

Expected: the app only declares the three MVP pages.

- [x] **Step 3: Keep `app.js` minimal and clean**

Set `app.js` to:

```javascript
export default {
  onLaunch() {
    console.log('Inspiration Hunter launched');
  },
  globalData: {
    activeTargetId: 'retro-poster'
  }
};
```

Expected: no extra global complexity is introduced before the flow works.

### Task 4: Add deterministic scenario data

**Files:**
- Create: `apps/inspiration-hunter/lib/scenarios.js`

- [x] **Step 1: Create a single hero scenario**

Write:

```javascript
export const scenarios = {
  'retro-poster': {
    id: 'retro-poster',
    title: '银翼猎影海报',
    category: '电影海报',
    insight: '一张充满未来都市感的复古科幻海报。',
    whyItMatters: '它把赛博城市、孤独英雄和商业美学压缩进一张视觉符号里。',
    story: '这张海报最有趣的地方不只是配色，而是它如何让观众先感到危险，再感到浪漫。',
    challengeTitle: '找出隐藏线索',
    challengePrompt: '海报里最能代表未来都市焦虑的视觉元素是什么？',
    challengeAnswer: '霓虹雨夜城市天际线'
  }
};
```

Expected: one polished, believable scenario exists before any multi-target logic.

- [x] **Step 2: Verify the scenario file is readable**

Run:

```bash
sed -n '1,220p' /Users/geek/Documents/AIUI/apps/inspiration-hunter/lib/scenarios.js
```

Expected: the hero scenario is complete and concise.

### Task 5: Build the scan home page

**Files:**
- Modify: `apps/inspiration-hunter/pages/index/index.ink`

- [x] **Step 1: Replace the starter page with the scanning experience**

Set `pages/index/index.ink` to a page that includes:

```html
<script def>
{
  "navigationBarTitleText": "Inspiration Hunter"
}
</script>

<script setup>
export default {
  data: {
    status: 'scanning',
    targetLabel: '复古电影海报',
    confidence: '92%'
  },
  beginDiscovery() {
    wx.navigateTo({
      url: '/pages/discovery/index'
    });
  }
}
</script>
```

Plus a `<page>` layout with:

- hunter title
- scanning subtitle
- target lock card
- a primary `开始解析` button

Expected: the user can understand the fantasy in one screen.

- [x] **Step 2: Add visual scan-state styling**

Required styling direction:

```text
- dark atmospheric background
- green / cyan accents
- panel borders or glow
- visible hierarchy between target, status, and action
```

Expected: the first screen already looks like an AI glasses product.

### Task 6: Build the discovery result page

**Files:**
- Create: `apps/inspiration-hunter/pages/discovery/index.ink`

- [x] **Step 1: Create the result page structure**

The page must render:

- target title
- quick insight
- story card
- why-it-matters card
- action row with `深挖`, `收藏`, `挑战模式`

Expected: the result page answers both “what is this?” and “why do I care?”.

- [x] **Step 2: Use deterministic local data**

The page should load the `retro-poster` scenario and bind those fields into the UI.

Expected: no network dependency is required for the hero path.

- [x] **Step 3: Implement action behavior**

Actions:

- `深挖`: expands one more insight block inline
- `收藏`: changes local UI state to show saved confirmation
- `挑战模式`: navigates to `/pages/challenge/index`

Expected: each action produces visible feedback immediately.

### Task 7: Build the challenge page

**Files:**
- Create: `apps/inspiration-hunter/pages/challenge/index.ink`

- [x] **Step 1: Create the challenge flow**

The page must include:

- challenge title
- prompt text
- answer or confirm action
- success state

Expected: the app ends on an active interaction, not a passive info panel.

- [x] **Step 2: Keep the challenge single-round**

Behavior:

```text
start -> prompt -> answer reveal -> success feedback
```

Expected: the flow is quick and stage-friendly.

### Task 8: Verify the app in Craft

**Files:**
- Verify: `apps/inspiration-hunter/app.json`
- Verify: all three page files

- [x] **Step 1: Install dependencies**

Run:

```bash
cd /Users/geek/Documents/AIUI/apps/inspiration-hunter
npm install
```

Expected: the app becomes runnable locally without dependency errors.

- [x] **Step 2: Import the project into Craft**

Progress note: Craft account login is complete, and the GitHub 子目录 import path has been verified successfully with `https://github.com/gdgeek/AIUI/tree/main/apps/inspiration-hunter`.

Checklist:

```text
1. Open https://js.rokid.com/craft
2. Import /Users/geek/Documents/AIUI/apps/inspiration-hunter
3. Confirm file tree appears
4. Open each page and inspect preview
```

Expected: the project is visible and editable in Craft.

- [ ] **Step 3: Verify the golden path visually**

Progress note: Craft confirms all three pages as `Ready`, `运行智能体` initializes successfully, and the homepage preview renders. Full browser-driven end-to-end tapping remains only partially automatable because the preview surface behaves more like a canvas than regular DOM.

Checklist:

```text
1. Start on scan page
2. Enter discovery page
3. Trigger 收藏 feedback
4. Enter challenge mode
5. Reach success state
```

Expected: the full MVP works without broken state transitions.

### Task 9: Package and publish

**Files:**
- Create later: build artifact output
- Verify: Git remote and repo status

- [ ] **Step 1: Verify the available CLI path**

Run:

```bash
aiui --help
aiui --version
```

Fallback check:

```bash
aiui-open --help
aiui-aix --help
```

Expected: one packaging route is confirmed by real command output.

- [x] **Step 2: Build the distributable**

Progress note: Craft `打包` has completed successfully with default options (`资源优化` on, `JSON 校验` on, `优化等级 Level 2`) and produced `gdgeek-AIUI-apps-inspiration-hunter.aix`. No working local CLI is currently available on `PATH`, so Craft remains the verified packaging route.

Run the confirmed path, preferably:

```bash
aiui pack
```

If only the older split tools exist:

```bash
aiui-aix pack --optimize -o inspiration-hunter.aix /Users/geek/Documents/AIUI/apps/inspiration-hunter
```

Expected: a valid `.aix` artifact is produced.

- [x] **Step 3: Publish the worktree to GitHub**

Progress note: the local initial commit `57472bd` (`feat: add inspiration hunter AIUI demo`) has been created successfully and published using SSH over port `443` to `ssh://git@ssh.github.com:443/gdgeek/AIUI.git`.

Run:

```bash
git -C /Users/geek/Documents/AIUI add .
git -C /Users/geek/Documents/AIUI commit -m "feat: add inspiration hunter AIUI demo"
git -C /Users/geek/Documents/AIUI push -u origin main
```

Expected: the repo is published to the configured GitHub remote.

- [x] **Step 4: Document the deployment path**

Progress note: Deployment guidance has been updated in `docs/rokid/deployment-inspiration-hunter.md` to reflect the verified GitHub subdirectory import path, SSH-over-443 push route, and Craft-first packaging flow.

Create:

- `docs/rokid/deployment-inspiration-hunter.md`

It must explain:

- how to open the project in Craft
- how to package the app
- how to refresh resources on device
- how to present the demo reliably

Expected: future deployment is repeatable without rediscovery.

## Self-Review

- Spec coverage:
  - immersive mode: covered by Tasks 3, 5, 6, 7
  - semi-real deterministic data: covered by Task 4
  - compact MVP scope: enforced by Tasks 5-7
  - Craft-first workflow: covered by Task 8
  - packaging and publication: covered by Task 9
- Placeholder scan:
  - no `TODO` / `TBD` markers remain
  - deployment documentation is an explicit deliverable, not an implied future task
- Type consistency:
  - app path is consistently `apps/inspiration-hunter`
  - hero scenario key is consistently `retro-poster`
  - page routes are consistently `index`, `discovery`, and `challenge`
