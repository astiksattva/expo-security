# Crash Reporting

Capture and report app crashes.

## Features

- Global error handler installation
- Unhandled promise rejection capture
- Manual error capture with context
- In-memory crash report storage
- Server report sending
- Report count and log display
- Stack trace capture
- Error handler restoration

## Expo Compatibility

| Environment | Support |
|-------------|---------|
| Expo Go | Yes |
| Development Build | Yes |
| EAS Build | Yes |
| Native Prebuild Required | No |

## Platform Support

| Platform | Support |
|----------|---------|
| iOS | Yes |
| Android | Yes |
| Web | Yes |

## API

### Services

- `initializeCrashReporting()` — Install global error handler
- `captureError(error, context?)` — Manually capture an error
- `capturePromiseRejection(event)` — Capture promise rejection
- `sendCrashReport(report)` — Send report to server
- `getStoredReports()` — Get all stored reports
- `clearReports()` — Clear stored reports
- `getReportCount()` — Get report count
- `restoreOriginalErrorHandler()` — Restore original handler

### Hooks

- `useCrashReporting()` — Crash reporting state management

### Types

- `CrashReport` — Crash report data structure
