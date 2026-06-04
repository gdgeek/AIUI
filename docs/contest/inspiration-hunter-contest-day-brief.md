# Inspiration Hunter Contest Day Brief

Date: 2026-06-04

Use this as the day-of-contest operating card. It is intentionally short, direct, and biased toward what helps the presenter recover quickly under pressure.

## Goal

Win the room by making one idea unmistakable: `Inspiration Hunter` is not a chatbot squeezed into glasses; it is an AI glasses discovery loop that starts from what the user is already seeing.

## 10-Minute Setup

1. Open Craft with the bound agent URL:

```text
https://js.rokid.com/craft?defaultAgentId=7c5ebbe8edc04f1fa09b6bf9c59a3f26
```

2. Confirm the imported source is:

```text
https://github.com/gdgeek/AIUI/tree/main/apps/inspiration-hunter
```

3. Run the golden path once:

```text
scan -> discovery -> challenge -> reveal answer
```

4. Keep these local files visible in Finder or terminal:

```text
/Users/geek/Documents/AIUI/docs/contest/evidence/craft-glasses-discovery.png
/Users/geek/Documents/AIUI/docs/contest/evidence/craft-glasses-final.png
/Users/geek/Documents/AIUI/docs/contest/evidence/lingzhu-review-status.png
/Users/geek/Documents/AIUI/release/inspiration-hunter-submission-pack.zip
```

5. Open the pitch deck only if the demo room expects slides:

```text
/Users/geek/Documents/AIUI/docs/contest/inspiration-hunter-pitch-deck.pptx
```

## 60-Second Run Of Show

| Time | Show | Say |
| --- | --- | --- |
| 0-10s | Scan screen | “The glasses start from the thing I am already looking at.” |
| 10-25s | Discovery screen | “It turns recognition into interpretation: identity, context, and why it matters.” |
| 25-40s | Deep dive or saved state | “The UI reacts in place instead of becoming a long chat transcript.” |
| 40-60s | Challenge answer | “The ending is a small clue reward, so the object becomes memorable.” |

## If Lingzhu remains `审核中`

Say this exact line:

```text
The app has been uploaded and submitted to Lingzhu as version 1.0.1. It is currently 审核中, so for today's judging I will show the verified Craft runtime, local package evidence, and the post-review device checklist.
```

Do not say the app is fully published until Lingzhu review passes and the official launch surface or target Rokid Glasses device has been verified.

## If The Live Demo Breaks

| Failure | Immediate Move |
| --- | --- |
| Craft preview does not load | Show `craft-glasses-discovery.png` and `craft-glasses-final.png`, then narrate the golden path. |
| Network is unstable | Show the local AIX hash and release verifier output from the docs. |
| Judge asks for physical glasses proof | Show the Rokid Glasses constraints doc and say target-device verification is the remaining post-review gate. |
| Judge doubts recognition realism | Say the current build is a semi-real deterministic demo and live camera recognition is the next input layer. |
| Time is cut to 30 seconds | Use the opener from `03b-award-defense.md`, show final challenge state, then close. |

## Evidence Pointers

| Claim | Evidence |
| --- | --- |
| App is built for Rokid Glasses | `13-rokid-glasses-device-constraints.md`, Craft 448x150 screenshots |
| App is packaged | `02-InspirationHunter-v0.1.0.aix`, release manifest hashes |
| App was submitted | `17-lingzhu-review-status.png`, final release evidence guide |
| Demo is stable | deterministic scenario data in `apps/inspiration-hunter/lib/scenarios.js` |
| Future launch path is known | `14-post-review-launch-checklist.md` |

## Final Close

```text
Inspiration Hunter makes AI glasses useful at the exact moment they are different from every other device: when the user is already looking at the world.
```
