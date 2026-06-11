# Security — Deep Linking

## Risks

- Malicious URLs can lead to phishing or data injection
- Deep links can bypass authentication flows
- URL scheme conflicts with other apps

## Attack Vectors

- URL injection: Malicious deep link with crafted payload
- Scheme hijacking: Another app registers same URL scheme
- Open redirect: Deep link redirects to malicious site
- Parameter manipulation: Tampered query parameters

## Platform Limitations

- iOS: Custom scheme URLs are app-specific but can be claimed by any app
- Android: Intent filters can be intercepted by multiple apps
- Both platforms show app chooser for ambiguous URLs

## Mitigation Strategy

- Validate and sanitize all deep link parameters
- Never pass sensitive data in deep link URLs
- Implement URL allowlisting for external URLs
- Use universal/app links instead of custom schemes (production)
- Verify URL ownership with digital asset links (Android)
- Implement session validation for deep link flows
- Log suspicious deep link attempts
- Rate limit deep link processing
