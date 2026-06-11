# Enterprise Features

Collection of enterprise-grade features for Expo Security Lab.

## Features

| Feature | Status | Expo Go | Dev Build | iOS | Android | Web |
|---------|--------|---------|-----------|-----|---------|-----|
| Push Notifications | Stable | Yes | Yes | Yes | Yes | No |
| Deep Linking | Stable | Yes | Yes | Yes | Yes | Yes |
| QR Scanner | Stable | Yes | Yes | Yes | Yes | Yes |
| NFC | Beta | No | Yes | Yes | Yes | No |
| Analytics | Stable | Yes | Yes | Yes | Yes | Yes |
| Crash Reporting | Stable | Yes | Yes | Yes | Yes | Yes |

## Architecture

All enterprise features follow a consistent layered architecture:

1. **Types** — TypeScript interfaces, enums, and constants
2. **Services** — Pure business logic functions using Expo APIs
3. **Hooks** — React hooks wrapping services with state management
4. **Screens** — Feature screens with error/loading/empty states
5. **Demo Screens** — Interactive demonstration screens
6. **Tests** — Unit and integration tests
7. **Docs** — Comprehensive documentation per feature

## Dependencies

- `expo-notifications` — Push notifications
- `expo-linking` — Deep linking
- `expo-camera` — QR code scanning
- `expo-nfc` — NFC tag reading
- Built-in `ErrorUtils` — Crash reporting
- Custom store — Analytics

## Expo Compatibility

| Module | Expo Go | Dev Build | EAS Build | Native Prebuild |
|--------|---------|-----------|-----------|-----------------|
| expo-notifications | Yes | Yes | Yes | No |
| expo-linking | Yes | Yes | Yes | No |
| expo-camera | Yes | Yes | Yes | No |
| expo-nfc | No | Yes | Yes | Yes |
| Custom (Analytics) | Yes | Yes | Yes | No |
| Custom (Crash Reporting) | Yes | Yes | Yes | No |
