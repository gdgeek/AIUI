# Inspiration Hunter Demo Runbook

Date: 2026-06-04

## Purpose

Use this runbook to present `Inspiration Hunter` consistently during a contest demo, even if the room, device, network, or judge pacing changes.

## Pre-Demo Checklist

- Craft is logged in with the Rokid account.
- Project is imported from:

```text
https://github.com/gdgeek/AIUI/tree/main/apps/inspiration-hunter
```

- `运行智能体` shows `初始化成功`.
- The scan page is visible in preview.
- The package panel has already produced `gdgeek-AIUI-apps-inspiration-hunter.aix`.
- If online release is required, a Lingzhu AI agent is bound in Craft.
- If creating the Lingzhu AIUI agent, keep these files ready:

```text
/Users/geek/Documents/AIUI/apps/inspiration-hunter/assets/icon.png
/Users/geek/Documents/AIUI/artifacts/gdgeek-AIUI-apps-inspiration-hunter.aix
```

## One-Minute Demo Script

### 0-10 seconds

Say:

“I am looking at a real-world object. The glasses do not just name it; they decide whether it is worth exploring.”

Show:

- `灵感猎手`
- locked target
- confidence signal
- `开始解析`

### 10-25 seconds

Tap `开始解析`.

Say:

“The app turns recognition into interpretation: identity, context, and why this object is interesting.”

Show:

- target title
- object category
- short insight
- story and meaning cards

### 25-40 seconds

Tap `深挖`, then tap `收藏`.

Say:

“The user can go deeper or save the discovery immediately. The important part is that the UI reacts in place, without becoming a chat transcript.”

Show:

- deep-dive block
- saved feedback

### 40-60 seconds

Tap `挑战模式`, then tap `揭晓答案`.

Say:

“Finally, the system turns passive information into a small challenge. That gives the experience a memorable ending and makes the discovery feel earned.”

Show:

- challenge prompt
- answer reveal
- success state

## Three-Minute Pitch Structure

1. Problem: object recognition often stops at labels.
2. Insight: glasses are best when they augment the exact thing you are looking at.
3. Product: scan, lock, reveal, challenge.
4. Reliability: deterministic hero flow for contest demo, live recognition can be added later.
5. Expansion: museum guide, city exploration, retail product learning, education field trips.

## Fallback Plan

If preview navigation is unreliable:

- Open each page from the Craft page list.
- Present the flow as three deliberate screens: scan, discovery, challenge.
- Use the script above without depending on every tap.

If network becomes unreliable:

- Keep the existing Craft session open.
- Use the already packaged AIX result panel if available.
- Present the local source and package status from the deployment guide.

If `上传到灵珠` or `提交提审` is unavailable:

- Explain the current release gate precisely: packaging succeeded, version `1.0.1` was uploaded and submitted, or the platform action is temporarily unavailable.
- Show the Lingzhu `审核中` evidence if review has already been submitted.
- Continue with the verified Craft runtime, downloaded AIX package, screenshots, and release evidence as the handoff artifact.

## Judge Q&A

### Is this using real recognition?

The current contest build is a semi-real demo: the UI and interaction are real, while the target data is deterministic and curated. This makes the stage demo reliable. The architecture leaves room to connect live camera recognition later.

### Why not make it a chat assistant?

The product is designed for glasses. The user is already looking at an object, so the experience should begin with visual context and immediate interaction rather than a conversation transcript.

### What makes it extensible?

The app separates UI pages from scenario data. More targets can be added by extending the local scenario module, and later the selected scenario can come from live recognition instead of a fixed demo target.

### What is the strongest future use case?

Guided discovery in museums, cities, retail, and education: anywhere a person sees something meaningful and wants a fast explanation plus a reason to care.
