# Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Level shows 1.0 on desktop | No battery sensor | Handle gracefully, show "Unavailable" |
| Low power mode not detected (Android) | Only available on iOS | Hide low power section on Android |
| Listener not firing on Android | Battery optimization may delay events | Use `getBatteryState` as fallback |
| expo-battery import error | Package not installed | Run `npx expo install expo-battery` |
