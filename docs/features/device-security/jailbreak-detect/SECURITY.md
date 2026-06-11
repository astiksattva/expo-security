# Jailbreak Detection — Security

## Risks

| Risk | Severity | Description |
|---|---|---|
| Bypass via tweaks | High | Jailbreak detection bypass tweaks exist |
| Sandbox analysis | Medium | Write test detectable by jailbreak tools |
| False sense of security | Medium | Single detection method insufficient |

## Attack Vectors

1. **Detection Bypass Tweak** — Liberty Lite, A-Bypass, Shadow
2. **File System Hiding** — HideJB tweak hides jailbreak files
3. **Substrate Disable** — Disabling MobileSubstrate in safe mode
4. **Kernel Patch** — Patching sandbox enforcement
5. **Frida Injection** — Runtime hooking of detection functions

## Mitigation Strategy

| Layer | Technique |
|---|---|
| File checks | Check 30+ paths, update frequently |
| Sandbox test | Verifies system integrity |
| Obfuscation | Encrypt file paths, use string obfuscation |
| Multiple passes | Run checks at different times |
| Integrity check | Verify code signature at runtime |
| Server validation | Cross-reference with device attestation |

## Best Practices

1. Combine file, sandbox, and behavioral detection
2. Never hard-code detection strings in binary
3. Run detection at multiple points in the app lifecycle
4. Use as risk signal, not absolute gate
5. Regular updates to detection patterns
