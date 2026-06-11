# Test Cases — Screenshot Prevention

## Unit tests

| # | Test | Expected |
|---|------|----------|
| 1 | `preventScreenshots` resolves successfully | No error |
| 2 | `allowScreenshots` resolves successfully | No error |
| 3 | `preventScreenshots` when API fails | Throws FeatureError |
| 4 | `isScreenCaptureAvailable` returns true on success | `true` |
| 5 | `isScreenCaptureAvailable` returns false on failure | `false` |

## Integration tests

| # | Test | Expected |
|---|------|----------|
| 6 | Enable prevention | `isPrevented === true` |
| 7 | Disable prevention | `isPrevented === false` |
| 8 | Toggle from off | Enables prevention |
| 9 | Toggle from on | Disables prevention |
| 10 | Enable, take screenshot | Screenshot shows blank/black area |

## Manual tests

| # | Test | Expected |
|---|------|----------|
| 11 | Enable on Android, take screenshot | Screenshot is blocked |
| 12 | Enable on iOS, record screen | Screen content obscured |
| 13 | Disable, take screenshot | Screenshot works normally |
| 14 | Kill app, reopen | Prevention is off (default state) |

## Error scenarios

| # | Test | Expected |
|---|------|----------|
| 15 | Unavailable API | `available === false`, UI shows unavailable message |
| 16 | Enable on unsupported device | Error state with retry |
