# Craft Online Development Workflow

Date: 2026-06-04

This is the working plan for developing with the online Rokid Craft tool while keeping all essential references local.

## Goal

Use `https://js.rokid.com/craft` as the primary visual workspace and keep the project, notes, and extracted docs inside this repository.

## Local References

- Official docs snapshot:
  - `/Users/geek/Documents/AIUI/docs/rokid/2026-06-04-aiui-official-online-dev-docs.md`
- Tooling notes:
  - `/Users/geek/Documents/AIUI/docs/rokid/2026-06-04-aiui-guide-and-tooling.md`
- Upstream reference repo:
  - `/Users/geek/Documents/AIUI/AIUI`

## Recommended Development Loop

### 1. Scaffold locally

Use the official scaffold:

```bash
npm create @yodaos-pkg/aiui-agent my-agent
```

Or use the unpacked local reference package for inspection:

- `/Users/geek/Documents/AIUI/tools/unpacked/create-aiui-agent/package`

### 2. Keep the project structure simple

Prefer:

- `AGENTS.md`
- `app.js`
- `app.json`
- `pages/.../*.ink`
- `assets/...`

### 3. Import into Craft

Inside Craft:

1. Open the local project
2. Inspect the file tree
3. Verify `app.json`
4. Open the target `.ink` page
5. Use the preview area for rapid checks

### 4. Edit locally, validate visually

Recommended rhythm:

1. edit local files in the workspace
2. re-open or refresh in Craft
3. inspect page structure and preview
4. adjust config, schema, and UI

### 5. Use the right AIUI mode early

Use `对话式 AIUI` when:

- the UI belongs in a conversation card
- the interaction is short and tool-like

Use `沉浸式 AIUI` when:

- the app needs a dedicated full-screen or full-flow experience
- the UI is the main product surface

### 6. Delay packaging until the interaction is real

Only move to CLI/package verification after:

- the page structure is stable
- the main interaction flow works in Craft
- the app identity in `AGENTS.md` is clear

### 7. Finish with device validation

Before claiming the app is ready:

- verify the hero flow on hardware
- verify weak-network or repeated-action cases
- verify performance and runtime behavior

## How I Can Help In This Workflow

I can work with you in two layers at the same time:

- Browser layer:
  - inspect Craft
  - navigate docs
  - verify visual behavior
- Workspace layer:
  - write and edit AIUI files
  - maintain local notes
  - scaffold and organize the project

## Next Practical Step

The best next move is:

1. create a clean AIUI app locally
2. import it into Craft
3. replace the starter page with a first contest-ready interaction
