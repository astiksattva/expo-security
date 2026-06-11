# Interview Notes — Crash Reporting

## Concepts

- Error boundaries (React)
- Global error handlers (ErrorUtils)
- Stack traces and symbolication
- Native vs JS crashes
- Crash analytics (Sentry, Crashlytics)
- Unhandled promise rejections
- Error reporting lifecycle

## Architecture

```
Error → ErrorUtils handler → captureError() → Buffer → sendCrashReport() → Server
```

Uses React Native's ErrorUtils for JS error interception.

## Expo Limitations

- Cannot capture native crashes (native SDKs required)
- No symbolication (would need source maps + server)
- Basic error reporting only (no breadcrumbs, sessions)

## Native Alternatives

- Sentry (react-native-sentry)
- Firebase Crashlytics
- Bugsnag
- Instabug
- Rollbar

## Interview Questions

1. How does React Native handle errors at the app level?
2. What's the difference between JS crashes and native crashes?
3. How do error boundaries work in React?
4. How would you implement a crash reporting system?
5. What are the limitations of ErrorUtils compared to Sentry?
6. How do you handle unhandled promise rejections?
7. What information should a crash report include?
8. How do you prevent crash reporting from causing infinite loops?

## Best Practices

- Initialize crash reporting early in app lifecycle
- Capture both JS errors and promise rejections
- Include relevant context with each report
- Limit report frequency to avoid flooding
- Allow users to opt out of crash reporting
- Strip PII from error reports
- Test crash reporting in development
- Monitor crash reporting performance
- Use a production-grade crash reporting service
- Implement source map uploading for symbolication
