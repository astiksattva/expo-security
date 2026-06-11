# App State Monitoring

Tracks app foreground/background transitions using React Native's built-in `AppState` API.

## Usage

```typescript
import { useAppState } from '../src/modules/device-monitoring/hooks/useAppState'

function MyComponent() {
  const { data, isForeground, resetTimers } = useAppState()
  // data.state, data.timeInForeground, data.timeInBackground
}
```

## API

- `useAppState()` → `{ data: AppStateInfo, error, isLoading, resetTimers, isForeground }`
- `AppStateInfo`: `{ state, previousState, timeInBackground, timeInForeground }`
- Services: `getAppStateInfo()`, `subscribeToAppStateChanges()`, `resetAppStateTimers()`, `isAppInForeground()`
