# Interview Notes — Screen Recording Prevention

## Common questions

### How is recording prevention different from screenshot prevention?

They are technically identical — both use `preventScreenCaptureAsync` from
`expo-screen-capture`. They are presented as separate features for semantic
clarity and because the attack scenarios and edge cases differ.

### Can you prevent screen recording on Android?

Yes, `FLAG_SECURE` (set via `preventScreenCaptureAsync`) prevents both
screenshots and screen recording on Android 5+.

### What happens on iOS when recording prevention is active?

The system adds a secure `UITextField` overlay with `isSecureTextEntry = true`.
When recording is active, this field's content is hidden, effectively
obscuring the entire screen.

### Does this protect against HDMI capture?

On Android, `FLAG_SECURE` affects the window, not the display output. However,
Android's `FLAG_SECURE` typically does propagate to external displays.
On iOS, screen recording prevention does NOT protect against HDMI capture or
AirPlay mirroring. Separate casting detection is needed.

### How would you test recording prevention in CI?

Use a physical device farm (Firebase Test Lab, BrowserStack) with ADB
`screenrecord` running while automated UI tests execute. Verify the recorded
output shows a black/secure window.

### What's the difference between prevention and detection?

| Aspect | Prevention | Detection |
|--------|------------|-----------|
| Mechanism | Blocks capture | Detects capture |
| User visible | Yes (content hidden) | No (silent logging) |
| Security level | High (active defense) | Low (passive) |
| Use case | Sensitive screens | Audit/alerting |

Always use both: prevention as the primary defense, detection for alerting
and auditing.
