# Edge Cases — Screen Recording Detection

## Polling interval

Default 2-second interval is a balance between responsiveness and battery.
Adjust via the `POLL_INTERVAL` constant in the hook. Shorter intervals drain
more battery.

## Recording starts between polls

The polling approach means there is up to a 2-second delay between recording
start and detection. For real-time detection, use
`UIScreen.capturedDidChangeNotification` via a native module.

## False positives

`UIScreen.isCaptured` returns `true` for both recording AND mirroring/casting.
The service cannot distinguish between them at the native level.

## False negatives

On some iOS versions, `isCaptured` may not update immediately when recording
stops. The polling approach mitigates this.

## Android fallback

Android does not expose recording state. The service returns
`method: 'unavailable'`. Documentation suggests using screenshot prevention
(FLAG_SECURE) as a workaround for recording protection.

## iOS Simulator

`UIScreen.isCaptured` returns `false` always on simulator. Only physical
devices report correct values.

## Control Center recording

iOS Control Center screen recording starts with a 3-second countdown.
`isCaptured` becomes `true` as soon as the countdown begins, not when
recording actually starts.
