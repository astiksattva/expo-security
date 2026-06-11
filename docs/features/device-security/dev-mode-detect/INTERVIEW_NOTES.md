# Developer Mode Detection — Interview Notes

## Key Concepts

| Concept | Explanation |
|---|---|
| Developer options | Android settings for development/debugging |
| ADB | Android Debug Bridge — communication tool for development |
| USB debugging | Allows ADB communication over USB |
| Settings.Secure | Android system settings provider |
| Settings.Global | Android global system settings (API 17+) |

## Architecture Questions

**Q: Why not just check one setting?**
A: Developer mode has many facets (ADB, mock location, dev menu). Checking
multiple gives a more complete picture.

**Q: Why doesn't iOS have this?**
A: iOS doesn't have an equivalent "developer mode" toggle. iOS has a development
certificate system instead.

**Q: How does developer mode relate to security?**
A: It enables USB debugging, which allows ADB commands, app debugging, wirelessly
sideloading apps, and mock location spoofing.

## Expo Limitations

- SettingsManager is a native-only module
- No Expo Go support
- Requires native build chain

## Native Alternatives

- **Android Settings API** — Direct ContentResolver queries (native only)
- **Runtime permission checks** — Check if debugger is attached
- **Build.DEBUG** — Check Android build type flags

## Interview Questions

1. What security risks does developer mode introduce?
2. How would you detect developer mode without SettingsManager?
3. Why is ADB enabled a bigger risk than developer options alone?
4. How would you prevent developers from being blocked during testing?
5. What's the relationship between developer mode and mock location detection?
