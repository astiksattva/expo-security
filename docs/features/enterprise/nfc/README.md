# NFC

Read NFC tags using `expo-nfc`.

## Features

- Check NFC hardware availability
- Start/stop NFC tag polling
- Read NFC tag data
- Parse tag records
- Display tag type and tech info

## Expo Compatibility

| Environment | Support |
|-------------|---------|
| Expo Go | No |
| Development Build | Yes |
| EAS Build | Yes |
| Native Prebuild Required | Yes |

## Platform Support

| Platform | Support |
|----------|---------|
| iOS | Yes (iOS 13+) |
| Android | Yes (Android 4.4+) |
| Web | No |

## API

### Services

- `isNFCAvailable()` — Check if NFC hardware is available
- `startNFCPolling()` — Start listening for NFC tags
- `stopNFCPolling()` — Stop NFC tag polling
- `parseNfcTag(tag)` — Parse NFC tag into structured format
- `addNfcTagListener(handler)` — Listen for NFC tag discoveries
- `formatNfcData(raw)` — Decode base64-encoded NFC data

### Hooks

- `useNFC()` — NFC state management

### Types

- `NFCReadResult` — Parsed NFC record
- `NFCTag` — Full parsed NFC tag
