# Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| State not updating | Missing `addEventListener` cleanup | Ensure subscription is removed on unmount |
| Time accumulation wrong | Race condition in state transition | Review `backgroundStartTime` logic |
| `inactive` state confusing | iOS-only brief state | Handle as "still foreground" for most cases |
| Web: state always `active` | Web AppState has limited support | Use `document.visibilitychange` as web fallback |
| Multiple listeners | Component renders multiple times | Ensure `useEffect` dependency array is stable |
