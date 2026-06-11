# Root Detection — Implementation

## File Structure

```
src/modules/device-security/
├── services/rootDetectService.ts — Detection logic
├── hooks/useRootDetect.ts        — React hook
├── screens/RootDetectScreen.tsx  — Feature screen
└── demo/RootDetectDemoScreen.tsx — Demo screen
```

## Service

`rootDetectService.ts` exports two functions:

- `checkRootStatus()` — Throws on error
- `checkRootStatusSafe()` — Returns default result on error

### Root Indicator Paths

```typescript
const ROOT_INDICATORS = [
  '/system/app/Superuser.apk',
  '/sbin/su',
  '/system/bin/su',
  '/system/xbin/su',
  '/data/local/xbin/su',
  '/data/local/bin/su',
  '/system/sd/xbin/su',
  '/system/bin/failsafe/su',
  '/data/local/su',
  '/su/bin/su',
]
```

### Root Management Apps

Detected via package name patterns:
- com.noshufou.android.su (Superuser)
- eu.chainfire.supersu (SuperSU)
- com.topjohnwu.magisk (Magisk)
- com.kingroot.kinguser (KingRoot)
- And others

### Dependencies

- `expo-file-system` — File existence checks
- `expo-constants` — Build property analysis

## Hook

`useRootDetect()` follows the standard detection hook pattern:
- Returns `{ result, status, error, refetch }`
- Auto-scans on mount
- Uses `checkRootStatusSafe()` for resilience

## Screen

RootDetectScreen handles 5 states:
1. Non-Android platform — EmptyState
2. Scanning — LoadingState
3. Error — ErrorState with retry
4. No result — EmptyState
5. Complete — Shows badge, confidence level, findings list, rescan button
