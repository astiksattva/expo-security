# Test Cases — Screenshot Detection

## Unit tests

| # | Test | Expected |
|---|------|----------|
| 1 | Subscribe to listener returns Subscription object | Not null |
| 2 | Unsubscribe from null does not throw | Silent success |
| 3 | Unsubscribe removes listener | No more callbacks after |
| 4 | Callback updates detected state | `detected === true`, timestamp set |
| 5 | Reset clears detected and timestamp | `detected === false`, `timestamp === null` |

## Integration tests

| # | Test | Expected |
|---|------|----------|
| 6 | Start and stop listening | Listener active state toggles correctly |
| 7 | Take screenshot on device | Detected state becomes true |
| 8 | Take screenshot while stopped | Detected remains false |
| 9 | Multiple screenshots in succession | Each updates timestamp |
| 10 | App backgrounded, screenshot taken | Listener fires (on real device) |

## Error scenarios

| # | Test | Expected |
|---|------|----------|
| 11 | Listener throws during subscription | Error state displayed, retry available |
| 12 | expo-screen-capture not available | Error state with featureError message |

## Manual testing

1. Run app on physical iOS device.
2. Navigate to Screenshot Detection screen.
3. Tap "Start Listening".
4. Press Power + Volume Up.
5. Verify "Screenshot Captured" appears with correct time.
6. Repeat on Android physical device.
