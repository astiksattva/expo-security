# Device Credential Authentication

## Overview

Device credential authentication uses the device's passcode, PIN, or pattern to verify user identity. Available on both iOS and Android.

## Platform Support

| Platform | Support | Notes |
|----------|---------|-------|
| iOS | ✅ | Passcode-based |
| Android | ✅ | PIN, pattern, or password |
| Web | ❌ | No device credential API |

## Quick Start

```typescript
import { useDeviceCredential } from '../hooks/useDeviceCredential'

function MyComponent() {
  const { authenticate, isAvailable, isLoading } = useDeviceCredential()
  // Call authenticate() to trigger device credential prompt
}
```

## Dependencies

- `expo-local-authentication` (included in project)

## API

### `useDeviceCredential()` hook

Returns:
- `isAvailable: boolean` — Whether device credential is available
- `isLoading: boolean` — Loading state
- `error: string | null` — Error message
- `result: BiometricAuthResult | null` — Authentication result
- `checkAvailability()` — Check if device credential is available
- `authenticate()` — Trigger device credential prompt
- `reset()` — Clear state
