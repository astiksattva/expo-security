# Network Detection

Monitors device network connectivity, connection type (Wi-Fi, cellular, VPN, etc.), and internet reachability using `expo-network`.

## Usage

```typescript
import { useNetwork } from '../src/modules/device-monitoring/hooks/useNetwork'

function MyComponent() {
  const { data, error, isLoading, refetch } = useNetwork()

  if (data?.isConnected) {
    console.log('Connected via', data.type)
  }
}
```

## API

- `useNetwork()` → `{ data: NetworkState | null, error, isLoading, refetch }`
- `NetworkState`: `{ isConnected, type, isInternetReachable }`
- Services: `getNetworkState()`, `subscribeToNetworkChanges()`, `getIpAddress()`, `isNetworkAvailable()`
