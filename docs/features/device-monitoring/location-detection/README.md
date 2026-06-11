# Location Detection

Monitors device GPS coordinates, altitude, accuracy, and speed using `expo-location`.

## Usage

```typescript
import { useLocation } from '../src/modules/device-monitoring/hooks/useLocation'

function MyComponent() {
  const { data, permission, requestPermission, isWatching } = useLocation()
  // data.latitude, data.longitude, data.altitude, data.accuracy, data.speed
}
```

## API

- `useLocation()` → `{ data, error, isLoading, permission, requestPermission, refetch, startWatching, stopWatching, isWatching }`
- Services: `requestLocationPermission()`, `getLocationPermissionStatus()`, `getCurrentLocation()`, `watchLocation()`
