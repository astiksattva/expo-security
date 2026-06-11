# Test Cases

## Unit Tests

| Test | Expected |
|------|----------|
| `isAccelerometerAvailable` returns boolean | True/false |
| `startShakeDetection` returns cleanup | Function |
| Shake below threshold | No callback |
| Shake above threshold | Callback with `{ timestamp, acceleration }` |
| Shake during cooldown | Ignored |
| Shake after cooldown | Callback fires |

## Integration Tests

| Test | Expected |
|------|----------|
| Hook: startMonitoring toggles | `isMonitoring` = true |
| Hook: shake increments count | `shakeCount` increases by 1 |
| Hook: resetShakeCount | `shakeCount` = 0 |
| Screen: not available state | Shows EmptyState with message |
| Screen: monitoring stop/start | Buttons toggle correctly |
