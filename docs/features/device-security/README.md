# Device Security — Feature Group

Five features that detect compromised or non-standard device environments.

## Features

| Feature | Platform | Expo Go | Detection Method |
|---|---|---|---|
| Root Detection | Android | ❌ | File system checks for su binaries, root management apps |
| Jailbreak Detection | iOS | ❌ | File system checks for Cydia, MobileSubstrate, SSH daemons |
| Emulator Detection | iOS + Android | ✅ | expo-device `Device.isDevice`, model/brand matching |
| Developer Mode Detection | Android | ❌ | System settings, ADB status, build properties |
| Mock Location Detection | Android | ❌ | System settings, location provider, ContentResolver |

## Architecture

```
src/modules/device-security/
├── types/index.ts              — Shared type definitions
├── services/                   — Detection logic (no UI)
│   ├── rootDetectService.ts
│   ├── jailbreakDetectService.ts
│   ├── emulatorDetectService.ts
│   ├── devModeDetectService.ts
│   └── mockLocationDetectService.ts
├── hooks/                      — React hooks wrapping services
│   ├── useRootDetect.ts
│   ├── useJailbreakDetect.ts
│   ├── useEmulatorDetect.ts
│   ├── useDevModeDetect.ts
│   └── useMockLocationDetect.ts
├── screens/                    — Feature screens (detection UI)
│   ├── RootDetectScreen.tsx
│   ├── JailbreakDetectScreen.tsx
│   ├── EmulatorDetectScreen.tsx
│   ├── DevModeDetectScreen.tsx
│   └── MockLocationDetectScreen.tsx
└── demo/                       — Educational demo screens
    ├── RootDetectDemoScreen.tsx
    ├── JailbreakDetectDemoScreen.tsx
    ├── EmulatorDetectDemoScreen.tsx
    ├── DevModeDetectDemoScreen.tsx
    └── MockLocationDetectDemoScreen.tsx
```

## State Management

Every hook follows the same pattern:

```typescript
interface UseXxxDetectReturn {
  result: XxxResult | null      // Detection data
  status: DetectionStatus       // 'idle' | 'scanning' | 'complete' | 'error'
  error: string | null          // Error message
  refetch: () => Promise<void>  // Re-run detection
}
```

## Screen States

All screens handle:
- **Unsupported platform** — EmptyState with explanation
- **Loading** — LoadingState with spinner
- **Error** — ErrorState with retry button
- **Empty** — EmptyState when no result data
- **Success** — Full detection results with findings list + rescan button

## Expo Compatibility

| Feature | Expo Go | Dev Build | EAS Build | Native Prebuild |
|---|---|---|---|---|
| Root Detection | ❌ | ✅ | ✅ | Required |
| Jailbreak Detection | ❌ | ✅ | ✅ | Required |
| Emulator Detection | ✅ | ✅ | ✅ | Not required |
| Developer Mode | ❌ | ✅ | ✅ | Required |
| Mock Location | ❌ | ✅ | ✅ | Required |

Emulator detection uses only expo-device which ships with Expo Go. All other features
require file system access, system settings introspection, or native modules that
are not available in Expo Go's sandbox.
