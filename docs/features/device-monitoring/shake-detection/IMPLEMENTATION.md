# Implementation

## Service (`shakeService.ts`)

- `isAccelerometerAvailable()` checks sensor hardware via `Accelerometer.isAvailableAsync()`
- `startShakeDetection(onShake, config?)`:
  - Sets update interval (default 100ms)
  - Computes acceleration magnitude: `sqrt(x² + y² + z²)`
  - Fires callback when magnitude exceeds threshold (default 1.5) AND cooldown (500ms) has elapsed
  - Returns cleanup function `() => subscription.remove()`
- `checkShakeAvailability()` returns `{ available, error }`

## Hook (`useShake.ts`)

- Checks accelerometer availability on mount
- `startMonitoring()` begins shake detection with optional custom config
- Auto-resets `isShaking` after 300ms for visual feedback
- Exposes `resetShakeCount()` for consumer use

## Screen (`ShakeDetectScreen.tsx`)

Four states:
1. Not available: EmptyState with explanation
2. Idle: Shows shake count, start button
3. Monitoring: Shows live indicator (red dot + "Listening..."), stop button
4. Shaking: Green dot + "Shaking!" + incremented count
