# Test Cases

## Unit Tests

| Test | Expected |
|------|----------|
| `getBatteryLevel` returns number | 0 ≤ level ≤ 1 |
| `getBatteryState` returns valid state | level, isCharging, state, lowPowerMode all present |
| `mapBatteryState` for charging | Returns `'charging'` |
| `mapBatteryState` for full | Returns `'full'` |
| `mapBatteryState` for unplugged | Returns `'unplugged'` |
| Level subscription callback fires | Callback invoked with new level |

## Integration Tests

| Test | Expected |
|------|----------|
| Hook loads initial data | `isLoading` transitions, `data` populated |
| Screen displays all states | Loading, error, empty, success all render |
| Subscription cleanup on unmount | No memory leaks or stale updates |
