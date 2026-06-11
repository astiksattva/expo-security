# Authentication Feature Group

This group provides biometric and secure credential authentication for React Native Expo applications.

## Features

| Feature | ID | Platform | Status |
|---------|-----|----------|--------|
| Fingerprint Authentication | `fingerprint` | Android | Stable |
| Face ID Authentication | `face-id` | iOS | Stable |
| Device Credential Authentication | `device-credential` | iOS, Android | Stable |
| Secure Storage | `secure-storage` | iOS, Android | Stable |

## Architecture

Each feature follows a layered architecture:

- **Types** — TypeScript interfaces and constants
- **Service** — Platform API wrapper (business logic)
- **Hook** — React state management and side effects
- **Screen** — UI component using the hook
- **Demo Screen** — Simulated version for testing

## Platform Support

| Feature | iOS | Android | Web |
|---------|-----|---------|-----|
| Fingerprint | ❌ | ✅ | ❌ |
| Face ID | ✅ | ❌ | ❌ |
| Device Credential | ✅ | ✅ | ❌ |
| Secure Storage | ✅ | ✅ | ❌ |

## Shared Dependencies

- `expo-local-authentication` — Biometric hardware access
- `expo-secure-store` — Encrypted key-value storage
- `expo-device` — Device information
- `expo-application` — Application metadata

## File Structure

```
src/modules/auth/
├── types/
│   └── index.ts
├── services/
│   ├── fingerprintService.ts
│   ├── faceIdService.ts
│   ├── deviceCredentialService.ts
│   └── secureStorageService.ts
├── hooks/
│   ├── useFingerprint.ts
│   ├── useFaceId.ts
│   ├── useDeviceCredential.ts
│   └── useSecureStorage.ts
├── screens/
│   ├── FingerprintScreen.tsx
│   ├── FaceIdScreen.tsx
│   ├── DeviceCredentialScreen.tsx
│   └── SecureStorageScreen.tsx
└── demo/
    ├── FingerprintDemoScreen.tsx
    ├── FaceIdDemoScreen.tsx
    ├── DeviceCredentialDemoScreen.tsx
    └── SecureStorageDemoScreen.tsx
```
