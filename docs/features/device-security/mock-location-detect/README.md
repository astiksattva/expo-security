# Mock Location Detection

Detect whether the Android device has a mock location provider enabled.

## Overview

Mock location providers allow users to spoof GPS coordinates. This feature detects
whether mock location is allowed or active on the device, which is critical for
apps that rely on location authenticity.

## Detection Methods

1. **Settings Secure** — Reads ALLOW_MOCK_LOCATION setting
2. **Location Provider** — Checks if mock location provider is active
3. **ContentResolver** — Queries system ContentResolver for mock location flag
4. **Developer Options** — Checks dev options for mock location flags
5. **ADB Status** — ADB-enabled devices can use mock location

## API

```typescript
import { checkMockLocationStatusSafe } from '../../services/mockLocationDetectService'

const result = await checkMockLocationStatusSafe()
// { isMockLocationEnabled: boolean, detections: string[] }
```

## Platform Support

- Android: ✅ Supported
- iOS: ❌ Not applicable
