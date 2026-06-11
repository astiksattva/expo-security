# Auto Logout Expo Limitations

## Expo Go
- Full support
- AppState API available
- SecureStore available
- Timer (setInterval) works normally

## Expo Dev Builds
- Full support
- Can integrate native idle detection

## EAS Build
- Full support
- Can add background task for precise tracking

## Limitations
- Timer accuracy degrades when app is backgrounded
- iOS limits background execution
- Web support works via Page Visibility API
- No system-level idle detection (app-based only)
