# Emulator Detection

Detect whether the app is running on an emulator or physical device.

## Overview

Uses `expo-device`'s `Device.isDevice` flag and device model/brand analysis to determine
if the app is running in a simulated environment.

## Detection Methods

1. **expo-device isDevice** — Primary check (false for emulators)
2. **Model Name Matching** — Checks against known emulator/simulator model strings
3. **Brand Analysis** — Known emulator brand names
4. **Expo Go Ownership** — Detects Expo Go running on emulator

## API

```typescript
import { checkEmulatorStatus } from '../../services/emulatorDetectService'

const result = await checkEmulatorStatus()
// { isEmulator: boolean, detections: string[] }
```

## Platform Support

- Android: ✅ Supported
- iOS: ✅ Supported
