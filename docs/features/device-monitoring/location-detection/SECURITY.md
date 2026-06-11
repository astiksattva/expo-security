# Security

## Risks

- **Location tracking**: GPS coordinates are sensitive PII; continuous watching creates a tracking trail
- **Permission misuse**: Requesting foreground only; background tracking requires user-facing rationale
- **Spatial inference**: Altitude + accuracy can reveal user's floor in a building

## Mitigations

- Only request location on explicit user action (grant button)
- Never persist location data without consent
- Avoid continuous watching by default — require user opt-in
- Clear location data when user logs out
- Respect iOS 14+ approximate location toggle
- Do not send coordinates over unsecured HTTP
