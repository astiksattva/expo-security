# Troubleshooting — Screenshot Prevention

## Screenshot still works after enabling

**Cause**: Expo Go does not support `expo-screen-capture`.
**Fix**: Use Dev Build or EAS Build.

**Cause**: Android — `FLAG_SECURE` not applied to the correct window.
**Fix**: Ensure the hook is mounted in the screen component. Prevention is
per-window in Android.

**Cause**: iOS — secure text field not covering content.
**Fix**: Verify the view hierarchy. The secure field must be on top.

## Error: "Failed to prevent screenshots"

**Cause**: Native module error or platform limitation.
**Fix**:
1. `npx expo install expo-screen-capture`
2. Rebuild native project.
3. Check device OS version (Android 5+ / iOS 12+ required).

## isScreenCaptureAvailable returns false

**Cause**: Not running on a physical device or unsupported OS version.
**Fix**: Test on Android 5+ or iOS 12+ physical device.

## Prevention state resets on navigation

**Cause**: The hook state resets when the component unmounts.
**Fix**: Use a global store (Zustand) to persist prevention state across
screens, or re-enable in each sensitive screen's `useEffect`.

## Black screen in production

**Cause**: Prevention was left enabled on a non-sensitive screen.
**Fix**: Always call `allowScreenshots()` in cleanup (`useEffect` return)
or when navigating away from sensitive screens.
