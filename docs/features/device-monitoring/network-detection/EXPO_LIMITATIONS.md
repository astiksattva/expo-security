# Expo Limitations

| Limitation | Detail |
|------------|--------|
| Web: isInternetReachable | Always null on web; use `navigator.onLine` as fallback |
| iOS Simulator | Reports connected even when host has no internet |
| No Wi-Fi SSID | expo-network does not expose SSID (use `expo-wifi` separately) |
| No bandwidth/speed | No API for connection speed or latency |
| Background monitoring | Listener may be delayed when app is backgrounded |
