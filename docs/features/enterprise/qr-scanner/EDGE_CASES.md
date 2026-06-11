# Edge Cases — QR Scanner

## iOS Variations

- Camera permission prompt appears once; subsequent calls check status
- iOS simulator cannot access camera (camera not available)
- iPad supports camera but with different UI
- Some iOS devices have better low-light performance

## Android Variations

- Camera permission can be revoked while app is running
- Different camera hardware across devices
- Some Android brands have custom camera APIs
- Android Studio emulator cannot access camera without host webcam

## Offline Mode

- QR scanning works entirely offline
- No network required for scanning or parsing
- Permission check works offline

## Permission Denied

- User denies camera permission → Show camera permission denied state
- Permission revoked in Settings → App detects on next scan attempt
- iOS: Only one prompt; must go to Settings to change

## Hardware Unsupported

- iOS simulator: Camera not available
- Android emulator: Camera may not be available
- Web: Camera requires HTTPS and browser permission

## OS Version Limitations

- iOS 11+ for barcode scanning via AVFoundation
- Android 5+ (API 21+) for barcode scanning
- Web: Camera API available in modern browsers

## Edge Cases

- Scanning in low light conditions
- Damaged or blurry QR codes
- Very large or very small QR codes
- QR codes at extreme angles
- Multiple QR codes in frame
- Scanning from screen reflection
