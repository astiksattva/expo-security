# Force Update Expo Limitations

## Expo Go
- Full support for version reading
- nativeApplicationVersion available
- expoConfig.version available
- Update check is conceptual (no app store redirect)

## Expo Dev Builds
- Full support
- Can integrate app store review APIs

## EAS Build
- Full support
- Can check EAS Update metadata for OTA updates

## Limitations
- Cannot programmatically trigger App Store/Play Store update
- No built-in remote config (requires Firebase or custom API)
- Version format depends on how app.json is configured
- TestFlight builds may report different versions
