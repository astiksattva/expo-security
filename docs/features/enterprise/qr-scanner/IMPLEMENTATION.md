# Implementation — QR Scanner

## Architecture

```
Screen → useQRScanner() hook → Service layer → expo-camera CameraView
```

The hook manages camera permission, scanning state, and scan results.

## Setup

```bash
npx expo install expo-camera
```

### iOS

Add NSCameraUsageDescription to `ios/{project}/Info.plist`:

```xml
<key>NSCameraUsageDescription</key>
<string>This app uses the camera to scan QR codes.</string>
```

### Android

Camera permission is auto-configured with Expo.

## Key Implementation Details

1. **Camera Permission**: Checked on start scanning; shows error if denied
2. **Scan Lock**: Prevents multiple scans of same code (`isScannedRef`)
3. **Auto-Stop**: Scanning stops automatically after first successful scan
4. **CameraView**: Uses `expo-camera`'s CameraView with `onBarcodeScanned` prop
5. **Result Parsing**: Raw barcode data parsed into structured `ScanResult`

## Error Handling

- Permission denied: Show error with retry button
- Camera unavailable: Display appropriate error
- Scan failure: Show generic error state

## Testing

- Unit tests for permission check
- Manual testing with QR codes (generate at qr-code-generator.com)
- Test on physical device for camera access
