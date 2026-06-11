# Interview Notes

## Key Talking Points

- React Native `AppState` is built-in — zero dependencies
- Three states: `active`, `inactive` (iOS only), `background`
- Critical for: pausing animations, stopping network requests, locking sensitive screens
- `addEventListener` returns a `Subscription` with `.remove()` (not `removeEventListener`)

## Common Questions

**Q**: What's the difference between `inactive` and `background`?
**A**: `inactive` = transitioning but still visible (iOS notification center, incoming call). `background` = no longer visible.

**Q**: Does the app state listener work when the app is killed?
**A**: No. When the process is terminated, there is no final state update.

**Q**: How do you detect screen lock specifically?
**A**: Cannot distinguish lock from background with AppState alone. Use `expo-screen-capture` for additional context.

**Q**: Why accumulate time manually?
**A**: `AppState` only fires events on change — it does not provide elapsed time.
