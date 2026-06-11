# Device Binding Troubleshooting

## Common Issues

### Device ID is null
- Running on web (not supported)
- Simulator/emulator without proper config
- Permission denied for device identifiers

### Binding verification fails
- Device was reset/factory reset
- App was reinstalled (IDFV changed)
- Different device than when bound

### Can't bind device
- SecureStore unavailable
- Missing expo-application peer dependency
- Platform not supported (web)

## Debugging Tips
- Log the device ID at bind time
- Compare stored vs current device ID during verify
- Test on physical device, not just simulator
- Check expo-application documentation for ID stability
