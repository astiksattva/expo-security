# Face ID Authentication

## Overview

Face ID authentication uses Apple's facial recognition technology to verify user identity. Available exclusively on iOS devices with TrueDepth camera.

## Platform Support

| Platform | Support | Notes |
|----------|---------|-------|
| iOS | ✅ | iPhone X+ with TrueDepth camera |
| Android | ❌ | No equivalent API |
| Web | ❌ | No biometric API available |

## Quick Start

```typescript
import { useFaceId } from '../hooks/useFaceId'

function MyComponent() {
  const { authenticate, status, isLoading } = useFaceId()
  // Call authenticate() to trigger Face ID scan
}
```

## Dependencies

- `expo-local-authentication` (included in project)

## API

### `useFaceId()` hook

Returns:
- `status: BiometricStatus | null` — Hardware and enrollment status
- `isLoading: boolean` — Loading state
- `error: string | null` — Error message
- `result: BiometricAuthResult | null` — Authentication result
- `checkStatus()` — Check biometric availability
- `authenticate()` — Trigger Face ID authentication
- `reset()` — Clear state
