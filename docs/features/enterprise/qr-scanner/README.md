# QR Scanner

Scan QR codes using `expo-camera`.

## Features

- QR code scanning via device camera
- Camera permission management
- Multiple barcode format support
- Auto-stop after scan
- Scanned data display

## Expo Compatibility

| Environment | Support |
|-------------|---------|
| Expo Go | Yes |
| Development Build | Yes |
| EAS Build | Yes |
| Native Prebuild Required | No |

## Platform Support

| Platform | Support |
|----------|---------|
| iOS | Yes |
| Android | Yes |
| Web | Yes |

## API

### Services

- `checkCameraPermission()` — Check and request camera permission
- `parseScanResult(result)` — Parse barcode scanning result
- `isQRCode(result)` — Check if result is QR code type
- `getSupportedBarcodeTypes()` — List all supported barcode formats

### Hooks

- `useQRScanner()` — QR scanner state management

### Types

- `ScanResult` — Scanned barcode data structure
