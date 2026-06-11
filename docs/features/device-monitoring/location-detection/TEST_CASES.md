# Test Cases

## Unit Tests

| Test | Expected |
|------|----------|
| `requestLocationPermission` returns status | `granted` boolean, `status` string |
| `getCurrentLocation` coordinates | Valid lat/lng numbers |
| `getCurrentLocation` altitude null | Null when unavailable |
| `watchLocation` returns cleanup | Function returned |
| `mapPermissionStatus` blocked | Correctly maps when `canAskAgain` is false |

## Integration Tests

| Test | Expected |
|------|----------|
| Hook mounts, checks permission | `permission` populated |
| Request permission flow | Button press → grant → location fetched |
| Start/stop watching | `isWatching` toggles, location updates received |
| Permission denied screen | Grant button shown, no auto-fetch |
| Permission blocked screen | Message shown, no grant button |
