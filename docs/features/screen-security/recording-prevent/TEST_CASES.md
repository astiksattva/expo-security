# Test Cases — Screen Recording Prevention

## Unit tests

| # | Test | Expected |
|---|------|----------|
| 1 | `preventRecording` resolves | No error |
| 2 | `allowRecording` resolves | No error |
| 3 | `preventRecording` on failure | Throws FeatureError |
| 4 | `isRecordingPreventionAvailable` on native | `true` |

## Integration tests

| # | Test | Expected |
|---|------|----------|
| 5 | Enable prevention | `isPrevented === true` |
| 6 | Disable prevention | `isPrevented === false` |
| 7 | Toggle | State flips correctly |
| 8 | Enable, start recording | Recording shows blank content |

## Manual tests

| # | Test | Expected |
|---|------|----------|
| 9 | iOS: enable, start Control Center recording | Content obscured |
| 10 | Android: enable, start ADB screenrecord | Video shows black window |
| 11 | iOS: disable, record | Content visible |
| 12 | Android: disable, record | Content visible |

## Error scenarios

| # | Test | Expected |
|---|------|----------|
| 13 | Toggle rapidly multiple times | No race condition |
| 14 | Enable on Sony Android TV | Unavailable (not a standard Android device) |
