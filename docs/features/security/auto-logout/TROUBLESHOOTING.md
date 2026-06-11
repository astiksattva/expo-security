# Auto Logout Troubleshooting

## Common Issues

### Timer not starting
- Monitor already running
- Auto logout disabled in config
- AppState listener not registered

### Timer doesn't stop
- stopAutoLogoutMonitor not called on unmount
- Multiple timer instances created

### Warning not showing
- warningShown flag already set
- Warning period exceeds timeout
- Config not applied before starting

### User timed out incorrectly
- Last activity not recorded on interaction
- Device clock changed between checks
- Background time counted incorrectly

## Debugging Tips
- Log timeRemaining on each tick
- Verify lastActivity timestamp storage
- Check AppState change events
- Test with short timeouts (10s) for quick verification
