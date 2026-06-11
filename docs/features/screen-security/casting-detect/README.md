# Screen Casting Detection

Detects when the device screen is being cast or mirrored to an external
display.

## How it works

- **iOS**: Uses `UIScreen.isCaptured` (same as recording detection) via
  `expo-screen-capture`'s `isCapturedAsync`. This detects AirPlay mirroring
  and HDMI capture.
- **Android**: Requires a custom native module. Can use `DisplayManager`'s
  `DisplayListener` or `MediaRouter` to detect external displays. Not
  implemented in the current service layer.

## Usage

```typescript
import { useCastingDetect } from '../modules/screen-security/hooks/useCastingDetect'

function MyComponent() {
  const { state, startPolling, stopPolling } = useCastingDetect()
  // state.isCasting, state.available
}
```

## State

| Field | Type | Description |
|-------|------|-------------|
| `isCasting` | `boolean` | Whether casting/mirroring is detected |
| `available` | `boolean` | Whether the API is available on this platform |
