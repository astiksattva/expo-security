# Implementation Details

## Architecture

1. **Service Layer** (`deviceCredentialService.ts`)
   - `isDeviceCredentialAvailable()` — Checks if device passcode is configured
   - `authenticateWithDeviceCredential()` — Triggers system credential dialog

2. **Hook Layer** (`useDeviceCredential.ts`)
   - Manages loading/error/success states
   - Exposes `checkAvailability()` and `authenticate()` async actions

3. **Screen Layer** (`DeviceCredentialScreen.tsx`)
   - Renders availability status
   - Shows authentication button
   - Displays success/error feedback

## Authentication Flow

1. User opens screen → `checkAvailability()` called on mount
2. If not supported platform → EmptyState shown
3. If no credential set → EmptyState shown
4. User taps authenticate → `authenticateWithDeviceCredential()` called
5. System credential dialog appears (passcode / PIN / pattern)
6. Success → Result shown, failure → Error feedback

## Key Difference from Biometric

Unlike fingerprint/Face ID:
- `disableDeviceFallback` is set to `false` (allow passcode)
- No biometric type is returned in result
- Available on both iOS and Android

## Demo Mode

- Demo screen uses `useAppStore.setDemoMode(true)`
- Checks for availability based on platform (simulated)
- Authentication behavior matches real API returns
