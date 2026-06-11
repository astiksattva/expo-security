# Device Monitoring

Monitors device state: network connectivity, battery level, GPS location, shake gestures, and app foreground/background transitions.

## Features

| Feature | Expo API | Priority | Status |
|---------|----------|----------|--------|
| Network Detection | expo-network | High | ✅ Implemented |
| Battery Detection | expo-battery | High | ✅ Implemented |
| Location Detection | expo-location | High | ✅ Implemented |
| Shake Detection | expo-sensors (Accelerometer) | Medium | ✅ Implemented |
| App State Monitoring | react-native AppState | High | ✅ Implemented |

## Architecture

```
src/modules/device-monitoring/
  types/index.ts          - Shared types & error constants
  services/               - Expo API wrappers (5 services)
  hooks/                  - React hooks (5 hooks)
  screens/                - Feature screens (5 screens)
  demo/                   - Demo screens (5 screens)
  tests/                  - Unit tests

docs/features/device-monitoring/
  README.md               - This overview
  {feature}/              - Per-feature: README, IMPLEMENTATION, EDGE_CASES,
                            SECURITY, TEST_CASES, TROUBLESHOOTING,
                            EXPO_LIMITATIONS, INTERVIEW_NOTES
```

## Shared Pattern

Every hook returns `{ data, error, isLoading }` conforming to `MonitoringResult<T>`. Every screen handles loading, error, empty, and success states.

## Platform Support Summary

| Feature | Expo Go | Dev Build | EAS Build | Android | iOS | Web |
|---------|---------|-----------|-----------|---------|-----|-----|
| Network | ✅ Full | ✅ Full | ✅ Full | ✅ | ✅ | ⚠️ |
| Battery | ✅ Full | ✅ Full | ✅ Full | ✅ | ✅ | ❌ |
| Location | ✅ Full | ✅ Full | ✅ Full | ✅ | ✅ | ⚠️ |
| Shake | ✅ Full | ✅ Full | ✅ Full | ✅ | ✅ | ⚠️ |
| AppState | ✅ Full | ✅ Full | ✅ Full | ✅ | ✅ | ⚠️ |

## Dependencies

- `expo-network` ~56.0.5
- `expo-battery` ~56.0.4
- `expo-location` ~56.0.16
- `expo-sensors` ~56.0.5
- `react-native` (AppState built-in)
