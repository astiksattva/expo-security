# Jailbreak Detection — Interview Notes

## Key Concepts

| Concept | Explanation |
|---|---|
| Jailbreak | Removing iOS security restrictions to gain root access |
| Sandbox | iOS security mechanism isolating apps from system + each other |
| MobileSubstrate | Framework for runtime code injection (Cydia Substrate) |
| Rootless jailbreak | iOS 15+ jailbreaks without modifying root filesystem |
| Checkra1n | Bootrom exploit jailbreak (iPhone 5s-X) |

## Architecture Questions

**Q: Why check sandbox write?**
A: A jailbroken device allows writing to system directories. This behavioral check
catches jailbreaks that hide their file artifacts.

**Q: Why 30+ file paths?**
A: Different jailbreak tools create different artifacts. Exhaustive path coverage
maximizes detection across jailbreak methods and iOS versions.

**Q: How does URL scheme detection work?**
A: `Linking.canOpenURL('cydia://')` returns true if Cydia is installed. This doesn't
require file system access.

## Expo Limitations

- No native jailbreak detection API
- File system access blocked in Expo Go
- Cannot access IOKit or kernel-level diagnostics

## Native Alternatives

- **DTTJailbreakDetection** — Obj-C jailbreak detection
- **IOSSecuritySuite** — Swift jailbreak detection
- **FreeRDP** — Sandbox escape detection
- **Apple App Attest** — Server-side device attestation

## Interview Questions

1. How would you detect rootless jailbreaks?
2. What's the difference between tethered, semi-tethered, and untethered jailbreaks?
3. How can attackers bypass jailbreak detection?
4. Why integrate with server-side attestation?
5. How would you detect a jailbreak without file system access?
