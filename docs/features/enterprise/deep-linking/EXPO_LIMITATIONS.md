# Expo Limitations — Deep Linking

## Expo Go

- Full deep linking support
- Custom scheme URLs work
- Universal/app links not supported

## Development Build

- Full deep linking support
- Universal links with associated domains
- Custom schemes work

## EAS Build

- Full deep linking support
- Universal links and app links configuration

## Native Prebuild Required

No — `expo-linking` works without prebuild

## Known Limitations

- No built-in deep link validation
- Cannot register custom scheme without native config (app.json handles this)
- Universal links require server-side configuration
- `canOpenURL` has limitations on iOS (limited to schemes in Info.plist)
- No built-in support for deep link queuing
- Web deep linking differs from mobile
