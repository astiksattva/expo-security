# Root Detection — Interview Notes

## Key Concepts

| Concept | Explanation |
|---|---|
| Rooting | Gaining superuser access on Android |
| su binary | Standard Unix switch-user binary, key root indicator |
| Magisk | Modern systemless root solution |
| SuperSU | Legacy root management app |
| DM-Verity | Android verified boot that can detect system modifications |

## Architecture Questions

**Q: Why check multiple paths for su?**
A: Different rooting methods and Android versions place su in different locations.
Checking all known paths increases detection coverage.

**Q: Why use confidence levels instead of boolean?**
A: Single indicators can be false positives. Confidence levels let the app decide
how to respond based on how many indicators are found.

**Q: Why separate safe/unsafe service functions?**
A: Screens use the safe version for resilience. Services throw for non-critical
callers that need to handle errors differently.

## Expo Limitations

- No native API for root status
- File system access limited in Expo Go
- Need native build for reliable detection

## Native Alternatives

- **RootBeer** (Java/Kotlin) — Popular Android root detection library
- **SafetyNet / Play Integrity** — Google's attestation API
- **Xposed detection** — Native frameworks for app analysis

## Interview Questions

1. How would you detect root on Android without file system access?
2. How can attackers bypass root detection?
3. What's the difference between checked root and systemless root (Magisk)?
4. Why shouldn't you block users solely on root detection?
5. How would you implement server-side root verification?

## Best Practices

1. Root detection is a signal, not a gate
2. Combine multiple detection methods
3. Update detection patterns regularly
4. Use obfuscation to hide detection strings
5. Fall back gracefully when detection is unavailable
