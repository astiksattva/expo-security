# Implementation

## Service (`locationService.ts`)

- Permission flow: `getLocationPermissionStatus()` → `requestLocationPermission()` if denied
- `getCurrentLocation()` uses `Location.Accuracy.Balanced` for power efficiency
- `watchLocation()` uses `Location.watchPositionAsync()` with 5s interval and 10m distance filter
- Maps `PermissionStatus` to `'granted' | 'denied' | 'undetermined' | 'blocked'`

## Hook (`useLocation.ts`)

- Checks permission on mount
- Exposes `requestPermission()` + auto-fetches location after grant
- `startWatching()` / `stopWatching()` for continuous location tracking
- Cleans up watcher on unmount

## Screen (`LocationDetectScreen.tsx`)

Four states:
1. Permission needed: Shows grant button (or blocked message)
2. Loading: `LoadingState`
3. Error: `ErrorState` with retry
4. Success: Coordinates, altitude, accuracy, speed + watch toggle
