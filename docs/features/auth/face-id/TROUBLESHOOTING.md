# Troubleshooting

## Common Issues

### Face ID Dialog Doesn't Appear
- `NSFaceIDUsageDescription` missing from Info.plist
- **Fix:** Add usage description string
- **Expo:** Set in `app.json` under `ios.infoPlist`

### "Face ID Not Available" on Simulator
- Simulator may have Face ID disabled
- **Fix:** Hardware > Face ID > Enrolled
- **Check:** Simulator > Features > Face ID

### Face ID Keeps Failing
- Poor lighting conditions
- Obstructions (mask, sunglasses, hat)
- Device angle not optimal
- **Fix:** Reposition device, remove obstructions

### App Store Rejection
- Missing `NSFaceIDUsageDescription`
- **Fix:** Add usage description explaining why Face ID is used

## iOS-Specific

- **iPhone X/XS/XR/11/12/13/14/15/16** — All support Face ID
- **iPhone SE (all generations)** — No Face ID
- **iPad Pro (2018+)** — Some models support Face ID
- **iPad mini, iPad Air** — No Face ID
- **iPod touch** — No Face ID

## Debugging

```typescript
// Check supported authentication types
const types = await LocalAuthentication.supportedAuthenticationTypesAsync()
console.log('Support facial recognition:', types.includes(
  LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
))
```
