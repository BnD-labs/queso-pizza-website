---
name: whatsapp-order-builder
description: Implements the WhatsApp-based order builder pattern used on the Menu & Order page - a running-order UI that compiles selections into a pre-filled WhatsApp message paired with a call-to-confirm action, with no cart or payment gateway. Use when building or editing anything related to menu item selection, order state, WhatsApp message compilation, or the order submission flow.
---

# WhatsApp Order Builder Pattern

## Why this pattern exists (context, not just spec)
Queso has no POS system and no internet at the on-site order phone. The WhatsApp Business number is on the owner's personal device, not reliably staffed. This component exists to route orders through the channel customers already use (WhatsApp) while giving on-site staff — who can answer a phone call but not WhatsApp — an independent way to catch the same order. Don't simplify this down to "just a WhatsApp button" — the paired call action is load-bearing, not decorative.

## Functional spec
1. **Selection state**: customer taps a menu item to add it to a running order. Each item in the order has a quantity selector (increment/decrement, not free-text).
2. **Persistent summary**: a running-order summary is visible while browsing — sticky panel, drawer, or footer bar. Shows item names, quantities, and a total item count. Not a modal that requires navigating away from the menu.
3. **Message compilation**: on submit, format the running order into a clean itemized text list (item name × quantity, one per line) and construct a `wa.me/<number>?text=<url-encoded-message>` link. Open this link (new tab or same-page redirect, whichever fits the surrounding UI).
4. **Paired call-to-confirm**: immediately alongside the WhatsApp send action — not after it, not buried in a follow-up screen — show a `tel:<number>` button framed as confirming the order, e.g. "Order sent! Tap to call and confirm." Both actions should be visually equal weight. Do not frame the call button as a fallback for when WhatsApp "doesn't work" — frame it as a normal part of completing the order.

## Explicit non-goals
- No cart persistence across sessions (no localStorage/cookies needed — this is a single-visit flow)
- No payment step of any kind
- No order confirmation number or tracking — confirmation happens via the phone call, not the app
- No account creation or customer data collection beyond what's in the WhatsApp message itself

## Reuse note
This pattern is built to be adapted for other BND Labs clients with similar fulfillment constraints (no POS, WhatsApp-first ordering culture). If asked to adapt this for a different client, keep the four-step spec above intact and swap only the menu data source and contact numbers.
