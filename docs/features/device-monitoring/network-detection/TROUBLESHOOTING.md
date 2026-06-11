# Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| `isInternetReachable` always null | Web platform or old expo-network version | Upgrade expo-network; on web, use alternative check |
| Type returns `unknown` | New network type not mapped | Update `mapNetworkType` switch |
| Listener not cleaning up | Component unmount without cleanup | Verify `useEffect` returns cleanup function |
| Error on Android emulator | Emulator network quirks | Test on physical device |
