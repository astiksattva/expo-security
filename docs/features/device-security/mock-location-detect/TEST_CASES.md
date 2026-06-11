# Mock Location Detection — Test Cases

## Unit Test Cases

### Success Path

| Test | Expected |
|---|---|
| Mock location disabled | `isMockLocationEnabled` false |
| Mock location enabled (pre-10) | `isMockLocationEnabled` true |
| Mock provider active | Detection in detections array |
| ADB enabled with mock location proxy | Detection |

### Failure Path

| Test | Expected |
|---|---|
| SettingsManager throws | Other checks continue |
| expo-location unavailable | Other checks still run |
| All checks fail | `isMockLocationEnabled` false, empty detections |

### Edge Cases

| Test | Expected |
|---|---|
| iOS device | `isMockLocationEnabled` false, empty detections |
| Non-Android platform | `isMockLocationEnabled` false, empty detections |
| Android 10+ device | Detection via location provider |
| Location permission not granted | Detection still works |

## Manual Test Scenarios

1. Android device — mock location OFF → SECURE
2. Android device — mock location ON → SPOOFING with detections
3. Use developer options to enable mock location app
4. Install FakeGPS app and enable via dev settings
5. iOS device → Android Only message
6. Android emulator → may show as detected (Google Play Services mock)

## Integration Tests

- Hook returns correct status mapping
- Screen renders appropriate states
- Navigation resolves correctly
