# Test Cases — Screen Recording Detection

## Unit tests

| # | Test | Expected |
|---|------|----------|
| 1 | `checkRecordingStatus` on iOS with module | Returns result with method |
| 2 | `checkRecordingStatus` on Android | `method === 'unavailable'` |
| 3 | `isRecordingDetectionAvailable` on iOS | `true` |
| 4 | `isRecordingDetectionAvailable` on Android | `false` |

## Integration tests

| # | Test | Expected |
|---|------|----------|
| 5 | Start polling | `pollingActive === true`, status checks begin |
| 6 | Stop polling | `pollingActive === false`, no more checks |
| 7 | Single refresh returns current status | Status updated |
| 8 | Start recording on iOS, polling detects it | `isRecording === true` |

## Manual tests (physical iOS device)

| # | Test | Expected |
|---|------|----------|
| 9 | Open Control Center, start screen recording | Detection triggers within 2s |
| 10 | Stop screen recording | Detection clears within 2s |
| 11 | Mirror to Apple TV | `isRecording` (isCaptured) may become true |
| 12 | Record on Android | Shows "unavailable" message |

## Error scenarios

| # | Test | Expected |
|---|------|----------|
| 13 | Polling active, module throws | Error state displayed |
| 14 | Platform unsupported | Available shows false |
