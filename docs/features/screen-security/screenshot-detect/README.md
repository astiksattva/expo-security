# Screenshot Detection

Detects when a user takes a screenshot on the device and logs the event
with a timestamp.

## How it works

Uses `expo-screen-capture`'s `addScreenshotListener()` to register a callback
that fires whenever the OS detects a screenshot being taken.

- **Android**: `ContentObserver` watches media content changes.
- **iOS**: `UIApplication.userDidTakeScreenshotNotification`.
- **Web**: Not supported.

## Usage

```typescript
import { useScreenshotDetect } from '../modules/screen-security/hooks/useScreenshotDetect'

function MyComponent() {
  const { state, startListening, stopListening, reset } = useScreenshotDetect()
  // state.detected, state.timestamp, state.listenerActive
}
```

## State

| Field | Type | Description |
|-------|------|-------------|
| `detected` | `boolean` | Whether a screenshot has been detected |
| `timestamp` | `number \| null` | Epoch ms when screenshot was taken |
| `listenerActive` | `boolean` | Whether the listener is currently active |
