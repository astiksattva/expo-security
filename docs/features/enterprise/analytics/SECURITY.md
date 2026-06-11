# Security — Analytics

## Risks

- Analytics data may contain sensitive user information
- Event properties could leak PII
- Server endpoint could be used for data exfiltration
- Analytics buffer in memory could be read by malicious code

## Attack Vectors

- Data injection: Malicious code adding fabricated events
- PII leakage: Screen names or properties containing user data
- Buffer reading: Memory inspection revealing event data
- Server spoofing: Man-in-the-middle on analytics endpoint

## Platform Limitations

- No built-in analytics data encryption
- Events in memory are accessible to app process
- Network requests use standard HTTPS (when configured)

## Mitigation Strategy

- Never include PII in event names or properties
- Sanitize screen names and user actions
- Use HTTPS for analytics endpoint
- Implement event data retention limits
- Add data anonymization layer
- Audit event tracking for sensitive data
- Implement user opt-out for analytics
- Store minimal necessary data
