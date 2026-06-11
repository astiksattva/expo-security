# Device Binding Test Cases

## Unit Tests
1. Bind device → get binding info → returns valid binding
2. Bind device → verify binding → isVerified = true
3. Unbind device → verify → isBound = false
4. Verify without binding → isBound = false

## Identifier Tests
5. getDeviceId returns non-null on native
6. getDeviceId returns consistent value across calls
7. getDeviceId returns null on web

## Edge Cases
8. Bind twice → verify still passes
9. Unbind when not bound → no error
10. Binding with empty token string
11. Multiple rapid bind/unbind cycles

## Integration
12. Configure requireBinding → verify flow
13. Configure verifyOnLaunch → verify on status check
14. Binding persists across simulated app restart
