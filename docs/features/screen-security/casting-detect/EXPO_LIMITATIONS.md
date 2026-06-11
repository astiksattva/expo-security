# Expo Limitations — Screen Casting Detection

## Expo Go

❌ **Not supported**.

## Dev Build

⚠️ **Partial support**. iOS works via `expo-screen-capture`. Android requires
a custom native module not included in this package.

## EAS Build

⚠️ **Same as Dev Build**.

## Web

❌ **Not supported**. No browser API exists for detecting screen casting.

## Platform differences

| Aspect | iOS | Android |
|--------|-----|---------|
| Detection | `UIScreen.isCaptured` | `DisplayManager` / `MediaRouter` |
| Expo module | Via `expo-screen-capture` | Not available |
| Native module needed | ❌ | ✅ |
| Distinguishes cast vs record | ❌ | ✅ (with native module) |
| Detects Miracast | N/A | ✅ (with native module) |
| Detects Chromecast | ❌ | ❌ (media-only) |

## Complete Android solution requires

A custom Expo module that wraps:
- `DisplayManager.DisplayListener`
- `MediaRouter.RouteInfo` for media routes
- `Presentation` class for presentation displays

## Native prebuild

`nativePrebuildRequired: true`.

## Future

- `expo-screen-capture` may add casting detection in future versions.
- Android may add a simpler casting detection API.
- For now, iOS has partial support and Android is custom-only.
