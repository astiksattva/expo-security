# Interview Notes — QR Scanner

## Concepts

- QR code structure and encoding
- Barcode symbologies (QR, Code 128, etc.)
- Camera access and permissions
- AVFoundation (iOS) and CameraX/Camera2 (Android)
- Real-time image processing
- Barcode detection algorithms

## Architecture

```
CameraView → onBarcodeScanned callback → Parse → Display
```

Expo's CameraView handles the camera lifecycle and barcode detection internally.

## Expo Limitations

- Limited barcode scanner configuration
- No access to raw camera frames
- No manual focus or exposure control
- Performance depends on Expo's implementation

## Native Alternatives

- react-native-camera-kit
- react-native-vision-camera (with MLKit frame processor)
- Native AVFoundation / CameraX directly
- MLKit barcode scanning

## Interview Questions

1. How does barcode scanning work in mobile apps?
2. What's the difference between QR code and barcode formats?
3. How do you handle camera permissions?
4. What security risks do QR codes pose?
5. How would you implement scanning from saved images?
6. How do you ensure reliable barcode detection?
7. What performance considerations exist for camera scanning?
8. How does Expo's CameraView differ from react-native-camera-kit?

## Best Practices

- Always check and request camera permission
- Show clear scan area guidance
- Auto-stop scanning after detection
- Validate scanned data before processing
- Support manual code entry as fallback
- Handle low-light conditions
- Provide haptic feedback on scan
