# Force Update Edge Cases

## Version Formats
- Semantic (1.0.0) vs non-semantic (1.0)
- Build numbers instead of version names
- Pre-release versions (1.0.0-beta)
- Version strings with 'v' prefix

## Remote Config Failures
- Network unavailable → can't fetch min version
- Remote server down → app should allow access
- Malformed version string → parse error
- Stale cached version → wrong comparison result

## Update Flow
- User dismisses update → infinite loop
- Update released but not on store yet
- User on unsupported OS version
- Enterprise app distribution (side-loading)

## Platform
- iOS: App Store approval delays version availability
- Android: Play Store staged rollouts
- OTA updates (expo-updates) vs native updates
- TestFlight vs production versions
