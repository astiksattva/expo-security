# Emulator Detection — Security

## Risks

| Risk | Severity | Description |
|---|---|---|
| Emulator spoofing | Medium | Faking isDevice response |
| Model string forgery | Low | Custom ROM with fake model |
| Detection reliability | Low | isDevice is reliable but not 100% |

## Attack Vectors

1. **Custom Android emulator** — Patch isDevice response
2. **iOS simulator spoof** — Modify simulator device identity
3. **Frida/GDB hooking** — Intercept expo-device native calls
4. **Custom kernel module** — Fake device properties
5. **QEMU-based emulation** — Proper hardware abstraction

## Mitigation Strategy

| Layer | Technique |
|---|---|
| Primary check | Device.isDevice (expo-device) |
| Secondary | Model/brand string matching |
| Tertiary | Build property analysis |
| Behavioral | Performance timing analysis |

## Best Practices

1. Combine with root/jailbreak detection for full picture
2. Don't block solely on emulator detection for testing
3. Use as risk signal for sensitive operations
4. Consider cloud device farm scenarios
