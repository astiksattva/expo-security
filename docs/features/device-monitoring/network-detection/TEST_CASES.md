# Test Cases

## Unit Tests

| Test | Expected |
|------|----------|
| `getNetworkState` returns valid state | `isConnected` boolean, type is one of known types |
| `getNetworkState` when offline | `isConnected` = false |
| `mapNetworkType` for Wi-Fi | Returns `'wifi'` |
| `mapNetworkType` for Cellular | Returns `'cellular'` |
| `mapNetworkType` for unknown | Returns `'unknown'` |
| `getIpAddress` returns string | Valid IP or null |
| `subscribeToNetworkChanges` fires callback | Callback invoked on state change |

## Integration Tests

| Test | Expected |
|------|----------|
| Hook mounts, loads data | `isLoading` transitions true → false, `data` populated |
| Hook cleanup unmounts | No memory leaks |
| Screen renders all states | Loading, error, empty, success all visible |
