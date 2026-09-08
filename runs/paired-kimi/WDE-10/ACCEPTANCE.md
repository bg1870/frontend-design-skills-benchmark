# Loomwork signup — delivery notes

## Material assumptions

- Loomwork is a new brand without an existing design system.
- The primary user is a clinic owner or practice manager creating the first workspace.
- Signup needs name, work email and password only; clinic setup follows account creation.
- The 14-day trial requires no payment method.
- The static prototype simulates success in place; production API, authentication and legal destinations are outside this artifact.

## Responsive browser acceptance

Tested in headless Chromium at the requested viewport classes after implementation.

| Class | Viewport | Evidence | Result |
|---|---:|---|---|
| Mobile | 375 × 812 | [`evidence/mobile.png`](evidence/mobile.png) | Pass — form fills the viewport width, 44px+ controls, no horizontal overflow; visual story follows below the fold. |
| Tablet | 768 × 1024 | [`evidence/tablet.png`](evidence/tablet.png) | Pass — single-column form has a readable measure; visual band begins below without clipping. |
| Laptop | 1440 × 900 | [`evidence/laptop.png`](evidence/laptop.png) | Pass — asymmetric 5/7 split, complete form and schedule visualization fit in one viewport. |

### Repair log

1. The first automated capture raced the schedule entrance and showed partly drawn appointments. The final acceptance capture waits 1.5 seconds for the 850ms choreography to complete.
2. Added explicit horizontal overflow containment for long content and narrow viewports.
3. Added a skip link, polite validation status, email spellcheck suppression, theme color and balanced heading wraps during the static accessibility audit.
4. Improved password error copy so it tells the user exactly how to fix the field.

## Functional and accessibility checks

- Native labeled controls with name, type, input mode and autocomplete metadata.
- Invalid submission marks fields, exposes inline errors, announces status and focuses the first error.
- Password visibility control updates `aria-pressed` and returns focus to the field.
- Keyboard focus is visible; actions use semantic links/buttons.
- Reduced-motion preference collapses animations and transitions.
- Color contrast, 375px containment and heading hierarchy reviewed statically.

## Screenshot integrity

```text
40a5c782ea8f6bfc5f931912a800e85c55e18b60f6a87819b753aa3d37af881e  evidence/laptop.png
5e3778888ccc02d582efd49b8a8e9820bcc31f2d84f878938ba29c8272da6751  evidence/mobile.png
8ef53ebe33504cd0320f1412037b48d30b303c1d8bd773e96c66a994b095acc1  evidence/tablet.png
```
