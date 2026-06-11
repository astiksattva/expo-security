# Emulator Detection — Test Cases

## Unit Test Cases

### Success Path

| Test | Expected |
|---|---|
| Physical device | `isEmulator` false |
| Android emulator | `isEmulator` true, model detection |
| iOS simulator | `isEmulator` true, simulator detection |
| Known emulator model | Detection by model name |

### Failure Path

| Test | Expected |
|---|---|
| expo-device throws | `isEmulator` false, empty detections |
| Device.isDevice undefined | Graceful fallback |

### Edge Cases

| Test | Expected |
|---|---|
| Unknown device model | `isEmulator` from isDevice only |
| Web platform | `isEmulator` false |
| Brand undefined | Detection via model only |
| Model undefined | Detection via isDevice only |

## Manual Test Scenarios

1. Run on physical device → REAL DEVICE
2. Run on Android emulator → EMULATOR with model name
3. Run on iOS simulator → EMULATOR
4. Toggle between simulator/real device → Result changes
5. Run on cloud device farm → May show as emulator

## Integration Tests

- Hook returns correct status
- Screen renders appropriate badge
- Navigation resolves correctly
