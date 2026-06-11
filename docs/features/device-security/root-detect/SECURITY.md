# Root Detection — Security

## Risks

| Risk | Severity | Description |
|---|---|---|
| Detection bypass | High | Rooted user hides indicators |
| False negative | High | App trusts compromised device |
| False positive | Medium | Legitimate user blocked |
| Binary tampering | Medium | Detection code itself modified |

## Attack Vectors

1. **File Hiding** — Root hiding tools (Magisk Hide, Riru) hide su binaries
2. **Name Obfuscation** — Renaming su binary to bypass path checks
3. **Kernel Module** — Kernel-level rootkits invisible to user-space checks
4. **Runtime Patching** — Hooking detection functions with Frida/Xposed
5. **File System Spoofing** — Custom kernel that fakes file system responses

## Mitigation Strategy

| Layer | Technique |
|---|---|
| File checks | Check multiple paths, update list frequently |
| Package checks | Detect root management apps |
| Behavioral | Monitor for unusual app behavior |
| Server-side | Combine with device fingerprinting |
| Obfuscation | Obfuscate detection code strings |
| Integrity | Verify APK signature at runtime |

## Platform Limitations

- Android's security model restricts app-to-app introspection
- No API to query root status directly
- File system permissions vary by OEM and Android version

## Best Practices

1. Never block solely based on root detection — use as risk signal
2. Combine with jailbreak, emulator, and dev mode checks
3. Implement server-side verification for critical operations
4. Regular updates to detection indicators
5. Graceful degradation if detection fails
