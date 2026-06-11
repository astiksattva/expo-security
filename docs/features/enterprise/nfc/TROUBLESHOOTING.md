# Troubleshooting — NFC

## Common Issues

### NFC not detected as available
**Cause**: Device lacks NFC hardware or NFC is disabled
**Solution**: Check device specifications, enable NFC in Settings

### Tags not being read
**Cause**: Tag not in range, incompatible tag type, or polling not active
**Solution**: Move tag closer, try different tag type, ensure polling is active

### iOS: NFC permission not requested
**Cause**: NFC capability not configured in Xcode
**Solution**: Add NFC Tag Reading capability in Xcode

### Android: NFC not working
**Cause**: NFC disabled in Settings or permission not granted
**Solution**: Enable NFC in Settings → Connected devices → NFC

## Debug Methods

- Check NFC hardware status in device Settings
- Monitor console logs for `[nfc]` tag
- Verify NFC antenna position for device
- Test with known working NFC tags

## Known Working Tag Types

- NDEF formatted tags (NTAG213/215/216, Mifare Ultralight)
- Type 2, Type 4 tags
- Mifare Classic (limited support)
