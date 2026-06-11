# SSL Pinning Edge Cases

## Certificate Rotation
- Server certificates change regularly
- Need backup pins for smooth transition
- Monitor expiry dates of pinned certificates

## Multiple Hosts
- Different hosts may need different pins
- Wildcard certificates complicate matching
- CDN hosts may have dynamic certificates

## Network Intermediaries
- Corporate proxies with MITM certificates
- Anti-virus software that intercepts HTTPS
- Development tools (Charles, Proxyman)

## Platform Variations
- iOS: App Transport Security requirements
- Android: Certificate transparency (>=Nougat)
- Different certificate stores per platform

## Failure Modes
- No pins configured → allow all (insecure fallback)
- All pins expired → blocked until update
- Timeout during verification → reject connection
