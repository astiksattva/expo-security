# Implementation — Crash Reporting

## Architecture

```
Screen → useCrashReporting() hook → Service layer → ErrorUtils + In-memory storage → Server
```

Uses React Native's `ErrorUtils` for global error handling.

## Setup

No external dependencies. Uses built-in `ErrorUtils` and `fetch`.

## Key Implementation Details

1. **Global Error Handler**: Replaces `ErrorUtils.getGlobalHandler()` with custom handler
2. **Promise Rejection**: Captured via `capturePromiseRejection()`
3. **Manual Capture**: `captureError()` for programmatic error capture
4. **Report Storage**: In-memory array with 50 report cap
5. **Server Sending**: `fetch()` to configured crash reporting endpoint
6. **Stack Trace**: Captured from `error.stack`
7. **Context**: Optional key-value context attached to reports
8. **Report ID**: Time-based + random string for unique identification

## Error Handling

- Handler installation: Failure caught and logged
- Error capture: Wrapped in try-catch to avoid infinite loops
- Server failure: Error thrown, report remains in buffer

## Testing

- Unit tests for error capture
- Tests for report storage limits
- Manual testing with simulated errors
