# Inspiration Hunter Award Defense

Date: 2026-06-04

Use this document when judges ask hard questions. The goal is to defend the project honestly while keeping the pitch sharp, credible, and award-oriented.

## 30-Second Opener

`灵感猎手` 是一个为 Rokid AI Glasses 设计的发现型 AIUI 应用。它不把聊天机器人搬到眼前，而是从用户正在看的真实对象开始，把一次识别变成扫描、解释、故事和挑战。当前比赛版本使用确定性的精选场景来保证现场稳定，UI、交互、Craft 导入、AIX 包、Lingzhu 上传和提审流程都已经真实跑通。

## Why It Can Win

- `Device-native idea`: the app starts from visual attention, not a text prompt.
- `Memorable loop`: scan, lock, reveal, challenge, reward gives judges a complete 60-second story.
- `Demo reliability`: deterministic scenario data prevents the stage demo from failing because of network or recognition latency.
- `Release discipline`: source, package, icon, Lingzhu upload, review evidence, hardware constraints, and future SOP are documented.
- `Clear roadmap`: live camera recognition is a future input layer, not a vague rewrite.

## Rokid Glasses Fit

| Rokid Glasses Constraint | Product Decision |
| --- | --- |
| 448x150 style HUD preview | Keep one primary action visible and avoid tall mobile layouts. |
| Dual-eye monochrome Micro LED and 30 degree FOV | Use high-contrast text blocks, short labels, and no color-only meaning. |
| 49g wearable form factor | Make the experience a quick glance loop instead of a long reading session. |
| 12MP camera | Treat visual recognition as the natural next input layer. |
| 2GB RAM and 210mAh battery | Use deterministic local data in the contest build and avoid heavy runtime pipelines. |
| Hands-free expectation | Support auto progression plus simple key/back navigation for demo control. |

## Judge Q&A

### Is it real-time object recognition?

Not in the contest build. The current version is a semi-real demo: the app UI, page routing, interaction, package, Craft import, Lingzhu upload, and review submission are real; the object target is deterministic and curated so the live demo stays stable. The next engineering step is to replace scenario selection with live camera recognition while keeping the same interaction loop.

### Why is this better than a chatbot on glasses?

Because glasses are strongest when the user is already looking at something. A chatbot starts with language input; `Inspiration Hunter` starts with visual attention. That makes the experience feel native to AI glasses instead of like a phone assistant squeezed into a small display.

### What is the strongest technical evidence?

The project has three AIUI pages, schema-backed tool metadata, a local scenario module, a verified AIX package, a GitHub Craft import path, Craft runtime screenshots in the 448x150 glasses preview, Lingzhu upload as version `1.0.1`, and a current `审核中` review record.

### If Lingzhu review is still pending, can it still be presented?

Yes, but phrase it accurately. Say: “The app has been uploaded and submitted for Lingzhu review; it is currently `审核中`. For judging today, I will show the verified Craft runtime and local release evidence.” Do not say it is fully published until review passes and a device or official launch surface is verified.

### If there is no physical Rokid Glasses device on site, what should be shown?

Use the Craft Rokid Glasses preview screenshots and run the Craft golden path. Emphasize that the layout was specifically adapted for the 448x150 glasses preview and that target-device launch remains the final release gate after review.

### What is the privacy position?

The current demo uses local deterministic data and does not need to transmit real camera content. A live recognition version should keep recognition lightweight, ask for camera permission clearly, and avoid uploading personal visual data unless the user explicitly accepts that product design.

### What is the business or usage scenario?

The same loop fits museums, city walks, retail product learning, education field trips, and creator inspiration. The reusable pattern is: see an object, understand why it matters, interact with a clue, and save the discovery.

### What should not be claimed?

- Do not claim live camera recognition is already implemented.
- Do not claim the app is fully published while Lingzhu is still `审核中`.
- Do not claim physical Rokid Glasses verification until it has been tested on target hardware.
- Do not claim the deterministic scenario is a limitation-free production AI pipeline.

## Demo Fallback Matrix

| Situation | Response |
| --- | --- |
| Craft preview works | Run scan -> discovery -> challenge -> answer and use the 60-second script. |
| Lingzhu remains `审核中` | Show the review status screenshot and say final launch verification waits for approval. |
| Network becomes unstable | Use existing screenshots, source tree, package manifest, and pitch deck. |
| Judge only gives 30 seconds | Use the opener, show the final challenge screenshot, then say the closing line. |
| Judge challenges realism | Explain the semi-real architecture and why deterministic inputs are correct for contest reliability. |

## Closing Line

`灵感猎手` 的核心不是“认出这个东西叫什么”，而是让 AI 眼镜在用户看见世界的那一刻，立刻给出一个值得继续探索的理由。
