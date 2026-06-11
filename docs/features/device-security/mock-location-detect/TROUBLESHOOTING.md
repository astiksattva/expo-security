# Mock Location Detection — Troubleshooting

## Always Shows "Secure" When Mock Location Is On

1. Android 10+ — ALLOW_MOCK_LOCATION is deprecated and not readable
2. Check if mock location app is configured in developer options
3. Verify expo-location is properly installed
4. Ensure location services are enabled on the device

## Cannot Detect Fake GPS on Android 10+

1. This is expected — Google deprecated the mock location setting
2. Detection relies on location provider status instead
3. Enable mock location app in developer options → some apps trigger detection
4. Use the location provider check as primary indicator

## App Crashes When Checking

1. expo-location may not be installed
2. Run `npx expo install expo-location`
3. Check that development build includes expo-location native module

## False Positive on Development Device

1. ADB enabled appears as mock location indicator
2. This is an indirect signal, not definitive
3. Consider this a "risk signal" rather than hard detection

## Expo Go

Mock location detection will not work in Expo Go.
