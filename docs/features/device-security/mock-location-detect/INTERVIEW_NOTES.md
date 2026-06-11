# Mock Location Detection — Interview Notes

## Key Concepts

| Concept | Explanation |
|---|---|
| Mock location | Android feature to spoof GPS coordinates for testing |
| ALLOW_MOCK_LOCATION | Settings.Secure flag (deprecated API 29+) |
| Mock location app | Third-party app that provides fake coordinates |
| Location provider | Android component delivering location data |
| ADB mock location | Command-line GPS spoofing via `adb emu geo` |

## Architecture Questions

**Q: Why is mock location detection important?**
A: Apps like ride-sharing, banking, geo-fencing, and location-based authentication
need trusted location data. Mock locations enable fraud and abuse.

**Q: Why was ALLOW_MOCK_LOCATION deprecated?**
A: Google moved mock location to developer options only, requiring physical access
to enable. This trades off detection ability for security.

**Q: How does fake GPS differ from VPN-based location spoofing?**
A: Mock location spoofs the GPS hardware. VPN changes IP geolocation only. Mock
location is harder to detect without device-level checks.

## Expo Limitations

- Cannot read ALLOW_MOCK_LOCATION on Android 10+
- Limited to location provider check in Expo Go
- Requires full native build for reliable detection

## Native Alternatives

- **Android LocationManager** — Direct mock location query
- **Google Play Services** — FusedLocationProvider mock detection
- **SafetyNet/Play Integrity** — Server-side verification

## Interview Questions

1. How does mock location differ from GPS spoofing via hardware?
2. What changed with mock location detection in Android 10?
3. How can you detect mock location server-side?
4. What are the limitations of client-side mock location detection?
5. How would you implement a location consistency check?
