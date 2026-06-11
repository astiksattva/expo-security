# Implementation — Screen Recording Detection

## Files

| File | Purpose |
|------|---------|
| `services/recordingDetectService.ts` | Wraps `isCapturedAsync` and platform checks |
| `hooks/useRecordingDetect.ts` | Reactive hook with polling |
| `screens/RecordingDetectScreen.tsx` | Full feature screen |
| `demo/RecordingDetectDemoScreen.tsx` | Compact demo for Dashboard |

## Service layer

```typescript
export async function checkRecordingStatus(): Promise<RecordingDetectionResult>
export function isRecordingDetectionAvailable(): boolean
export function getDetectionStatus(): string
```

### Platform handling

- iOS: attempts `isCapturedAsync` from `expo-screen-capture`.
- Android: returns `method: 'unavailable'`.
- All errors are caught and logged.

## Hook layer

- Polls every 2 seconds via `setInterval` when polling is active.
- `refresh` performs a single check.
- Cleanup via `clearInterval` on unmount.

## UI states

| State | Handling |
|-------|----------|
| Loading | LoadingState while first-time check runs |
| Unavailable | EmptyState with platform explanation |
| Error | ErrorState with retry |
| Idle | "No recording detected" with green indicator |
| Recording detected | "Recording Detected" with red indicator |
