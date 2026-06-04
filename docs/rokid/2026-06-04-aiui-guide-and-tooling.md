# AIUI / Craft Guide And Tooling Notes

Date: 2026-06-04

## Scope

This note captures the current AIUI developer guidance from the Rokid Yuque page, the official AIUI docs site, and the upstream AIUI GitHub repository cloned into this workspace.

## Sources

- Yuque guide: `https://rokid.yuque.com/ub8h5n/hsmrp5/cl87q6uy59ifbh8w`
- Official AIUI docs:
  - `https://js.rokid.com/AIUI`
  - `https://js.rokid.com/AIUI/tools/intro`
  - `https://js.rokid.com/AIUI/tools/cli`
  - `https://js.rokid.com/AIUI/tools/craft`
  - `https://js.rokid.com/AIUI/tools/debug`
- Upstream repo: `/Users/geek/Documents/AIUI/AIUI`
  - commit: `cd4f149570c05cff5b020a268f50a53e50b55257`

## What The Yuque Page Says

Title: `AIUI开发指南`

### Entry points

- AIUI official site: `https://js.rokid.com/AIUI`
- Project repo: `https://github.com/jsar-project/AIUI`

### Roadmap / capability list

- `scene/cut`
- Bluetooth access to `HTTPS`, `SSE`, and `WebSocket`
- Bluetooth central device APIs for external peripherals
- Camera photo capture on glasses
- Local KV storage
- QR code / barcode recognition
- Rendering based on `CSS3 + WXML`
- Built-in components such as `view`, `row`, `column`, `image`, `lottie-view`, `chart`
- `2D canvas` support
- `Speech (TTS)`
- `Speech (ASR)` and system standard UI
- One-click on-device debugging

### Development workflows from Yuque

#### Online workflow

- Create an AIUI agent in Lingzhu
- Edit inside the online IDE
- Pack the app
- Upload the generated `.aix`
- Update resources from the Rokid AI app developer menu
- Test on device
- Submit for review and publish

#### Offline workflow

Yuque lists two downloadable archives:

- `aiui-open.zip`
- `aiui-aix.zip`

It also gives these commands:

```bash
aiui-open <你的AIUI智能体根目录> -i <页面>
aiui-aix pack --optimize -o <包名.aix> <你的AIUI智能体根目录>
```

### Important limitation discovered while saving

Anonymous access can read the Yuque article body, but clicking the file cards for `aiui-open.zip` and `aiui-aix.zip` triggers a Yuque login flow. I could not extract the raw attachment URLs from the public page state.

## What The Official AIUI Docs Say Now

### Tool pages

- Intro: `https://js.rokid.com/AIUI/tools/intro`
- CLI: `https://js.rokid.com/AIUI/tools/cli`
- Craft: `https://js.rokid.com/AIUI/tools/craft`
- Device debugging: `https://js.rokid.com/AIUI/tools/debug`

### Current CLI wording

The official docs now describe a unified `aiui` CLI:

```bash
aiui --help
aiui open <path>
aiui pack
aiui --version
```

This differs from the older Yuque wording that split the commands into `aiui-open` and `aiui-aix`.

### Craft page summary

Craft is documented as the integrated workspace for:

- importing AIUI / Ink projects
- browsing files
- editing code
- previewing pages in real time

Recommended use cases:

- check `app.json`, pages, and run parameters
- inspect project structure after import
- iterate on page edits with immediate preview

### Device debugging page summary

The official docs emphasize true-device validation for:

- interaction verification
- performance observation
- network / storage / media / local API validation

Suggested focus:

- weak network
- Bluetooth-linked flows
- repeated user actions
- runtime logs and remote debugging

## What The Upstream GitHub Repo Gives Us

Local path: `/Users/geek/Documents/AIUI/AIUI`

### Repo contents that matter immediately

- `packages/create-aiui-agent/`
  - official project scaffolding package
- `skills/aiui-dev/`
  - upstream AIUI development skill
- `samples/`
  - reference apps for simple UI, bluetooth, scanner, TTS, games, cut-card, meal-card

### Confirmed scaffold command

From the repo docs:

```bash
npm create @yodaos-pkg/aiui-agent my-agent
```

### Confirmed upstream skill

The repo already ships an AIUI development skill at:

- `/Users/geek/Documents/AIUI/AIUI/skills/aiui-dev/SKILL.md`

## Tools Saved Locally

Because the Yuque attachment downloads are gated, I saved the currently reachable official npm-distributed tools instead.

Directory:

- `/Users/geek/Documents/AIUI/tools/npm-packages`

Files:

- `yodaos-pkg-create-aiui-agent-2.1.2.tgz`
- `yodaos-pkg-ink-0.12.2.tgz`
- `yodaos-pkg-aix-0.6.0.tgz`

Unpacked mirrors:

- `/Users/geek/Documents/AIUI/tools/unpacked/create-aiui-agent/package`
- `/Users/geek/Documents/AIUI/tools/unpacked/ink/package`
- `/Users/geek/Documents/AIUI/tools/unpacked/aix/package`

### What each package appears to be

- `@yodaos-pkg/create-aiui-agent@2.1.2`
  - scaffold CLI
  - binary: `create-aiui-agent`
- `@yodaos-pkg/ink@0.12.2`
  - Ink Web SDK runtime package
- `@yodaos-pkg/aix@0.6.0`
  - AIX package reader

## Practical Takeaways

1. The public Rokid documentation stack has moved toward a unified `aiui` CLI and a browser-based Craft workflow.
2. The Yuque article still exposes older offline tool naming: `aiui-open` and `aiui-aix`.
3. The GitHub repo is currently the most useful public source for:
   - project scaffolding
   - examples
   - upstream AIUI skill references
4. Before depending on `aiui-open.zip` or `aiui-aix.zip`, we should verify whether they are legacy wrappers around the new `aiui` CLI, or still required for some internal/offline flow.

## Open Questions

- What package or installer actually provides the `aiui` binary shown in the official docs?
- Are `aiui-open` and `aiui-aix` still supported, or are they older names for the same toolchain?
- Which path is preferred for contest submission:
  - Craft + official `aiui` CLI
  - Lingzhu online workflow
  - older offline zip toolchain
