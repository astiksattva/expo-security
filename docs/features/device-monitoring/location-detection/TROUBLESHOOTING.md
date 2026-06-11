# Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Location never resolves | GPS disabled in device settings | Show "Enable Location" system prompt |
| Permission status 'blocked' | User tapped "Don't Allow" twice | Direct user to Settings app |
| iOS: only get coarse location | iOS 14+ approximate location | Check `coords.accuracy`; request precise |
| Location returns stale data | No GPS fix yet | Increase `timeInterval` or wait for better signal |
| High battery drain | Continuous watching too frequent | Use larger `distanceInterval` and `timeInterval` |
