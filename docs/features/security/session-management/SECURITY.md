# Session Management Security

## Attack Vectors
- **Token Theft**: Secure store extracted via rooted device
- **Token Replay**: Stolen token used from another device
- **Refresh Token Abuse**: Stolen refresh token generates new tokens
- **Session Fixation**: Attacker sets known token

## Mitigation Strategies
- Store tokens in expo-secure-store (hardware-backed on supported devices)
- Use short-lived access tokens (15-60 min)
- Use longer-lived refresh tokens with rotation
- Implement token binding to device ID
- Monitor for token reuse anomalies

## Best Practices
- Never log tokens
- Clear tokens on biometric auth change
- Token rotation on every refresh
- Revoke tokens server-side on logout
