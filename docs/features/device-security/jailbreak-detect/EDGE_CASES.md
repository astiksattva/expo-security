# Jailbreak Detection — Edge Cases

## iOS Variations

| Issue | Impact | Mitigation |
|---|---|---|
| iOS 14+ sandbox tightening | Write test may fail on old jailbreaks | Combine with file checks |
| Semi-tethered jailbreak | Some files may not persist | Check persistent paths |
| Rootless jailbreak (iOS 15+) | Files stored in different locations | Detect via sandbox escape |
| Checkra1n / Palera1n | Bootrom exploit, harder to detect | Behavioral detection |
| TrollStore | Doesn't leave typical traces | Permasigning app detection |

## Offline Mode

All detection is local — no network required.

## Permission Denied

- File system checks use try-except per path
- No special entitlements required for read-only checks
- Sandbox write test may be blocked on secure devices (expected)

## OS Version Limitations

- iOS 12-13: File checks work reliably
- iOS 14+: Some paths may be restricted
- iOS 15+ rootless: Traditional files may not exist
- iOS 16+: Further sandbox hardening

## False Positives

- MDM solutions may place files in suspicious paths
- Enterprise certificates may trigger scheme detection
- Developer devices with SSH enabled

## False Negatives

- Rootless jailbreaks leave fewer traces
- Jailbreak detection bypass tweaks
- KTRR/KPP protection prevents some file modifications
