# Emulator Detection — Implementation

## File Structure

```
src/modules/device-security/
├── services/emulatorDetectService.ts — Detection logic
├── hooks/useEmulatorDetect.ts        — React hook
├── screens/EmulatorDetectScreen.tsx  — Feature screen
└── demo/EmulatorDetectDemoScreen.tsx — Demo screen
```

## Service

`emulatorDetectService.ts` exports:
- `checkEmulatorStatus()` — Main detection function (no throw variant)

### Detection Logic

```typescript
// Step 1: expo-device check
const isDevice = Device.isDevice  // false = emulator

// Step 2: Model check (Android)
const ANDROID_EMULATOR_MODELS = [
  'sdk_gphone64_arm64',
  'sdk_gphone64_x86_64',
  'generic_x86',
  'Android SDK built for x86',
  // ...
]

// Step 3: Model check (iOS)
const IOS_SIMULATOR_MODELS = [
  'iPhone Simulator',
  'iPad Simulator',
  'x86_64',
  'arm64',
  // ...
]
```

### Known Emulator Models

Android:
- `sdk_gphone64_arm64`, `sdk_gphone64_x86_64`
- `generic_x86`, `generic_x86_64`, `generic_arm64`
- `Android SDK built for x86`

iOS:
- `iPhone Simulator`, `iPad Simulator`
- `i386`, `x86_64`, `arm64`

## Dependencies

- `expo-device` — Primary device detection API

## Unique Feature

Only Device Security feature that works in Expo Go.

## No Confidence Scoring

Emulator detection returns a simple boolean — due to the reliable `Device.isDevice` API,
confidence scoring is unnecessary.
