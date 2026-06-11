# Session Management Test Cases

## Unit Tests
1. Store session → get session → returns same values
2. Store session → check status → isValid is true
3. Store expired session → check status → isValid is false
4. Clear session → get session → returns null

## Session Status
5. Session just created → needsRefresh = false
6. Session near expiry (within threshold) → needsRefresh = true
7. No session → status returns isValid = false

## Refresh Flow
8. Refresh with valid refresh token → new tokens stored
9. Refresh with null session → returns null
10. Refresh with expired session → returns null

## Edge Cases
11. Empty string tokens
12. Very long expiry times (overflow)
13. Negative timeRemaining
14. Concurrent read/write operations
