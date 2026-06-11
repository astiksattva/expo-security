# Developer Mode Detection — Troubleshooting

## Always Shows "Disabled" When Developer Mode Is On

1. SettingsManager may not reflect all settings changes immediately
2. ADB may be disabled even though developer mode is on
3. Check if `expo-intent-launcher` is installed
4. Some OEMs hide developer options behind different settings keys

## SettingsManager Not Available

1. This is a native module that requires a native build
2. Will not work in Expo Go
3. Ensure a development build is being used

## False Positive

1. Some apps enable the dev menu flag for debugging
2. MDM solutions may enable developer settings
3. ADB may be enabled by OEM for system updates

## Debugging

Use `console.log` to trace what each check finds:
```
[dev-mode-detect] SettingsManager available: true
[dev-mode-detect] ADB enabled: true
[dev-mode-detect] Dev menu enabled: true
```

## Expo Go

Developer mode detection will not work in Expo Go.
