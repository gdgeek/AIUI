# Inspiration Hunter Judge Scorecard

Date: 2026-06-04

This scorecard maps the app to likely contest judging dimensions. It separates verified implementation from future roadmap so the pitch stays credible.

## One-Line Pitch

Most recognition demos stop at naming the object. `Inspiration Hunter` turns what the user is already looking at into a short discovery, story, and challenge loop for AI glasses.

## Scoring Map

| Judge Dimension | What To Show | Evidence |
| --- | --- | --- |
| AI glasses fit | The experience starts with a locked real-world target, not a text prompt. | `pages/index/index.ink`, scan UI, Craft preview |
| Product originality | Recognition becomes interpretation and challenge, not a generic chat answer. | `pages/discovery/index.ink`, `pages/challenge/index.ink` |
| Demo reliability | The hero path uses deterministic local scenario data. | `lib/scenarios.js`, AIX reader verification |
| Technical completeness | Three page routes, page schemas, local icon, AIX package, Craft import, package build. | `app.json`, page `schema.data`, release checklist |
| Presentation clarity | One-minute demo and fallback runbook exist. | `docs/contest/inspiration-hunter-demo-runbook.md` |
| Release readiness | Local AIX and Lingzhu upload files are prepared. | `docs/contest/inspiration-hunter-final-release-evidence.md` |

## Judge-Facing Demo Beats

1. Lock: the glasses detect a visually interesting object.
2. Reveal: the app explains what it is and why it matters.
3. Deepen: the user can expand the interpretation or save the discovery.
4. Challenge: the app turns passive information into a clue task.
5. Reward: the answer reveal gives the demo a clean ending.

## Verified Claims

- The app source exists under `/Users/geek/Documents/AIUI/apps/inspiration-hunter`.
- Craft imports the GitHub subdirectory and has packaged the app.
- The local AIX candidate parses with the official `@yodaos-pkg/aix` reader.
- All three pages expose schema-backed AIUI tool metadata.
- The Lingzhu AIUI form is prepared except for the two manual file uploads.

## Roadmap Claims

Label these as future work during judging:

- live camera recognition replacing deterministic target data
- multi-object memory across sessions
- museum, city exploration, retail learning, and field-trip modes
- richer voice-first navigation after hardware validation

## Strong Closing Line

`Inspiration Hunter` is not a chatbot on glasses. It is a discovery loop that begins where glasses are strongest: the thing already in front of the user.

