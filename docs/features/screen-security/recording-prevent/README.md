# Screen Recording Prevention

Prevents screen recording of sensitive content using secure window flags.

## How it works

Uses the same underlying API as Screenshot Prevention:
`expo-screen-capture`'s `preventScreenCaptureAsync()`.

- **iOS**: Secure `UITextField` overlay hides content during recording.
- **Android**: `FLAG_SECURE` prevents screen recording at the window level.

## Usage

```typescript
import { useRecordingPrevent } from '../modules/screen-security/hooks/useRecordingPrevent'

function MyComponent() {
  const { state, enable, disable, toggle } = useRecordingPrevent()
}
```

## State

| Field | Type | Description |
|-------|------|-------------|
| `isPrevented` | `boolean` | Whether recording prevention is active |
| `available` | `boolean` | Whether the API is available on this platform |

## Platform notes

- **iOS**: Prevents recording of the app window. External display output
  (HDMI/ AirPlay) may still leak content.
- **Android**: `FLAG_SECURE` prevents both screenshots and recording.
  Cannot be bypassed without root access.
