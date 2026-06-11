# Expo Limitations — Crash Reporting

## Expo Go

- Full crash reporting support via ErrorUtils
- Can capture and report errors

## Development Build

- Full support

## EAS Build

- Full support

## Native Prebuild Required

No — crash reporting uses built-in ErrorUtils

## Known Limitations

- In-memory storage: Reports lost on app restart
- No native crash reporting (native crashes not captured)
- No symbolication of minified stack traces
- No automatic promise rejection handling (requires explicit setup)
- No breadcrumb tracking for crash context
- No session replay or user interaction timeline
- No crash grouping or deduplication
- No production crash reporting service (Sentry/Crashlytics)
- No native crash signal handling (SIGSEGV, etc.)
- ErrorUtils only captures JS errors, not native crashes
