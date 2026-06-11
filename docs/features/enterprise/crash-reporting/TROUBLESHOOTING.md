# Troubleshooting — Crash Reporting

## Common Issues

### Errors not being captured
**Cause**: Crash reporting not initialized
**Solution**: Call `initializeCrashReporting()` before expecting error capture

### Crash reports not visible
**Cause**: Reports cleared on app restart (in-memory)
**Solution**: Reports only persist during app session; add persistence for production

### Global handler conflict
**Cause**: Another library may have replaced the error handler
**Solution**: Ensure crash reporting is initialized after other error handlers

### Send report fails
**Cause**: Network unavailable or server error
**Solution**: Check network, verify crash report endpoint

## Debug Methods

- Monitor console logs for `[crash-reporting]` tag
- Check report count after capturing errors
- Verify error handler is installed with `ErrorUtils.getGlobalHandler()`
- Test with known errors in try-catch blocks
