# AIUI Official Online Development Docs Snapshot

Date: 2026-06-04

This file saves the key official AIUI pages needed for online development with Craft.

## Source Pages

- `https://js.rokid.com/AIUI`
- `https://js.rokid.com/AIUI/guide/quickstart-intro`
- `https://js.rokid.com/AIUI/guide/quickstart-first-chat`
- `https://js.rokid.com/AIUI/guide/quickstart-first-immersive`
- `https://js.rokid.com/AIUI/guide/structure`
- `https://js.rokid.com/AIUI/framework/structure-app`
- `https://js.rokid.com/AIUI/tools/intro`
- `https://js.rokid.com/AIUI/tools/cli`
- `https://js.rokid.com/AIUI/tools/craft`
- `https://js.rokid.com/AIUI/tools/debug`

## 1. Quick Start

Source: `https://js.rokid.com/AIUI`

Title: `快速开始`

Key points:

- AIUI is presented as an AI-native GUI framework for `AI + AR`.
- The doc system is split into:
  - 快速了解
  - 智能体框架
  - 组件
  - API
  - 开发者工具
  - 更新日志
- Official next steps:
  - `阅读介绍`
  - `创建第一个对话式 AIUI`
  - `创建第一个沉浸式 AIUI`
  - `了解目录结构`

## 2. What Is AIUI

Source: `https://js.rokid.com/AIUI/guide/quickstart-intro`

Title: `什么是 AIUI？`

Key points:

- AIUI is framed as `AI-Native User Interface`.
- Two primary interaction forms:
  - `对话内交互`
  - `沉浸式界面交互`
- Three implementation styles are described:
  - `Tool Rendering`
  - `MCP Apps`
  - `A2UI`
- Compatibility direction:
  - aligned with mini-program style development
  - supports WXML/WXSS-style patterns
  - aims for multi-end reuse

Practical takeaway:

- For our work, AIUI is not only a rendering format.
- It is a product model for building agent-driven UI on Rokid devices.

## 3. First Conversational AIUI

Source: `https://js.rokid.com/AIUI/guide/quickstart-first-chat`

Title: `第一个对话式 AIUI`

The official entry scaffold command is:

```bash
npm create @yodaos-pkg/aiui-agent my-aiui-chat-agent
```

The page teaches:

- dialog-native UI should stay inside the conversation flow
- `.ink` is the preferred single-file component format for fast iteration
- page-level `description` and `schema` can describe when a page/tool should be used

Representative project shape:

```text
├── app.js
├── app.json
├── AGENTS.md
├── pages
│   └── weather
│       └── index.ink
```

The doc’s example page demonstrates:

- `<script def>` for page config and schema
- `<script setup>` for page logic
- `<page>` for structure
- `<style>` for styling

Practical takeaway:

- If we want a contest app that behaves like an in-chat utility or card, this is the right starting model.

## 4. First Immersive AIUI

Source: `https://js.rokid.com/AIUI/guide/quickstart-first-immersive`

Title: `第一个沉浸式 AIUI`

The official entry scaffold command is:

```bash
npm create @yodaos-pkg/aiui-agent my-aiui-immersive-agent
```

The page explains:

- immersive AIUI launches the whole agent, not just one tool page
- `AGENTS.md` and `app.json` define the entry route
- the first page in `app.json` becomes the immersive entry point
- developers must wire ASR / LLM / TTS flows themselves when needed

Representative project shape:

```text
├── app.js
├── app.json
├── AGENTS.md
├── pages
│   └── landlord
│       └── index.ink
```

Practical takeaway:

- If we want a contest app with a full-screen dedicated experience, this is the more suitable model.

## 5. Code Structure And Directory Layout

Source: `https://js.rokid.com/AIUI/guide/structure`

Title: `代码构成与目录结构`

The docs describe two patterns.

### Multi-file structure

- `app.js`
- `app.json`
- `app.wxss`
- `AGENTS.md`
- `pages/<page>/page.js`
- `pages/<page>/page.wxml`
- `pages/<page>/page.wxss`
- `pages/<page>/page.json`

### SFC structure

Preferred modern pattern:

- `.ink` page file
- `<script def>`
- `<script setup>`
- `<page>`
- `<style>`

Important note:

- when both a multi-file page and `.ink` exist for the same page, `.ink` is preferred

Practical takeaway:

- We should default to `.ink` in our own app unless we hit a limitation that forces the older split-file pattern.

## 6. App Structure

Source: `https://js.rokid.com/AIUI/framework/structure-app`

Title: `应用 (app.js)`

The official app registration shape is:

```javascript
export default {
  onLaunch(options) {
  },
  onShow(options) {
  },
  onHide() {
  },
  globalData: {
  }
}
```

Lifecycle names called out by the docs:

- `onLaunch`
- `onShow`
- `onHide`
- `onError`

Practical takeaway:

- This is the canonical app entry structure we should preserve in generated or edited projects.

## 7. Developer Tools Overview

Source: `https://js.rokid.com/AIUI/tools/intro`

Title: `开发者工具 (Developer Tools)`

The official toolchain is organized around:

- tool overview
- CLI workflow
- Craft workspace
- device debugging

This is the cleanest public statement of the intended developer flow.

## 8. CLI

Source: `https://js.rokid.com/AIUI/tools/cli`

Title: `CLI`

Documented commands:

```bash
aiui --help
aiui open <path>
aiui pack
aiui --version
```

Documented meanings:

- `aiui open <path>`: preview a project
- `aiui pack`: package the current AIUI project
- `aiui --version`: inspect the installed CLI version

Practical takeaway:

- The official docs now prefer unified `aiui` naming rather than the older `aiui-open` / `aiui-aix` split.

## 9. Craft Platform

Source: `https://js.rokid.com/AIUI/tools/craft`

Title: `Craft 平台`

Official description:

- import projects
- browse files
- edit code
- preview pages in real time

Best-fit scenarios from the docs:

- verify page title, description, schema, and entry config
- test run parameters
- inspect page and asset layout after import
- iterate quickly with preview feedback

The official role split is:

- `AIUI`: app/page model and component system
- `Ink`: rendering/runtime layer
- `Craft`: workspace for import, edit, discovery, and preview

Practical takeaway:

- Craft is the right tool for our browser-driven development loop.

## 10. Device Debugging

Source: `https://js.rokid.com/AIUI/tools/debug`

Title: `真机调试`

Official focus areas:

- verify interaction on real hardware
- observe performance
- validate network, storage, audio, and local capabilities

Recommended testing emphasis:

- weak network
- bluetooth-linked flows
- repeated operations
- logs and remote debugging

Practical takeaway:

- Browser preview is not enough for final acceptance.
- Device validation remains a required later stage.

## 11. Local Conclusions

For our current workspace, the most useful path is:

1. Use the official scaffold to create a clean AIUI app
2. Use `.ink` pages by default
3. Use Craft as the primary browser workspace
4. Use the CLI only when we need preview/package verification outside Craft
5. Treat true-device testing as a final validation stage
