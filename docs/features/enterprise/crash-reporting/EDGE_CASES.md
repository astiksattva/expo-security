# Edge Cases — Crash Reporting

## iOS Variations

- Error handling works consistently on iOS
- No platform-specific crash reporting variations

## Android Variations

- Error handling works consistently on Android
- Android may have stricter limits on error stack traces

## Offline Mode

- Reports are stored in-memory while offline
- Server sending fails gracefully when offline
- Reports persist in memory until app restart

## Permission Denied

- Not applicable — crash reporting doesn't require permissions

## Hardware Unsupported

- Not applicable — crash reporting is software-based

## OS Version Limitations

- No OS limitations for ErrorUtils-based crash reporting

## Edge Cases

- Recursive error in error handler (infinite loop protection)
- Very large stack traces
- Errors thrown during initialization
- Errors in async code without promise rejection
- Multiple rapid errors
- Error with no stack trace
- Error during report sending
- App killed before report send completes
- Memory pressure from many stored reports
- Concurrent error captures
