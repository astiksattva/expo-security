# Interview Notes

## Key Talking Points

- Expo's `expo-network` provides cross-platform network state detection with zero native config
- Supports 7+ network types: WiFi, Cellular, VPN, Ethernet, Bluetooth, None, Other
- Event-driven updates via `addNetworkStateListener` — no polling needed
- Works in Expo Go on iOS/Android

## Common Questions

**Q**: How does expo-network detect VPN?
**A**: iOS: checks `isVpn` flag; Android: checks `ConnectivityManager` transport type.

**Q**: Can it detect metered connections?
**A**: No. expo-network does not expose metered flag. Use `expo-constants` for carrier info.

**Q**: What about bandwidth estimation?
**A**: Not available. Use fetch-based latency checks for approximate speed.
