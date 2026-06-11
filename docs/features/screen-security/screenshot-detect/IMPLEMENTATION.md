# Implementation — Screenshot Detection

## Files

| File | Purpose |
|------|---------|
| `services/screenshotDetectService.ts` | Wraps `addScreenshotListener` / `remove` |
| `hooks/useScreenshotDetect.ts` | Reactive hook with state management |
| `screens/ScreenshotDetectScreen.tsx` | Full feature screen |
| `demo/ScreenshotDetectDemoScreen.tsx` | Compact demo for Dashboard |

## Service layer

```typescript
export function subscribeToScreenshots(callback: ScreenshotCallback): Subscription
export function unsubscribeFromScreenshots(subscription: Subscription | null): void
```

### Error handling

- Wraps all calls in try/catch.
- Throws `FeatureError` with `featureId: 'screenshot-detect'`.
- Uses `logError` from `src/utils/errors.ts`.

## Hook layer

- `subscriptionRef` holds the active `Subscription` for cleanup.
- `useEffect` cleanup calls `unsubscribeFromScreenshots` on unmount.
- `startListening` unsubscribes any existing subscription before creating a new one.
- `reset` clears the detected flag and timestamp.

## UI states

| State | Handling |
|-------|----------|
| Loading | `LoadingState` during listener startup |
| Error | `ErrorState` with retry callback |
| Empty (active) | "No screenshots detected" with instructions |
| Empty (inactive) | "Tap 'Start Listening' to begin" |
| Success | Event card with timestamp and clear button |
