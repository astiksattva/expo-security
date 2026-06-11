# Implementation

## Service (`appStateService.ts`)

- Module-level variables track accumulated background/foreground time
- `subscribeToAppStateChanges(callback)`:
  - Uses `AppState.addEventListener('change', ...)` 
  - Tracks time deltas between state transitions
  - Computes accumulated foreground and background time
  - Returns unsubscribe function
- `getAppStateInfo()` returns snapshot of current state and accumulated times
- `resetAppStateTimers()` zeros all accumulated time counters
- `isAppInForeground()` convenience boolean

## Hook (`useAppState.ts`)

- Initializes with current app state via `getAppStateInfo()`
- Subscribes to `AppState` changes on mount
- Exposes `resetTimers()` wrapper and `isForeground` computed boolean

## Screen (`AppStateScreen.tsx`)

- Large state indicator (colored dot + text)
- Previous state, time in foreground, time in background cards
- Reset timers button
