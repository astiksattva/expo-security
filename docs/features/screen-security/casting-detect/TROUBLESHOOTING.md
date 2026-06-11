# Troubleshooting — Screen Casting Detection

## Casting not detected on iOS

**Cause**: Testing on simulator.
**Fix**: Use physical iOS device.

**Cause**: `isCapturedAsync` not available.
**Fix**: Check `expo-screen-capture` version. If removed, implement native
module for `UIScreen.capturedDidChangeNotification`.

## Casting not detected on Android

**Expected**. Android detection requires a custom native module that monitors
`DisplayManager` and `MediaRouter`. Current service returns unavailable.

## iOS: AirPlay mirroring detected as "recording"

This is by design. `UIScreen.isCaptured` returns `true` for both. The service
surface this limitation in the UI.

## Polling reports false positive

**Cause**: iOS device with HDMI connected triggers `isCaptured`.
**Fix**: This is correct behavior — HDMI connection does expose the screen.

## Details show "isCapturedAsync not available"

**Cause**: `expo-screen-capture` version mismatch.
**Fix**: Install the correct version: `npx expo install expo-screen-capture`.
If the method is truly removed, implement a custom native module.

## How to implement Android native module

Create an Expo module (`expo-modules-core`) with:

```kotlin
// CastingDetectionModule.kt
class CastingDetectionModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("CastingDetection")
        Events("onCastingChanged")
        
        Function("isCasting") {
            val displayManager = appContext.reactContext?.getSystemService(DISPLAY_SERVICE) as DisplayManager
            val displays = displayManager.displays
            displays.any { it.displayId != Display.DEFAULT_DISPLAY }
        }
    }
}
```
