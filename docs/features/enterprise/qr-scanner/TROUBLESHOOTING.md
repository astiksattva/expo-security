# Troubleshooting — QR Scanner

## Common Issues

### Camera not opening
**Cause**: Camera permission not granted
**Solution**: Check permission status and request again

### QR code not detected
**Cause**: Poor lighting, blurry code, or code too far/small
**Solution**: Ensure good lighting, hold steady, move closer

### Camera shows black screen
**Cause**: Camera not available on simulator/emulator
**Solution**: Test on physical device

### Permission prompt doesn't appear
**Cause**: Permission already determined
**Solution**: Reset permission in Settings (iOS) or App Info (Android)

## Debug Methods

- Check camera permission status in logs
- Verify CameraView is rendered in view hierarchy
- Test with known working QR codes
- Monitor `onBarcodeScanned` callback firing
