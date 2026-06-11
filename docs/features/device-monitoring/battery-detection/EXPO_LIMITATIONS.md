# Expo Limitations

| Limitation | Detail |
|------------|--------|
| Web | Not supported, no polyfill |
| Low power mode (Android) | Not available; iOS only |
| Level precision | Returns float 0-1, but granularity varies by platform |
| No temperature | expo-battery does not expose battery temperature |
| No health info | Cannot report battery health/max capacity |
| No power source info | Cannot distinguish AC vs USB charging |
