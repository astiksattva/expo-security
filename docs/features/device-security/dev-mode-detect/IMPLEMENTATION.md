# Developer Mode Detection — Implementation

## File Structure

```
src/modules/device-security/
├── services/devModeDetectService.ts — Detection logic
├── hooks/useDevModeDetect.ts        — React hook
├── screens/DevModeDetectScreen.tsx  — Feature screen
└── demo/DevModeDetectDemoScreen.tsx — Demo screen
```

## Service

`devModeDetectService.ts` exports two functions:
- `checkDevModeStatus()` — Throws on error
- `checkDevModeStatusSafe()` — Returns default on error

### Detection Methods

```typescript
// 1. Settings Manager check
SettingsManager.settings['mock_location']
SettingsManager.settings['adb_enabled']

// 2. Intent Launcher check
IntentLauncher.startActivityAsync(
  'android.settings.APPLICATION_DEVELOPMENT_SETTINGS',
)

// 3. Dev menu check
UIManager.getConstants().extra['enableDevMenu']

// 4. Build property analysis
expo-constants android.package + expo-application androidId
```

### Why Multiple Checks

No single API directly indicates "developer mode enabled". The service aggregates
multiple indirect signals to form a detection verdict.

## Dependencies

- `expo-intent-launcher` — Intent availability checks
- `expo-application` — Build property access
- `react-native SettingsManager` — System settings access
- `react-native UIManager` — Dev menu detection

## No Confidence Scoring

Returns boolean based on any positive indicator. All indicators are considered
equally valid signals of developer mode.
