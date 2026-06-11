# Edge Cases — Screenshot Prevention

## Prevent called multiple times

Calling `preventScreenCaptureAsync` multiple times is safe. The system
maintains a reference count or simply re-applies the flag. The hook prevents
redundant calls by checking `isPrevented` state.

## Allow called when not prevented

`allowScreenCaptureAsync` while prevention is not active is safe. The system
ignores the call if `FLAG_SECURE` is not set.

## App backgrounded

`FLAG_SECURE` persists while the app is in the background on Android. On iOS,
the secure text field overlay is managed per-view and remains active.

## App killed

Prevention state does not persist across app restarts. The hook defaults to
`isPrevented: false` on mount. Re-enable prevention after cold start.

## Screen orientation change

`FLAG_SECURE` is a window-level property and survives orientation changes.
No re-application needed.

## Keyboard appearance

On Android, the soft keyboard appearing does not affect `FLAG_SECURE`.
On iOS, the secure text field overlay behavior is unaffected.

## Multiple screens

Prevention is per-window (Android) or per-view (iOS). Each screen must
individually enable prevention. The hook is designed for component-level use.

## Accessibility services

On Android, accessibility services can bypass `FLAG_SECURE` in some versions.
Combine with runtime check for accessibility services if this is a concern.
