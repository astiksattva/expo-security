# Screen Recording Detection

Detects when the screen is being recorded. iOS only (native API). On Android,
use screenshot prevention as a workaround.

## How it works

On iOS, uses `UIScreen.isCaptured` property (bridged via
`expo-screen-capture`'s `isCapturedAsync`). The hook polls this value at a
configurable interval (default 2s) to detect recording state changes.

- **iOS**: `UIScreen.isCaptured` returns `true` when screen is being recorded
  or mirrored.
- **Android**: No native equivalent. Recording detection is not available.
- **Web**: Not supported.

## Usage

```typescript
import { useRecordingDetect } from '../modules/screen-security/hooks/useRecordingDetect'

function MyComponent() {
  const { state, startPolling, stopPolling, refresh } = useRecordingDetect()
  // state.isRecording, state.available
}
```

## State

| Field | Type | Description |
|-------|------|-------------|
| `isRecording` | `boolean` | Whether recording is currently detected |
| `available` | `boolean` | Whether the API is available on this platform |
