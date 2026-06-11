# Developer Mode Detection — Test Cases

## Unit Test Cases

### Success Path

| Test | Expected |
|---|---|
| Developer mode enabled | `isDevModeEnabled` true |
| ADB enabled detected | Indicator in detections array |
| Dev menu available | Indicator in detections array |
| Settings intent accessible | Indicator in detections array |

### Failure Path

| Test | Expected |
|---|---|
| SettingsManager throws | Fallback, other checks continue |
| All checks fail | `isDevModeEnabled` false, empty detections |
| IntentLauncher unavailable | Other checks still run |

### Edge Cases

| Test | Expected |
|---|---|
| iOS device | `isDevModeEnabled` false, empty detections |
| Non-Android platform | `isDevModeEnabled` false, empty detections |
| SettingsManager null | Other checks still run |
| All detection methods unavailable | Graceful false |

## Manual Test Scenarios

1. Android device with developer mode OFF → DISABLED
2. Android device with developer mode ON → ENABLED
3. Toggle USB debugging → Result may change
4. iOS device → Android Only message
5. Android emulator with dev mode → ENABLED (most emulators have dev mode)

## Integration Tests

- Hook returns correct status mapping
- Screen renders appropriate states
- Navigation resolves async route
