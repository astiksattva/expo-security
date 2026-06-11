# Test Cases

## Unit Tests

| Test | Expected |
|------|----------|
| `getAppStateInfo` returns state | `state` matches `AppState.currentState` |
| `subscribeToAppStateChanges` fires | Callback invoked on state change |
| `resetAppStateTimers` zeros | `timeInBackground` = 0, `timeInForeground` = 0 |
| `isAppInForeground` returns bool | True when active, false otherwise |
| Background→Foreground tracking | Time accumulation correct |

## Integration Tests

| Test | Expected |
|------|----------|
| Hook mounts, initializes | `data.state` matches current app state |
| State change updates hook | `data` re-renders with new state |
| Reset timers button | All times go to 0 |
| Screen renders current state | Correct color + text shown |
| Unsubscribe on unmount | No further state updates received |
