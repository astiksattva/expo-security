# Interview Notes — Screenshot Prevention

## Common questions

### How does Android screenshot prevention work?

Android uses `WindowManager.LayoutParams.FLAG_SECURE`. When set on a window,
the system refuses to capture its content in screenshots and screen recordings.
The captured area appears black or empty.

### Why can't you prevent screenshots on web?

Web browsers deliberately do not expose an API to prevent screenshots because
it would violate user control. The browser cannot distinguish between a
screenshot and the user simply looking at the screen.

### What happens if a user takes a photo of the screen with another device?

Nothing can prevent this. It's a physical attack vector that no software can
mitigate. Watermarking or screen overlays may help identify leakers.

### How does iOS prevention differ?

iOS uses a `UITextField` with `isSecureTextEntry = true`. This field, when
added to the view hierarchy, causes the system to hide its contents during
screen capture/recording. This is the same mechanism used for password fields.

### Does this affect app performance?

No. `FLAG_SECURE` is a window flag — it's a single integer property set on
the window. The secure text field approach in iOS is a view-level property.
No ongoing computation is involved.

### Can you prevent screenshots on a per-view basis on Android?

No — `FLAG_SECURE` is a window-level property on Android. All views in the
window are either protected or not. For per-view protection, consider
obscuring specific content programmatically (e.g., blurring).

### How would you persist prevention state?

```typescript
import { useAppStore } from '../store/appStore'

// When enabling:
useAppStore.getState().setScreenshotPrevented(true)

// On app start:
const persisted = useAppStore.getState().isScreenshotPrevented
if (persisted) {
  await preventScreenshots()
}
```

Store the boolean in Zustand or SecureStore for persistence.
