# Implementation — Deep Linking

## Architecture

```
Screen → useDeepLinking() hook → Service layer → expo-linking
```

The hook listens for incoming deep links and captures the initial URL.

## Setup

```bash
npx expo install expo-linking
```

### iOS

Configure URL scheme in `app.json`:

```json
{
  "expo": {
    "scheme": "exp-security-lab"
  }
}
```

### Android

Configure intent filters in `android/app/src/main/AndroidManifest.xml` (auto-configured for Expo).

## Key Implementation Details

1. **Cold Start**: `getInitialURL()` captures the URL that launched the app
2. **Warm Start**: Event listener fires when deep link arrives while app is open
3. **Parsing**: `Linking.parse()` extracts path, query params, and fragments
4. **Expo Router**: `getLinkingConfig()` returns config for Expo Router's linking setup

## Error Handling

- Invalid URL: Parse failure caught and error displayed
- Unsupported URL: `canOpenURL` check before opening
- No initial URL: Handled gracefully (returns null)

## Testing

- iOS: `xcrun simctl openurl booted <url>`
- Android: `adb shell am start -W -a android.intent.action.VIEW -d <url>`
- Web: Click links with app scheme
