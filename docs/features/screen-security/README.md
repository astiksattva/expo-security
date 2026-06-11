# Screen Security — Feature Group

Protects the application screen from unauthorized capture, recording, and
casting. This group covers five features:

| # | Feature | Type | Platforms | Status |
|---|---------|------|-----------|--------|
| 1 | Screenshot Detection | Detect | iOS, Android | ✅ Stable |
| 2 | Screenshot Prevention | Prevent | iOS, Android | ✅ Stable |
| 3 | Screen Recording Detection | Detect | iOS only | ✅ Stable |
| 4 | Screen Recording Prevention | Prevent | iOS, Android | 🟡 Beta |
| 5 | Screen Casting Detection | Detect | iOS (partial) | 🟡 Beta |

## Architecture

All features follow the feature-module pattern:
`src/modules/screen-security/{types,services,hooks,screens,demo}/`

- **Types** shared interfaces for all screen security states.
- **Services** wrap `expo-screen-capture` and native platform APIs.
- **Hooks** provide reactive state via `useState` + `useEffect`.
- **Screens** full-feature screens with error, loading, empty states.
- **Demo** simplified screens for quick testing from the Dashboard.

## Native dependency

All features require `expo-screen-capture` (already in `package.json`).
Features marked "Dev Build only" **cannot** run in Expo Go because they need
native modules (`preventScreenCaptureAsync`, `addScreenshotListener`).

## Platform matrix

| Feature | iOS | Android | Web | Expo Go | Dev Build |
|---------|-----|---------|-----|---------|-----------|
| Screenshot Detect | ✅ | ✅ | ❌ | ❌ | ✅ |
| Screenshot Prevent | ✅ | ✅ | ❌ | ❌ | ✅ |
| Recording Detect | ✅ | ❌ | ❌ | ❌ | ✅ |
| Recording Prevent | ✅ | ✅ | ❌ | ❌ | ✅ |
| Casting Detect | ⚠️ | ❌ | ❌ | ❌ | ✅ |

✅ = full support, ⚠️ = partial/limited, ❌ = not supported

## Permissions required

None. Screen security operates at the application level and does not require
runtime permissions.
