# Screenshot Prevention

Prevents screenshots of sensitive screens using platform-native secure window
flags.

## How it works

Uses `expo-screen-capture`'s `preventScreenCaptureAsync()` and
`allowScreenCaptureAsync()` to toggle screen capture protection.

- **Android**: Applies `WindowManager.LayoutParams.FLAG_SECURE` to the window.
  Screenshots and screen recording show a black/empty area.
- **iOS**: Wraps the view in a secure `UITextField` that obscures content when
  the screen is being captured or recorded.

## Usage

```typescript
import { useScreenshotPrevent } from '../modules/screen-security/hooks/useScreenshotPrevent'

function MyComponent() {
  const { state, enable, disable, toggle } = useScreenshotPrevent()
  // state.isPrevented, state.available
}
```

## State

| Field | Type | Description |
|-------|------|-------------|
| `isPrevented` | `boolean` | Whether screen capture prevention is active |
| `available` | `boolean` | Whether the API is available on this device |
