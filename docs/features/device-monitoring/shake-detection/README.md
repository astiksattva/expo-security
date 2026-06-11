# Shake Detection

Detects device shake gestures using the accelerometer sensor via `expo-sensors`.

## Usage

```typescript
import { useShake } from '../src/modules/device-monitoring/hooks/useShake'

function MyComponent() {
  const { data, isMonitoring, startMonitoring, stopMonitoring } = useShake()
  // data.isShaking, data.shakeCount, data.lastShakeTimestamp
}
```

## API

- `useShake(config?)` → `{ data, error, isLoading, isAvailable, startMonitoring, stopMonitoring, isMonitoring, resetShakeCount }`
- Config: `{ threshold?: number, updateInterval?: number, cooldownMs?: number }`
- Services: `isAccelerometerAvailable()`, `startShakeDetection()`, `checkShakeAvailability()`
