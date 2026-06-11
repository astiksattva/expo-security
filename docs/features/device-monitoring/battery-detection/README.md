# Battery Detection

Monitors device battery level, charging state, and low power mode using `expo-battery`.

## Usage

```typescript
import { useBattery } from '../src/modules/device-monitoring/hooks/useBattery'

function MyComponent() {
  const { data, error, isLoading, refetch } = useBattery()
  // data.level (0-1), data.isCharging, data.state, data.lowPowerMode
}
```

## API

- `useBattery()` → `{ data: BatteryState | null, error, isLoading, refetch }`
- Services: `getBatteryLevel()`, `getBatteryState()`, `subscribeToBatteryLevelChanges()`, `subscribeToBatteryStateChanges()`, `subscribeToLowPowerModeChanges()`
