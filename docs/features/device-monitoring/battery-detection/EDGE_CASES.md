# Edge Cases

| Case | Behavior |
|------|----------|
| No battery (desktop/web) | `getBatteryLevelAsync` may throw or return 1.0 |
| Battery removed (Android) | Returns -1 on some devices |
| Fast charging | State transitions: unplugged → charging → full |
| Low power mode toggle | Separate event channel on iOS only |
| Level = 0 | Device may shut down immediately |
| Level = null | Some simulators return null |
| iOS simulator | Returns fixed value (e.g., 0.5) |
| Web | Not supported entirely |
