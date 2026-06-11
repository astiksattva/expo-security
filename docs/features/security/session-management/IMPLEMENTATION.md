# Session Management Implementation

## Architecture

- Tokens stored in expo-secure-store (encrypted at rest)
- SessionToken: accessToken, refreshToken, expiresAt, tokenType
- SessionStatus: isValid, expiresAt, timeRemaining, needsRefresh
- Configurable refresh threshold (default 5 minutes)

## Flow

1. Login → storeSession(token)
2. App launch → getSessionStatus() → check expiry
3. Before API call → isSessionValid() → refresh if needed
4. Token near expiry → refreshSession(refreshFn)
5. Logout → clearSession()

## Key Decisions

- Separate access token and refresh token storage
- Configurable refresh threshold to avoid mid-request expiry
- Session status computed from stored values, not state
- Error handling returns null/status objects, never throws
