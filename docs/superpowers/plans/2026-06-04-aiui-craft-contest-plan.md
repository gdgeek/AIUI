# AIUI Craft Contest App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish a reliable AIUI/Craft local development workflow in this workspace, then scaffold and build a contest-ready AIUI demo app on top of the official Rokid toolchain.

**Architecture:** Keep upstream vendor material in `AIUI/`, keep local knowledge in `docs/rokid/`, keep downloaded tool archives in `tools/npm-packages/`, and build the actual contest app in a separate local app directory so we can iterate without modifying the vendored upstream examples. Use the official docs plus the cloned upstream repo as the source of truth, and treat the older Yuque zip-tool workflow as compatibility information until the newer CLI path is verified end-to-end.

**Tech Stack:** AIUI, Ink, Craft, npm, upstream `@yodaos-pkg/*` packages, local Markdown docs

---

### Task 1: Normalize the toolchain reference in this workspace

**Files:**
- Create: `docs/rokid/2026-06-04-aiui-guide-and-tooling.md`
- Verify: `tools/npm-packages/`
- Verify: `AIUI/README.zh-CN.md`

- [ ] **Step 1: Re-read the saved tooling note and upstream repo docs**

Run:

```bash
sed -n '1,220p' /Users/geek/Documents/AIUI/docs/rokid/2026-06-04-aiui-guide-and-tooling.md
sed -n '1,220p' /Users/geek/Documents/AIUI/AIUI/README.zh-CN.md
```

Expected: both files show the current AIUI toolchain notes and scaffold command.

- [ ] **Step 2: Verify the downloaded package archives are present**

Run:

```bash
ls -la /Users/geek/Documents/AIUI/tools/npm-packages
du -h /Users/geek/Documents/AIUI/tools/npm-packages/*
```

Expected: tarballs for `create-aiui-agent`, `ink`, and `aix` exist locally.

- [ ] **Step 3: Record any command-name mismatch before building**

Checklist:

```text
- Yuque says aiui-open / aiui-aix
- Official docs say aiui open / aiui pack
- Upstream repo exposes create-aiui-agent explicitly
```

Expected: these differences are treated as a verification item, not silently assumed away.

### Task 2: Scaffold a clean local AIUI app

**Files:**
- Create: `apps/contest-agent/`
- Verify template references from: `AIUI/packages/create-aiui-agent/template/`

- [ ] **Step 1: Download the official scaffold package if it is not already available**

Run:

```bash
cd /Users/geek/Documents/AIUI/tools/npm-packages
npm pack @yodaos-pkg/create-aiui-agent@2.1.2
```

Expected: `yodaos-pkg-create-aiui-agent-2.1.2.tgz` is present.

- [ ] **Step 2: Create the app from the official scaffold**

Run:

```bash
cd /Users/geek/Documents/AIUI
npx @yodaos-pkg/create-aiui-agent apps/contest-agent
```

Expected: `apps/contest-agent` contains `AGENTS.md`, `app.js`, `app.json`, `package.json`, and `pages/index/index.ink`.

- [ ] **Step 3: Verify the scaffolded file tree**

Run:

```bash
find /Users/geek/Documents/AIUI/apps/contest-agent -maxdepth 3 -type f | sort
```

Expected: the generated app matches the documented starter layout.

### Task 3: Prove the local development loop

**Files:**
- Modify later: `apps/contest-agent/AGENTS.md`
- Modify later: `apps/contest-agent/app.json`
- Modify later: `apps/contest-agent/pages/index/index.ink`

- [ ] **Step 1: Install the app dependencies**

Run:

```bash
cd /Users/geek/Documents/AIUI/apps/contest-agent
npm install
```

Expected: dependencies install without lockfile corruption or unresolved registry errors.

- [ ] **Step 2: Start the local project in the documented way**

Run:

```bash
cd /Users/geek/Documents/AIUI/apps/contest-agent
npm start
```

Expected: the app exposes a runnable local development target or prompts the next required tooling step.

- [ ] **Step 3: Validate the Craft workflow against the app**

Checklist:

```text
1. Open https://js.rokid.com/craft
2. Import /Users/geek/Documents/AIUI/apps/contest-agent
3. Confirm file tree appears
4. Confirm the first page renders in the preview area
```

Expected: Craft can import the project and render the starter page.

### Task 4: Define the contest demo slice before writing feature code

**Files:**
- Create: `docs/rokid/contest-app-brief.md`
- Modify later: `apps/contest-agent/AGENTS.md`

- [ ] **Step 1: Write a one-page app brief**

Create `docs/rokid/contest-app-brief.md` with:

```md
# Contest App Brief

## One-line concept
[single sentence]

## User value
[why this is interesting on AI glasses]

## Core interaction
[voice / card / immersive / bluetooth / camera]

## MVP scope
- one hero task
- one standout visual or device ability
- one believable demo flow
```

Expected: the app idea is constrained to one demoable workflow.

- [ ] **Step 2: Translate the brief into agent metadata**

Update `apps/contest-agent/AGENTS.md` to include:

