# Mock Location Detection — Implementation

## File Structure

```
src/modules/device-security/
├── services/mockLocationDetectService.ts — Detection logic
├── hooks/useMockLocationDetect.ts        — React hook
├── screens/MockLocationDetectScreen.tsx  — Feature screen
└── demo/MockLocationDetectDemoScreen.tsx — Demo screen
```

## Service

`mockLocationDetectService.ts` exports:
- `checkMockLocationStatus()` — Throws on error
- `checkMockLocationStatusSafe()` — Returns default on error

### Detection Methods

```typescript
// 1. SettingsManager check
SettingsManager.settings['mock_location']

// 2. expo-location provider check
const providers = await Location.getProviderStatusAsync()
providers.mockLocationProvider

// 3. ContentResolver (native module)
ContentResolver.querySecureSetting('mock_location')

// 4. Developer options
UIManager.getConstants().extra['mockLocation']
```

### Key Detail: Android 10+ Behavior

On Android 10 (API 29), Google deprecated `ALLOW_MOCK_LOCATION`. Apps targeting
API 29+ can no longer read this setting directly. The service compensates by:
- Checking the location provider status directly
- Using ADB status as proxy
- Checking developer options flags

## Dependencies

- `expo-location` — Provider status check
- `react-native SettingsManager` — System settings access

## No Confidence Scoring

Returns boolean based on any positive indicator.
