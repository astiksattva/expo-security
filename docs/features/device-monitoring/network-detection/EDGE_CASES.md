# Edge Cases

| Case | Behavior |
|------|----------|
| No network hardware | `isConnected` returns `false`, type is `none` |
| Airplane mode | `isConnected` = false, `type` = none |
| VPN active | type reported as `vpn` (expo-network supports VPN detection) |
| Slow internet | `isInternetReachable` may be `null` while checking |
| Ethernet (Android TV) | type = `ethernet` |
| Bluetooth tethering | type = `bluetooth` |
| Permission denied | Does not require permissions on iOS/Android |
| Listener not called | Ensure subscription cleanup to prevent memory leaks |
| Web platform | Limited: `isInternetReachable` may always be null |
