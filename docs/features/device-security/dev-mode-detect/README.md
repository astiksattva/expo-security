# Developer Mode Detection

Detect whether Android Developer Options are enabled on the device.

## Overview

Developer mode on Android enables USB debugging, mock locations, and performance
profiling tools. Its presence indicates a user with elevated control over the device.

## Detection Methods

1. **Settings Manager** — Reads developer options flags from system settings
2. **ADB Status** — Checks whether ADB (USB debugging) is enabled
3. **Dev Menu Flag** — Detects React Native dev menu availability
4. **Intent Availability** — Checks developer settings intent accessibility
5. **Build Properties** — Analyzes application build properties

## API

```typescript
import { checkDevModeStatusSafe } from '../../services/devModeDetectService'

const result = await checkDevModeStatusSafe()
// { isDevModeEnabled: boolean, detections: string[] }
```

## Platform Support

- Android: ✅ Supported
- iOS: ❌ Not applicable