```md
## Identity
- **Name**: [contest app name]
- **Version**: 0.1.0
- **Description**: [one sentence]

## Capabilities
- **Permissions**:
  - network
  - audio
```

Expected: the manifest matches the brief and only requests the permissions the MVP needs.

### Task 5: Build the MVP page set

**Files:**
- Modify: `apps/contest-agent/app.json`
- Modify: `apps/contest-agent/pages/index/index.ink`
- Create as needed: `apps/contest-agent/pages/<feature>/index.ink`
- Create as needed: `apps/contest-agent/assets/`

- [ ] **Step 1: Write the first failing UI expectation in plain language**

Acceptance target:

```text
The home page must explain the app in one screen, expose the primary action, and show a visible state change after interaction.
```

Expected: a single, testable home-page behavior exists before expanding scope.

- [ ] **Step 2: Register only the MVP routes**

Update `app.json` to the smallest valid page list, for example:

```json
{
  "pages": [
    "pages/index/index"
  ],
  "window": {
    "navigationBarTitleText": "Contest Agent",
    "viewport": {
      "width": "device-width"
    }
  }
}
```

Expected: route configuration stays minimal until the first page works.

- [ ] **Step 3: Replace the starter page with the MVP interaction**

Edit `pages/index/index.ink` so it includes:

```html
<script def>
{
  "navigationBarTitleText": "Contest Agent"
}
</script>

<script setup>
export default {
  data: {
    status: "ready"
  },
  handlePrimaryAction() {
    this.setData({ status: "running" });
  }
}
</script>

<page>
  <view class="container">
    <text class="title">Contest Agent</text>
    <text class="subtitle">A focused AIUI demo for Rokid Craft.</text>
    <button bindtap="handlePrimaryAction">Start</button>
    <text class="status">{{ status }}</text>
  </view>
</page>

<style>
.container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
}
</style>
```

Expected: the page has a concrete state transition that can be verified in Craft.

### Task 6: Validate preview, then expand to the contest hook

**Files:**
- Modify: `apps/contest-agent/pages/index/index.ink`
- Create optional: `apps/contest-agent/lib/`

- [ ] **Step 1: Verify the starter interaction in Craft**

Checklist:

```text
1. Load the app in Craft
2. Click the primary button
3. Confirm status changes from ready to running
```

Expected: the first interactive state change works before more UI is added.

- [ ] **Step 2: Add one signature feature only**

Choose one:

```text
- camera / scanner
- bluetooth companion data
- TTS / ASR
- scene / cut card flow
```

Expected: the app gains one strong differentiator instead of several weak ones.

- [ ] **Step 3: Re-test the hero flow after each feature addition**

Run:

```text
Preview in Craft after every feature-sized change.
```

Expected: the home flow remains intact while capability-specific logic is layered in.

### Task 7: Package and device-validate the demo

**Files:**
- Verify package commands against current toolchain docs
- Create output artifact later under app-local build output

- [ ] **Step 1: Verify which pack command is actually supported in the current environment**

Run:

```bash
aiui --help
aiui --version
```

Fallback compatibility check:

```bash
aiui-open --help
aiui-aix --help
```

Expected: one packaging path is confirmed with real command output.

- [ ] **Step 2: Build the distributable artifact**

Run the verified command, either:

```bash
aiui pack
```

or:

```bash
aiui-aix pack --optimize -o contest-agent.aix /Users/geek/Documents/AIUI/apps/contest-agent
```

Expected: a valid `.aix` output is produced.

- [ ] **Step 3: Run true-device validation**

Checklist:

```text
1. Push or upload the built artifact
2. Refresh resources on the target Rokid device
3. Verify the hero flow end to end
4. Re-run weak-network or repeated-action checks
```

Expected: the device run matches the Craft preview closely enough for demo use.

### Task 8: Prepare the contest submission package

**Files:**
- Create: `docs/rokid/contest-submission.md`
- Create: `docs/rokid/demo-script.md`

- [ ] **Step 1: Write the submission summary**

Create `docs/rokid/contest-submission.md` with:

```md
# Contest Submission

## Product name
## One-line pitch
## User scenario
## Key AIUI abilities used
## Why it fits AR glasses
```

Expected: the story is clear before polishing visuals.

- [ ] **Step 2: Write a 60-second demo script**

Create `docs/rokid/demo-script.md` with:

```md
# Demo Script

1. Open the app
2. Explain the problem in one sentence
3. Trigger the hero interaction
4. Show the differentiated AIUI capability
5. End on the user outcome
```

Expected: the demo can be repeated consistently.

## Self-Review

- Spec coverage:
  - save docs locally: covered by Task 1
  - get tools locally: covered by Task 1 and Task 2
  - define development plan: covered by Tasks 2-8
- Placeholder scan:
  - no `TODO` or `TBD` markers remain
  - open questions are isolated in verification steps, not hidden in build steps
- Type consistency:
  - local app path is consistently `apps/contest-agent`
  - docs path is consistently `docs/rokid/`
  - tool archive path is consistently `tools/npm-packages/`

Plan complete and saved to `docs/superpowers/plans/2026-06-04-aiui-craft-contest-plan.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
