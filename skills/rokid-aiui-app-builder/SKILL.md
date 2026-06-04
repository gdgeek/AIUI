---
name: rokid-aiui-app-builder
description: Build or improve Rokid AIUI apps in this repository. Use when creating `.ink` pages, editing `AGENTS.md`, `app.json`, `app.js`, AIUI assets, local scenario data, Craft-importable GitHub subdirectory apps, or contest-ready immersive AI glasses interactions.
---

# Rokid AIUI App Builder

## Workflow

1. Read the local app and docs before changing code.
2. Keep the app Craft-importable from a GitHub subdirectory.
3. Prefer a small immersive flow over a generic chat surface when the user wants a contest demo.
4. Put durable content in local data modules first; add live APIs only after the golden path works.
5. Verify `app.json` routes, `.ink` page structure, and static assets before packaging.

## Required Context

Read only the reference that matches the task:

- Project patterns: `references/app-patterns.md`
- AIUI docs and tooling sources: `/Users/geek/Documents/AIUI/docs/rokid/2026-06-04-aiui-guide-and-tooling.md`
- Existing app: `/Users/geek/Documents/AIUI/apps/inspiration-hunter`
- Upstream AIUI reference skill: `/Users/geek/Documents/AIUI/AIUI/skills/aiui-dev/SKILL.md`

## AIUI App Rules

- Keep core files at the app root: `AGENTS.md`, `VERSION`, `app.js`, `app.json`, `package.json`.
- Keep routes in `app.json` and ensure each route has a matching `pages/.../index.ink`.
- Use `.ink` SFC blocks in this order: `<script def>`, `<script setup>`, `<page>`, `<style>`.
- Add page descriptions and schemas when a page should be exposed as a stronger AIUI tool.
- Keep demo data deterministic unless the current task is explicitly about live device APIs.
- Use `assets/` for uploadable icons and other static files.

## Quality Bar

Before handing off:

- Run `git diff --check`.
- Rebuild or inspect the AIX candidate if packaging changed.
- Confirm the source path remains importable:

```text
https://github.com/gdgeek/AIUI/tree/main/apps/inspiration-hunter
```

