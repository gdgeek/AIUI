# Inspiration Hunter Post-Review Launch Checklist

Date: 2026-06-04

Use this checklist only after Lingzhu no longer shows `审核中` for `InspirationHunter`. Do not mark device launch complete while the agent is still under review.

## Current Known State

```text
Lingzhu AIUI agent: InspirationHunter
Agent ID: 7c5ebbe8edc04f1fa09b6bf9c59a3f26
Submitted version: 1.0.1
Current status at last check: 审核中
Craft bound URL: https://js.rokid.com/craft?defaultAgentId=7c5ebbe8edc04f1fa09b6bf9c59a3f26
```

## Five-Minute Verification Path After Approval

1. Open Lingzhu `项目开发` -> `AIUI智能体`.
2. Confirm `InspirationHunter` is no longer `审核中`.
3. Open the agent detail page if available and confirm the visible version is `1.0.1`.
4. Use the platform launch/test entry if Lingzhu exposes one.
5. If testing on Rokid Glasses, reconnect the glasses as instructed by Craft after upload.
6. Start `InspirationHunter` from the official launch surface.
7. Confirm the first visible screen is the compact glasses HUD.
8. Wait for the hands-free path:
   - discovery opens automatically
   - challenge opens automatically
   - answer reveals automatically
9. Test the physical/glasses primary action if available:
   - Enter or confirm key advances the current screen
   - Back or Backspace returns or exits
10. Capture evidence before calling the release complete.

## Evidence To Capture

```text
[ ] Lingzhu status changed from 审核中 to approved/published state
[ ] Agent detail shows InspirationHunter and version 1.0.1
[ ] Official launch surface or device list shows the app
[ ] Device or official launch surface shows the scan page
[ ] Discovery screen appears after launch
[ ] Challenge completion appears after launch
[ ] Any failure message is screenshotted before retrying
```

Recommended screenshot names:

```text
docs/contest/evidence/lingzhu-approved-status.png
docs/contest/evidence/device-scan-page.png
docs/contest/evidence/device-discovery-page.png
docs/contest/evidence/device-challenge-complete.png
```

## If Launch Fails

Use this order. Do not rebuild randomly.

1. Confirm Lingzhu status is approved, not still reviewing.
2. Confirm the device or official surface is using `InspirationHunter` version `1.0.1`.
3. Reconnect the Rokid Glasses.
4. Reopen Craft with the bound `defaultAgentId`.
5. Run the Craft golden path again to ensure the source still works.
6. If Craft works but device launch fails, capture the device error and treat it as a platform/device integration issue, not an app source issue.
7. Only rebuild/re-upload if the platform points to a stale package or missing package.

## Completion Rule

Only mark `Device-side launch is verified on target Rokid hardware` complete after a device or official launch surface has shown the app and at least one post-upload run has reached challenge completion.
