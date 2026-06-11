# Expo Limitations

| Limitation | Detail |
|------------|--------|
| Foreground only | Background location requires `expo-task-manager` + separate config |
| No geofencing | Use `expo-task-manager` + `Location.startGeofencingAsync()` |
| Web support | Limited; uses browser Geolocation API (HTTPS required) |
| iOS Simulator | Defaults to Apple's fixed location (Cupertino) |
| Android Emulator | Requires Google Play Services for GPS |
| Accuracy control | `Accuracy.Balanced` balances power vs precision |
| No reverse geocoding | Use `Location.reverseGeocodeAsync()` separately |
