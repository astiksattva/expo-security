# Implementation Details

## Architecture

1. **Service Layer** (`fingerprintService.ts`)
   - `getFingerprintStatus()` — Checks hardware compatibility and enrollment
   - `authenticateFingerprint()` — Triggers system fingerprint dialog

2. **Hook Layer** (`useFingerprint.ts`)
   - Manages loading/error/success states
   - Exposes `checkStatus()` and `authenticate()` async actions

3. **Screen Layer** (`FingerprintScreen.tsx`)
   - Renders device status
   - Shows authentication button
   - Displays success/error feedback

## Authentication Flow

1. User opens screen → `checkStatus()` called on mount
2. If hardware unavailable → EmptyState shown
3. If no fingerprint enrolled → EmptyState shown  
4. User taps authenticate → `authenticateFingerprint()` called
5. System biometric dialog appears
6. Success → Result shown, failure → Error feedback

## Demo Mode

- Demo screen uses `useAppStore.setDemoMode(true)`
- In demo mode, hardware checks are bypassed
- Authentication behavior matches real API returns
