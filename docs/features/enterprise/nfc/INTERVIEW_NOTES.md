# Interview Notes — NFC

## Concepts

- Near Field Communication (NFC) technology
- NDEF (NFC Data Exchange Format)
- NFC tag types (1-5)
- Peer-to-peer mode vs Reader/writer mode vs Card emulation
- NFC vs RFID vs Bluetooth
- ISO 14443, ISO 15693 standards
- MiFare, Felica, and other tag families

## Architecture

```
NFC Tag → NFC Controller → OS NFC Stack → expo-nfc → App
```

expo-nfc wraps the platform NFC APIs (CoreNFC on iOS, android.nfc on Android).

## Expo Limitations

- expo-nfc has limited functionality compared to native SDKs
- No background tag reading (especially iOS)
- No tag writing support
- Limited tag format support
- Requires native prebuild

## Native Alternatives

- react-native-nfc-manager
- Native CoreNFC (iOS) / android.nfc (Android)
- Flutter NFC plugins

## Interview Questions

1. How does NFC technology work?
2. What are the different NFC tag types and their uses?
3. What's the difference between NFC and Bluetooth?
4. How does NDEF data format work?
5. What security risks exist with NFC?
6. How does iOS handle NFC differently from Android?
7. What are NFC use cases in enterprise apps?
8. How would you implement NFC tag writing?

## Best Practices

- Always check NFC availability before starting polling
- Handle polling lifecycle carefully (start/stop)
- Clean up NFC listeners on unmount
- Validate tag data before display
- Support multiple tag types
- Provide clear feedback during polling
- Handle rapid tag scans gracefully
- Document supported tag types
