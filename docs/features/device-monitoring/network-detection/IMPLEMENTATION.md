# Implementation

## Service (`networkService.ts`)

- `getNetworkState()` calls `Network.getNetworkStateAsync()` and maps `NetworkStateType` enum to string union `NetworkType`
- `subscribeToNetworkChanges()` wraps `Network.addNetworkStateListener()` and returns cleanup function
- `getIpAddress()` calls `Network.getIpAddressAsync()` with null-safe error handling
- `isNetworkAvailable()` convenience boolean check

## Hook (`useNetwork.ts`)

- Calls `getNetworkState()` on mount
- Subscribes to `addNetworkStateListener` for real-time updates
- Exposes `refetch` for manual refresh
- Updates state on every network change event

## Screen (`NetworkDetectScreen.tsx`)

Four states:
1. Loading: `LoadingState` with "Checking network status..."
2. Error: `ErrorState` with retry button
3. Empty: `EmptyState` when data is null
4. Success: Cards showing connection status, type, internet reachability
