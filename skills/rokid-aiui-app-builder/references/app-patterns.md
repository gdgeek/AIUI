# Rokid AIUI App Patterns

## Recommended MVP Shape

Use a three-part flow for contest demos:

1. Setup or scan screen that makes the glasses fantasy obvious.
2. Result screen that explains identity, meaning, and interaction options.
3. Reward or challenge screen that ends with a memorable action.

## File Structure

```text
apps/<app-name>/
  AGENTS.md
  VERSION
  app.js
  app.json
  assets/
  lib/
  pages/
    index/index.ink
```

## `.ink` Checklist

- `<script def>` contains page title and, when useful, description/schema.
- `<script setup>` exports page state and methods.
- `<page>` uses WXML-like components and simple data binding.
- `<style>` avoids generic white-card UI; AI glasses demos should feel ambient and glanceable.

## Craft Compatibility

- Keep package dependencies minimal.
- Avoid relying on browser-only DOM APIs.
- Prefer local assets and deterministic data for the first release.
- Treat Craft preview as useful but not equal to device validation.

