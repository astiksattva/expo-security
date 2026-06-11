# Test Cases — Screen Casting Detection

## Unit tests

| # | Test | Expected |
|---|------|----------|
| 1 | `checkCastingStatus` on iOS | Returns result with method info |
| 2 | `checkCastingStatus` on Android | `method === 'unavailable'` |
| 3 | `isCastingDetectionAvailable` | Returns platform-appropriate value |

## Integration tests

| # | Test | Expected |
|---|------|----------|
| 4 | Start polling | `pollingActive === true` |
| 5 | Stop polling | `pollingActive === false` |
| 6 | Refresh returns current status | Status + details updated |

## Manual tests (physical iOS device)

| # | Test | Expected |
|---|------|----------|
| 7 | Mirror to Apple TV via AirPlay | Detection triggers (isCaptured = true) |
| 8 | Connect HDMI cable with capture card | Detection triggers |
| 9 | Disconnect external display | Detection clears |
| 10 | Cast on Android | Shows "unavailable" message |

## Error scenarios

| # | Test | Expected |
|---|------|----------|
| 11 | Polling active, module throws | Error state, polling continues |
| 12 | Platform unsupported | Available shows false with explanation |
