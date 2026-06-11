# Implementation — NFC

## Architecture

```
Screen → useNFC() hook → Service layer → expo-nfc
```

The hook manages NFC availability, polling state, and tag data.

## Setup

```bash
npx expo install expo-nfc
```

### iOS

Add NFC capability in Xcode:
1. Capabilities → Near Field Communication Tag Reading
2. Add `NFCReaderUsageDescription` to Info.plist

### Android

Add to `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.NFC" />
<uses-feature android:name="android.hardware.nfc" android:required="true" />
```

## Key Implementation Details

1. **Availability Check**: Uses `Nfc.isAvailableAsync()` with web platform guard
2. **Polling**: Start/stop polling with proper cleanup
3. **Tag Parsing**: Raw NFC tag data parsed into structured `NFCTag` with records
4. **Listener**: Event subscription managed with cleanup on unmount
5. **Data Formatting**: Base64-decoded NFC payload for display

## Error Handling

- Hardware unavailable: Show NFC not available state
- Polling failure: Show error with retry
- Tag read failure: Display error message

## Testing

- Requires physical device with NFC hardware
- iOS: Use NFC tag reader mode
- Android: Test with various NFC tag types
