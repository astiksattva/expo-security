# Interview Notes

## Key Talking Points

- `expo-location` abstracts iOS `CLLocationManager` and Android `FusedLocationProviderClient`
- Permission model distinguishes denied vs blocked (critical UX)
- `watchPositionAsync` uses platform-native callbacks (no JS polling)

## Common Questions

**Q**: How does location work on WiFi-only iPads?
**A**: Uses WiFi positioning (IP-based) with very low accuracy (~km).

**Q**: Can you get location when app is killed?
**A**: Not with this setup. Requires `expo-task-manager` background geolocation.

**Q**: What's the power cost of `watchPositionAsync`?
**A**: `Balanced` accuracy at 5s/10m is reasonable; `High` accuracy uses GPS continuously.

**Q**: iOS 14+ approximate location?
**A**: User can grant "approximate" instead of "precise". Check `coords.accuracy`.
