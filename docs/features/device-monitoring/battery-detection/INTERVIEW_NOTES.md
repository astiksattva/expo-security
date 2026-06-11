# Interview Notes

## Key Talking Points

- `expo-battery` provides simple cross-platform battery monitoring
- Three independent event channels: level, state, low power mode
- No configuration or permissions required

## Common Questions

**Q**: How accurate is battery level?
**A**: Platform-dependent. iOS reports integer percentage converted to 0-1; Android varies by device manufacturer.

**Q**: Can I prevent sleep based on charging state?
**A**: Yes, use `isCharging` flag to keep screen on during long operations.

**Q**: Why no battery health API?
**A**: Apple restricts battery health to private APIs; Android does not expose via standard SDK.
