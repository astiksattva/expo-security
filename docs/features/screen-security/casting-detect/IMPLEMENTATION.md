# Implementation — Screen Casting Detection

## Files

| File | Purpose |
|------|---------|
| `services/castingDetectService.ts` | Wraps `isCapturedAsync` and platform checks |
| `hooks/useCastingDetect.ts` | Reactive hook with polling + details |
| `screens/CastingDetectScreen.tsx` | Full feature screen |
| `demo/CastingDetectDemoScreen.tsx` | Compact demo for Dashboard |

## Service layer

```typescript
export async function checkCastingStatus(): Promise<CastingDetectionResult>
export function isCastingDetectionAvailable(): boolean
export function getCastingDetectionMethods(): string[]
```

### Platform handling

- iOS: attempts `isCapturedAsync`. Returns detailed message about status.
- Android: returns unavailable with advice about native modules needed.
- Details are surfaced in the UI for debugging.

## Hook layer

- Polls every 3 seconds (`POLL_INTERVAL`).
- Maintains `details` state for diagnostic messages.
- Cleanup on unmount.

## UI states

| State | Handling |
|-------|----------|
| Loading | LoadingState |
| Unavailable | EmptyState with feature explanation + native module advice |
| Error | ErrorState with retry |
| Idle | "No Casting" with green indicator |
| Casting detected | "Casting Detected" with red indicator |
