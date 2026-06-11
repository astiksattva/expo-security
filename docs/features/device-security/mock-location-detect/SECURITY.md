# Mock Location Detection — Security

## Risks

| Risk | Severity | Description |
|---|---|---|
| Location spoofing | High | User can fake GPS coordinates |
| Detection bypass | Medium | Rooted device hiding mock location |
| API deprecation | Medium | Android 10+ limits detection |
| False negative | Medium | Sophisticated spoofing undetected |

## Attack Vectors

1. **Developer Options** — Enable mock location app via dev settings
2. **Xposed Module** — System-level mock location (invisible to apps)
3. **Magisk Module** — Hide mock location provider
4. **Custom ROM** — Built-in location spoofing
5. **ADB commands** — Set mock location via command line
6. **Hardware GPS simulator** — External GPS signal generator

## Mitigation Strategy

| Layer | Technique |
|---|---|
| Setting check | Read ALLOW_MOCK_LOCATION (pre-Android 10) |
| Provider check | Verify active location providers |
| Behavioral | GPS signal anomaly detection |
| Server-side | Cross-reference location with IP geolocation |
| Integrity | Verify location data consistency (speed, altitude) |

## Best Practices

1. Combine multiple detection methods
2. Never rely solely on mock location flag
3. Implement server-side location validation
4. Use location data consistency checks
5. Log location anomalies for security monitoring
