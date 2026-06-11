# Root Detection — Troubleshooting

## Always Shows "Secure" on Rooted Device

1. Check that `expo-file-system` is installed
2. Verify the rooted device has su binary at one of the checked paths
3. Magisk Hide may be hiding root — disable it
4. File system API may be restricted (Android 11+)

## App Crashes on Detection

1. Ensure all dependencies are installed
2. Check for missing native modules
3. Test with `checkRootStatusSafe()` instead of `checkRootStatus()`

## False Positive on Unrooted Device

1. Some custom ROMs have su access — this is technically a true positive
2. MDM software may install system-level binaries
3. Debug builds will show dev mode indicators

## Expo Go

Root detection will not work in Expo Go. Use a development build / EAS Build.

## Logging

Set `console.log` level to debug to see detection steps:
```
[root-detect] Checking path: /system/xbin/su
[root-detect] Error checking path: ...
```
