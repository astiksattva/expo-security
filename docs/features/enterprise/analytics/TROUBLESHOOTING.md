# Troubleshooting — Analytics

## Common Issues

### Events not appearing in log
**Cause**: Events not tracked or buffer cleared
**Solution**: Verify `trackEvent` is called, check buffer state

### Flush fails
**Cause**: Network unavailable or server error
**Solution**: Check network connectivity, verify server endpoint

### Event count doesn't match
**Cause**: Race condition in tracking
**Solution**: Check for concurrent track calls in code

### Events lost after app restart
**Cause**: Events are in-memory only
**Solution**: Implement persistence layer for production analytics

## Debug Methods

- Monitor console logs for `[analytics]` tag
- Check event buffer count
- Verify flush network request in network monitor
- Track events with identifiable properties for debugging
