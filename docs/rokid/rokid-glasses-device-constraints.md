# Rokid Glasses Device Constraints

Date: 2026-06-04

Source checked: [Rokid Glasses official product page](https://global.rokid.com/products/rokid-glasses)

Use this document before designing any AIUI app for Rokid Glasses. These are the hardware constraints that should shape interaction, copy, layout, and demo expectations.

## Official Parameters That Matter For AIUI

```text
Product: Rokid Glasses
Weight: 49g
Display: dual-eye monochrome Micro LED
FOV: 30 degrees
Brightness: up to 1500 nits
Eye relief: 18mm
Camera: 12MP Sony IMX681
Camera resolution: 3024 x 4032
Camera field of view: H 77, V 94, D 109
Camera depth of field: 34cm to infinity
Autofocus: not supported
SOC: Snapdragon AR1 Gen 1 / RT600 MIMXRT685SFAWBR
Wi-Fi: Wi-Fi 6
Bluetooth: BT 5.3
RAM: 2GB
ROM: 32GB
Battery: 210mAh
Voice pickup: 4 microphones
Audio: open-ear / near-ear audio
```

## Design Translation

The display is glanceable, not a phone canvas. The official page describes the display as intended for quick information such as translation, navigation, captions, and prompts rather than full-screen entertainment.

For AIUI apps:

- Keep the main screen readable inside Craft's 448x150 preview.
- Use high-contrast green/cyan text because the device display is monochrome Micro LED.
- Prefer one core action per screen.
- Avoid long paragraphs; use 1 to 2 short lines per panel.
- Design around hands-free interaction: voice, Enter key / glasses button, auto-progression, and Backspace/back.
- Treat the 12MP camera as the product hook, but keep the contest demo deterministic unless live recognition is fully verified.
- Assume the user may be outdoors; use strong contrast and avoid subtle low-alpha copy for critical text.
- Respect all-day wearable context: no dense UI, no long reading, no tiny tap targets.
- RAM and battery are limited compared with a phone, so prefer local scenario data and lightweight UI over heavy runtime dependencies.

## Inspiration Hunter Decisions

`Inspiration Hunter` follows these constraints by:

- using a 448x150 horizontal HUD layout.
- keeping `开始解析`, `挑战模式`, and `揭晓答案` as short, visible actions.
- adding `onKeyDown` support for Enter and Backspace.
- adding hands-free auto-progression so the demo works as an AI glasses experience even when mouse/touch automation is unreliable.
- using one deterministic hero target while presenting the camera-first product direction.
- avoiding network dependency in the live demo path.

## Future Project Checklist

Before building another AIUI app, answer these:

```text
[ ] Does the first screen work as a glance, not a page?
[ ] Is there one primary action per moment?
[ ] Can the flow progress by Enter/glasses key?
[ ] Can the flow recover by Backspace/back?
[ ] Is there a hands-free path for live demo?
[ ] Are all important labels readable in 448x150?
[ ] Is camera use explained as a first-person glasses capability?
[ ] Is the live demo deterministic if model/camera/network behavior is not verified?
```
