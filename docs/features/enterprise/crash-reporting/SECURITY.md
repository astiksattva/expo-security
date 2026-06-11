# Security — Crash Reporting

## Risks

- Crash reports may contain sensitive data in stack traces
- Error messages could leak implementation details
- Report endpoint could be exploited for data injection
- Memory inspection reveals error data

## Attack Vectors

- Stack trace leakage: Error stack reveals file paths and function names
- Data injection: Crafted errors with malicious context data
- Report flooding: Generate many errors to overload system
- Server spoofing: Man-in-the-middle on crash report endpoint

## Platform Limitations

- ErrorUtils global handler is app-scoped
- No encryption for in-memory reports
- Network requests use standard HTTPS (when configured)

## Mitigation Strategy

- Strip sensitive data from stack traces before sending
- Sanitize error messages and context
- Implement rate limiting for error capture
- Use HTTPS for crash report endpoint
- Limit report storage in memory
- Do not include user data in reports
- Implement user consent for crash reporting
- Allow users to opt out
- Review reports for sensitive data exposure
