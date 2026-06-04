# Inspiration Hunter Design

## Overview

`Inspiration Hunter` is a contest-focused AIUI app for Rokid glasses. The product fantasy is simple: the user looks at an object in the real world, and the glasses immediately transform that moment into an interactive discovery experience. Instead of stopping at object recognition, the app turns seeing into exploring.

The first release will be a `semi-real immersive demo`. We will not depend on a fragile real recognition pipeline. Instead, we will deliver a polished, believable experience driven by curated scenarios, strong motion states, and high-quality discovery content.

## Product Goal

Build an immersive AIUI app that feels native to AI glasses, is visually memorable on stage, and can be demoed reliably in Craft and later on device.

## Why This Direction

This concept is better than a generic assistant because it only makes sense on smart glasses. The “wow” moment comes from context-aware UI appearing over a live viewing moment, not from a chat response. For a contest setting, that gives us three advantages:

1. It is immediately legible as an AR-native experience.
2. It has a strong demo arc: scan, lock, reveal, explore.
3. It can be implemented quickly as a high-fidelity demo without betting on unstable integrations.

## Chosen Shape

- App name: `Inspiration Hunter`
- Mode: `immersive AIUI`
- Delivery strategy: `semi-real demo`
- Visual tone: `future explorer`
- Primary input model: tap-driven demo flow with room for later voice expansion

## User Experience Summary

The user enters a scanning interface, points the glasses toward a target, and sees the app move through three emotional beats:

1. `Scanning`
The app suggests that it is observing and interpreting a real-world object.

2. `Lock and reveal`
The UI resolves into a focused information surface with identity, significance, story, and recommended actions.

3. `Explore and challenge`
The user can deepen the experience, save it, or launch a lightweight challenge that turns passive recognition into interaction.

## MVP Scope

The first version will only ship four features:

1. A scanning home screen
2. A result screen with layered information cards
3. A bookmark/favorite feedback action
4. A single-round challenge mode

Everything else stays out of scope for now.

## Out Of Scope

- Live camera recognition integration
- General-purpose search across arbitrary objects
- Multiple concurrent targets
- Full backend service orchestration
- User accounts or cloud sync
- Large branching mission trees

## Core Scenario

The demo scenario will use curated “discoverable objects” such as:

- a retro movie poster
- a museum artifact
- a specialty coffee package

These are good demo subjects because they let us present visual identity, story, cultural context, and a playful challenge.

## Information Architecture

The app should stay compact. The recommended structure is three core pages maximum.

### Page 1: Scan Home

Purpose:

- establish the fantasy of intelligent observation
- let the user enter the discovery flow
- communicate that a target is being locked

Key UI blocks:

- hunter profile / session status
- current target detection panel
- lock-on feedback
- primary action to begin analysis

### Page 2: Discovery Result

Purpose:

- reveal the target identity
- answer “what is this?”
- answer “why should I care?”
- provide next actions

Key UI blocks:

- target title
- quick insight summary
- background story card
- style / meaning / notable fact card
- action row: `深挖`, `收藏`, `挑战模式`

### Page 3: Challenge Mode

Purpose:

- convert information into active play
- give the audience a memorable interaction beat

Key UI blocks:

- mission prompt
- short countdown or task state
- answer / continue action
- success feedback

## Interaction Model

The experience should feel dynamic even without real recognition. The app therefore depends on carefully staged state transitions.

### Primary State Flow

`idle -> scanning -> locked -> revealing -> discovered -> challenge -> reward`

### Required Feeling Per State

- `idle`: calm, futuristic readiness
- `scanning`: active search and anticipation
- `locked`: confidence and precision
- `revealing`: information unfolding with energy
- `discovered`: dense but readable reward state
- `challenge`: playful focus
- `reward`: satisfying completion

## Content Strategy

Because this is a semi-real demo, quality of content matters more than quantity.

Each target should include:

- object name
- one-sentence identity
- one “why it matters” insight
- one story detail or cultural fact
- one exploration challenge

The copy should sound concise, intelligent, and stage-friendly. We should avoid walls of text.

## Visual Design Direction

The app should look like a premium heads-up discovery interface rather than a consumer mini-program clone.

### Style Principles

- dark or dimmed atmospheric base
- neon-green / cyan / glassy highlight accents
- layered panels with strong depth separation
- scanning lines, glow, and signal motifs used sparingly
- typography that feels technical but readable

### Visual Goals

- instantly communicate “AI glasses”
- avoid flat utility-dashboard aesthetics
- emphasize motion and reveal hierarchy
- make each screen screenshot-worthy

## Motion Direction

Motion is one of the biggest multipliers for this concept.

We should prioritize:

- scan pulse animation
- lock-on transition
- card stagger reveal
- success confirmation for save/challenge completion

We should avoid:

- overly busy constant animation
- long cinematic delays that slow the demo

## Technical Strategy

### Development Surface

Primary workspace:

- `https://js.rokid.com/craft`

Primary local project pattern:

- AIUI project scaffolded from the official starter
- `.ink` single-file pages
- local content constants or simple data modules for curated targets

### Data Strategy

Use deterministic local scenario data.

That means:

- one selected target per flow
- believable structured data
- no unstable network dependency for the hero interaction

If we later want one “live-feeling” layer, we can fake the scanning step and still resolve into curated content.

## Recommended Implementation Boundaries

To move fastest, we should:

- keep the project small
- implement one golden path only
- choose one hero object first
- perfect the visual sequence before adding a second scenario

The first completed slice should be:

1. scan screen
2. reveal result for one object
3. save interaction
4. challenge success state

Only after that should we add more targets or richer transitions.

## Demo Script Intention

The live pitch should feel like:

1. “I look at something in the world.”
2. “The glasses understand that it is meaningful.”
3. “The system gives me a story, not just a label.”
4. “I interact with it immediately.”
5. “This is why AIUI on glasses is different.”

## Risks And Mitigations

### Risk 1: It feels fake if content is too static

Mitigation:

- strong state transitions
- believable lock-on phase
- rich, target-specific copy
- challenge interaction after reveal

### Risk 2: It feels like a generic card app

Mitigation:

- prioritize immersive styling
- make scanning and reveal states visually distinct
- avoid plain list or dashboard composition

### Risk 3: Scope expands too fast

Mitigation:

- cap at three pages
- cap at one challenge loop
- ship one excellent scenario before adding more

## Testing Strategy

We should validate in this order:

1. local page structure correctness
2. Craft preview correctness
3. golden-path interaction smoothness
4. visual coherence across states
5. eventual on-device validation

## Success Criteria

The design is successful if:

1. A viewer understands the concept in under five seconds.
2. The app looks specific to AI glasses, not generic mobile UI.
3. The scanning-to-reveal transition feels exciting.
4. The result page feels informative and premium.
5. The challenge interaction gives the demo a memorable ending.

## Delivery Recommendation

After this spec is approved, the next move should be:

1. scaffold the project
2. create the three-page structure
3. build the scan and reveal states first
4. preview continuously in Craft
5. leave deployment and packaging until the core experience is visually solid
