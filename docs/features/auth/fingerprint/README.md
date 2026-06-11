# Fingerprint Authentication

## Overview

Fingerprint authentication uses the device's fingerprint sensor to verify user identity. This feature is primarily available on Android devices with fingerprint hardware.

## Platform Support

| Platform | Support | Notes |
|----------|---------|-------|
| iOS | ❌ | iOS uses Touch ID / Face ID only |
| Android | ✅ | Requires fingerprint hardware |
| Web | ❌ | No biometric API available |

## Quick Start

```typescript
import { useFingerprint } from '../hooks/useFingerprint'

function MyComponent() {
  const { authenticate, status, isLoading } = useFingerprint()
  // Call authenticate() to trigger fingerprint scan
}
```

## Dependencies

- `expo-local-authentication` (included in project)

## API

### `useFingerprint()` hook

Returns:
- `status: BiometricStatus | null` — Hardware and enrollment status
- `isLoading: boolean` — Loading state
- `error: string | null` — Error message
- `result: BiometricAuthResult | null` — Authentication result
- `checkStatus()` — Check biometric availability
- `authenticate()` — Trigger fingerprint authentication
- `reset()` — Clear state
