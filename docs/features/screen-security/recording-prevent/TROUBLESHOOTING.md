# Troubleshooting — Screen Recording Prevention

## Recording still works after enabling

**Cause**: Same as screenshot prevention — Expo Go or missing native module.
**Fix**: Use Dev Build or EAS Build.

**Cause**: iOS external display (HDMI/AirPlay) — prevention only covers the
device screen.
**Fix**: Implement casting detection and warn users.

## Error: "Failed to prevent screen recording"

**Cause**: Native module error.
**Fix**: Rebuild native project. Verify `expo-screen-capture` is installed.

## Android FLAG_SECURE not working

**Cause**: Manufacturer-specific Android variant may ignore FLAG_SECURE.
**Fix**: Test on stock Android (Pixel, Samsung One UI). Some Chinese OEMs
(MIUI, ColorOS) may behave differently.

## iOS secure field not covering all content

**Cause**: The secure `UITextField` must be added to the top of the view
hierarchy and cover the full screen.
**Fix**: Ensure `expo-screen-capture` is managing the field correctly. If
using custom views, the module should handle positioning.

## Prevention persists after leaving screen

**Cause**: `allowScreenCaptureAsync` not called in cleanup.
**Fix**: The hook does not auto-disable on unmount. Call `disable()` in
the component's `useEffect` cleanup or `onBlur`.
