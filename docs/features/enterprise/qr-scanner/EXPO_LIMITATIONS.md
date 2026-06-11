# Expo Limitations — QR Scanner

## Expo Go

- Camera access works in Expo Go
- Barcode scanning via CameraView
- Limited to QR and common barcode types

## Development Build

- Full camera and barcode scanning support
- Custom barcode scanner settings
- Camera configuration options

## EAS Build

- Full support
- Production-level camera access

## Native Prebuild Required

No — `expo-camera` works without prebuild

## Known Limitations

- No manual camera controls (focus, exposure)
- Limited barcode format configuration
- CameraView might have performance issues on low-end devices
- No support for scanning from image files
- Camera flash control is limited
- No continuous scanning mode (single scan per callback)
- Web camera requires HTTPS
