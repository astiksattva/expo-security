# Edge Cases — Screen Casting Detection

## iOS: indistinguishable from recording

`UIScreen.isCaptured` returns `true` for both recording and casting. The
service cannot tell them apart. This is a platform limitation.

## iOS: AirPlay vs HDMI

`isCaptured` returns `true` for both AirPlay mirroring and HDMI capture.
No way to distinguish programmatically.

## Android: no standard API

Android does not provide a single unified API for detecting casting. Options:

1. **DisplayManager.DisplayListener** — detects when displays are added/removed.
   Requires `android.hardware.display` permission.
2. **MediaRouter** — detects media routing to external devices.
   Requires `android.media` permission.
3. **Presentation** — detect when a `Presentation` is showing.

None of these are wrapped by `expo-screen-capture`. A custom native module
is required.

## Wireless display protocols

- **Miracast**: Android native screen casting. Detectable via `DisplayManager`.
- **Chromecast**: Media streaming, not screen mirroring. Detectable via
  `MediaRouter` for media, but not for screen-only casting.
- **AirPlay**: iOS native. Detectable via `UIScreen.isCaptured`.

## Smart TV / casting device

If an external display is connected via HDMI, detection depends on the
platform. iOS reports it via `isCaptured`. Android requires `DisplayManager`.

## Polling interval

3-second default polling. Adjust based on sensitivity requirements.
Shorter intervals drain battery, longer intervals miss fast cast/uncast events.
