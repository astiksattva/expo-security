# Edge Cases — Screen Recording Prevention

## Shared API with screenshot prevention

On both platforms, the same API call prevents both screenshots and recording.
Enabling recording prevention also prevents screenshots, and vice versa.

## iOS external displays

`preventScreenCaptureAsync` on iOS only protects the device screen. Content
mirrored to an external display (HDMI, AirPlay) may still be visible. There
is no API to block external display output from JavaScript.

## Android multi-window

`FLAG_SECURE` applies to the entire window, including split-screen and
picture-in-picture modes. Content in all window states is protected.

## iOS secure text field limitation

The secure text field approach only works when the app is in the foreground.
If the app is backgrounded while recording is active, the system snapshot
may capture content. Override `UIApplication`'s snapshot behavior in native
code for complete protection.

## Device sleep

When the device sleeps, the screen is blank. No recording prevention is
needed in this state.

## iOS 17+

Apple may change the secure text field behavior. Monitor iOS release notes
for changes to `UITextField.isSecureTextEntry` behavior.
