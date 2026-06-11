# Interview Notes — Analytics

## Concepts

- Event-driven analytics
- Session tracking
- User properties vs event properties
- Funnels and retention analysis
- A/B testing instrumentation
- GDPR/CCPA compliance
- Data anonymization

## Architecture

```
App → trackEvent() → Buffer → flush() → Server API → Data Warehouse
```

Custom in-memory buffer with periodic server flushing.

## Expo Limitations

- No built-in analytics SDK
- Must integrate third-party or build custom
- No native analytics libraries available via Expo

## Native Alternatives

- Amplitude
- Mixpanel
- Segment
- Firebase Analytics
- PostHog (open source)
- Matomo (open source)

## Interview Questions

1. How would you design an analytics system for mobile apps?
2. What's the difference between event tracking and session tracking?
3. How do you handle analytics offline?
4. What security considerations exist for analytics data?
5. How would you implement A/B testing instrumentation?
6. What are GDPR/CCPA requirements for analytics?
7. How do you prevent analytics from impacting app performance?
8. What's the difference between client-side and server-side analytics?

## Best Practices

- Track events consistently (naming conventions)
- Avoid PII in event properties
- Implement rate limiting for event tracking
- Buffer events and flush in batches
- Queue events when offline
- Implement user opt-out
- Monitor analytics performance impact
- Create analytics dashboard for monitoring
- Document all tracked events and their properties
