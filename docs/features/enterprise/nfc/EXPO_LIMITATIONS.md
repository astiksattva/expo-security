# Expo Limitations — NFC

## Expo Go

- NFC not supported in Expo Go
- Requires native module configuration

## Development Build

- NFC is supported with native prebuild
- Requires `expo-nfc` module to be installed

## EAS Build

- NFC supported with proper native module configuration

## Native Prebuild Required

Yes — `expo-nfc` requires native prebuild (npx expo prebuild)

## Known Limitations

- No background NFC tag reading (iOS limitation)
- No NDEF write support (expo-nfc limitation)
- Limited tag type support
- No support for proprietary tag formats
- Cannot read payment NFC (Secure Element)
- No support for peer-to-peer NFC
- No support for NFC card emulation
- iOS: Only foreground reading, no background dispatch
- Android: Limited to common NDEF formats
