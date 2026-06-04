# Inspiration Hunter Contest Submission

Date: 2026-06-04

## Project Name

Inspiration Hunter / 灵感猎手

## One-Line Concept

An AI glasses discovery app that turns real-world objects into a fast, immersive story-and-challenge experience.

## Short Description

`Inspiration Hunter` is built for Rokid AIUI and Craft. The user looks at a meaningful object, sees a futuristic scan interface lock onto the target, then receives a layered discovery result with identity, significance, story, and a lightweight challenge. The first demo uses a curated retro movie poster scenario so the stage experience stays reliable while still feeling native to AI glasses.

## Why It Fits AI Glasses

This app only feels obvious on glasses: the trigger is seeing something in the world, and the value appears exactly where attention already is. It is not a chat app moved onto a wearable screen. It is a contextual visual experience designed around scan, lock, reveal, and interact.

## Judge-Facing Highlights

- `AR-native fantasy`: the interface is framed as intelligent observation, not a generic card list.
- `Reliable contest demo`: the current build uses deterministic local scenario data, so the hero path does not depend on a fragile recognition or network pipeline.
- `Clear interaction arc`: the demo moves from scan to result to challenge in under one minute.
- `Expandable product direction`: the same flow can later connect to live camera recognition, object memory, city exploration, museum guides, retail learning, or education.
- `Craft-ready implementation`: the project imports from GitHub into Craft, runs in the Craft preview, and packages successfully as AIX.

## MVP Feature Set

- Scanning home screen
- Discovery result screen
- Bookmark feedback
- Single-round challenge mode

## Demo Object

Hero target: `银翼猎影海报`

Object type: retro science-fiction movie poster

Why this target works:

- It is visually rich enough to justify an AI glasses interface.
- It lets the app explain style, meaning, and story rather than only label the object.
- It creates a natural challenge prompt around hidden visual clues.

## Demo Flow

1. Open `Inspiration Hunter`.
2. Show the scan home screen and say the glasses are locking onto a nearby poster.
3. Tap `开始解析`.
4. Show the discovery result and point out the title, insight, story, and meaning card.
5. Tap `深挖` to reveal a deeper interpretation.
6. Tap `收藏` to show immediate local feedback.
7. Tap `挑战模式`.
8. Tap `揭晓答案` and end on the reward state.

## Recommended Pitch

“Most recognition demos stop at naming the object. Inspiration Hunter asks a more interesting question: what should I notice, and why does it matter? On glasses, that difference is important, because the user is already looking at the world. This app turns that moment of attention into a short, reliable, interactive discovery loop.”

## Technical Summary

- Platform: Rokid AIUI / Craft
- App structure: three `.ink` pages
- Data source: local deterministic scenario module
- Package route: Craft AIX packaging
- Source route: GitHub subdirectory import

## Source And Import Path

GitHub import path for Craft:

```text
https://github.com/gdgeek/AIUI/tree/main/apps/inspiration-hunter
```

Local source:

```text
/Users/geek/Documents/AIUI/apps/inspiration-hunter
```

## Package Status

Craft packaging has completed successfully and produced:

```text
gdgeek-AIUI-apps-inspiration-hunter.aix
```

The package result is visible in the Craft packaging panel. The `上传到灵珠` action remains disabled until a Lingzhu AI agent is bound in Craft.

## Next Release Step

Bind a Lingzhu AI agent in Craft, then use the package panel action `上传到灵珠` to complete the online release flow.
