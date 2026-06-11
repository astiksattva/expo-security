# Expo Limitations — Screen Recording Prevention

## Expo Go

❌ **Not supported**.

## Dev Build

✅ **Full support on both iOS and Android**.

## EAS Build

✅ **Full support**.

## Web

❌ **Not supported**.

## Platform differences

| Aspect | iOS | Android |
|--------|-----|---------|
| Mechanism | Secure UITextField | FLAG_SECURE |
| Blocks device screen recording | ✅ | ✅ |
| Blocks external display output | ❌ | ✅ |
| Blocks ADB screenrecord | N/A | ✅ |
| Root bypass possible | ❌ | ✅ (rooted only) |
| Requires native build | ✅ | ✅ |

## Note

Recording prevention uses the same API as screenshot prevention. They cannot
be controlled independently — enabling recording prevention also prevents
screenshots and vice versa.

## iOS Screen Recording Control Center

The 3-second countdown before Control Center recording starts is NOT blocked
by prevention. Content becomes obscured only after actual recording begins.

## Native prebuild

`nativePrebuildRequired: true`.

## Future

- Apple may introduce dedicated screen recording prevention API.
- Android may add more granular per-app recording controls.
- Monitor `expo-screen-capture` updates for API changes.
