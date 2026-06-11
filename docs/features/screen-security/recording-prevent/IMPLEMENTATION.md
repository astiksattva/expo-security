# Implementation — Screen Recording Prevention

## Files

| File | Purpose |
|------|---------|
| `services/recordingPreventService.ts` | Wraps `preventScreenCaptureAsync` with recording-specific naming |
| `hooks/useRecordingPrevent.ts` | Reactive hook |
| `screens/RecordingPreventScreen.tsx` | Full feature screen |
| `demo/RecordingPreventDemoScreen.tsx` | Compact demo for Dashboard |

## Service layer

```typescript
export async function preventRecording(): Promise<void>
export async function allowRecording(): Promise<void>
export function isRecordingPreventionAvailable(): boolean
```

### Design decisions

- Reuses `expo-screen-capture`'s `preventScreenCaptureAsync` — the same
  API prevents both screenshots and recording.
- Separate service for semantic clarity and future platform divergence.
- `isRecordingPreventionAvailable` returns `true` for both iOS and Android.

## Hook layer

- Identical pattern to `useScreenshotPrevent`.
- Provides `enable`, `disable`, `toggle`.
- Tracks error and loading states.

## UI states

| State | Handling |
|-------|----------|
| Loading | LoadingState |
| Unavailable | EmptyState with platform explanation |
| Error | ErrorState with retry |
| Protected | "Enabled" with green indicator |
| Not protected | "Disabled" with gray indicator |
