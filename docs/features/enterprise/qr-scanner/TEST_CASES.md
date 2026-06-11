# Test Cases — QR Scanner

## Unit Tests

| Test | Description |
|------|-------------|
| Camera permission granted | Mock permission as granted, verify true |
| Camera permission denied | Mock permission as denied, verify false |
| Parse scan result | Mock barcode result, verify structured output |
| QR code detection | Mock QR type result, verify isQRCode returns true |
| Non-QR detection | Mock non-QR type, verify isQRCode returns false |
| Supported types | Verify list includes all common barcode formats |

## Integration Tests

| Test | Description |
|------|-------------|
| Scan flow | Start scanning → Scan QR → Receive result → Auto-stop |
| Permission then scan | Grant permission → Start camera → Scan → Success |
| Deny permission | Deny permission → Start → Show error → Retry |

## Manual Test Cases

| Scenario | Steps |
|----------|-------|
| Scan QR code | Tap "Start Scanning" → Point at QR code → Verify data appears |
| Rescan | Scan one code → Tap "Scan Again" → Scan another → Verify update |
| Deny permission | Deny camera permission → Verify error state → Tap Retry |
| Non-QR barcode | Point at non-QR barcode → Verify it's detected (if supported) |
| Low light | Scan QR code in dim environment → Verify detection |
| Web browser | Test on Chrome/Safari → Verify camera access works |
