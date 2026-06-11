# Implementation

## Service (`batteryService.ts`)

- `getBatteryState()` fetches level, state, and low power mode in parallel via `Promise.all`
- Three subscription functions for level, state, and low power mode changes
- Maps `Battery.BatteryState` to string union: `'charging' | 'full' | 'unplugged' | 'unknown'`

## Hook (`useBattery.ts`)

- Fetches initial state on mount via `getBatteryState()`
- Subscribes to all three battery event channels
- Updates merged state incrementally (e.g., level update preserves charging/power mode)

## Screen (`BatteryDetectDemoScreen.tsx`)

- Visual battery bar with percentage
- Cards for charge state, charging status, low power mode
- Live subscription updates in real time
