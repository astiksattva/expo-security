# Implementation Details

## Architecture

1. **Service Layer** (`faceIdService.ts`)
   - `getFaceIdStatus()` — Checks hardware compatibility and enrollment
   - `authenticateFaceId()` — Triggers system Face ID dialog

2. **Hook Layer** (`useFaceId.ts`)
   - Manages loading/error/success states
   - Exposes `checkStatus()` and `authenticate()` async actions

3. **Screen Layer** (`FaceIdScreen.tsx`)
   - Renders device status
   - Shows authentication button
   - Displays success/error feedback

## Authentication Flow

1. User opens screen → `checkStatus()` called on mount
2. If not iOS → EmptyState shown ("Face ID is only available on iOS")
3. If Face ID unavailable → EmptyState shown
4. User taps authenticate → `authenticateFaceId()` called
5. System Face ID dialog appears
6. Success → Result shown, failure → Error feedback

## iOS-Specific

- Uses `LAContext` with `LAPolicy.deviceOwnerAuthenticationWithBiometrics`
- Face ID requires `NSFaceIDUsageDescription` in Info.plist
- On simulator, Face ID can be tested via Hardware > Face ID > Enrolled

## Demo Mode

- Demo screen uses `useAppStore.setDemoMode(true)`
- Hardware checks are bypassed in demo mode
- Authentication behavior matches real API returns
