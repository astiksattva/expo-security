# Root Detection — Edge Cases

## Android Variations

| Issue | Impact | Mitigation |
|---|---|---|
| File system permissions | Some paths may not be readable | Try-except per path; fallback to safe result |
| Su binary renamed | Attacker renames su to hide | Also check for busybox, common tools |
| Custom ROMs | Different file system layout | Cover all standard su paths |
| Systemless root (Magisk) | No su in standard paths | Detect Magisk Manager app package |
| Android 11+ scoped storage | Limited file access | Rely on app-based detection |
| OEM rooting | Different indicators | Update indicator list periodically |

## Offline Mode

All detection is local — no network required. Works fully offline.

## Permission Denied

- File system checks silently fail per-path (try-except)
- No special permissions required for detection

## OS Version Limitations

- Android 4.4+ covered by su path checks
- Android 10+ may hide /system from some file APIs
- Android 11+ scoped storage limits file access

## False Positives

- Some enterprise MDM solutions may trigger detection
- Custom ROMs like LineageOS may appear rooted (they have su access)
- Debug builds may be flagged

## False Negatives

- Attacker can hide root with Magisk Hide or similar
- Kernel-level rootkits invisible to app-level checks
- OTA root methods leave no file traces
