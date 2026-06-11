# Edge Cases — Deep Linking

## iOS Variations

- Universal Links require associated domain setup
- Custom scheme URLs might be blocked by other apps
- iOS 13+ changed how scene delegate handles URLs
- Simulator supports custom scheme deep links

## Android Variations

- App links require digital asset links verification
- Multiple apps may handle same intent — app chooser appears
- Android 12+ requires exported activity for deep links
- Different OEMs handle deep links differently

## Offline Mode

- Deep link parsing works offline
- URL resolution requires network for universal/app links
- Custom scheme deep links work offline

## Permission Denied

- Not applicable — deep links don't require permissions
- `canOpenURL` may return false for some schemes on iOS

## Hardware Unsupported

- Not applicable — deep linking is software-based

## OS Version Limitations

- iOS 9+ for universal links
- Android 6+ (API 23+) for app links
- All OS versions support custom scheme deep links

## Edge Cases

- Deep link with special characters in query params
- Deep link with missing or malformed URL
- Rapid succession of deep links
- Deep link to unregistered route
