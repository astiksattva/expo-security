# Implementation — Screenshot Prevention

## Files

| File | Purpose |
|------|---------|
| `services/screenshotPreventService.ts` | Wraps `preventScreenCaptureAsync` / `allowScreenCaptureAsync` |
| `hooks/useScreenshotPrevent.ts` | Reactive hook with state management |
| `screens/ScreenshotPreventScreen.tsx` | Full feature screen |
| `demo/ScreenshotPreventDemoScreen.tsx` | Compact demo for Dashboard |

## Service layer

```typescript
export async function preventScreenshots(): Promise<void>
export async function allowScreenshots(): Promise<void>
export async function isScreenCaptureAvailable(): Promise<boolean>
```

### Design decisions

- `isScreenCaptureAvailable()` probes the API by calling prevent + allow.
  If either throws, returns false. This avoids a dedicated availability check.
- All functions throw `FeatureError` on failure.

## Hook layer

- Calls `isScreenCaptureAvailable()` on mount via `useEffect`.
- Provides `enable()`, `disable()`, and `toggle()` actions.
- Tracks error state and loading state for each action.

## UI states

| State | Handling |
|-------|----------|
| Loading | LoadingState while actions in-flight |
| Unavailable | ErrorState "not available on this device" |
| Error | ErrorState with retry |
| Protected | Green indicator + lock icon + "Disable Protection" button |
| Not protected | Gray indicator + unlock icon + "Enable Protection" button |
