# Security — Screenshot Prevention

## Risk assessment

| Risk | Severity | Mitigation |
|------|----------|------------|
| FLAG_SECURE bypass via rooted device | High | Combine with root detection and remote wipe |
| Accessibility service bypass | Medium | Detect enabled accessibility services |
| iOS screenshot via physical camera | Low | Cannot mitigate — physical photography |
| ADB screen recording bypass | Medium | FLAG_SECURE prevents ADB screencap on Android |

## Attack vectors

1. **Rooted Android**: Root access can remove `FLAG_SECURE` from the window.
   Must pair with root detection.
2. **Jailbroken iOS**: Tweak injection can bypass secure text field.
   Must pair with jailbreak detection.
3. **Physical camera**: An attacker can photograph the screen with another
   device. No technical mitigation exists for this.
4. **External display**: Content may leak if not using HDMI with HDCP.
   Casting detection can alert on this.

## Defense in depth

- Enable screenshot prevention on all sensitive screens.
- Combine with screenshot detection for audit logging.
- Add device integrity checks (root/jailbreak/emulator).
- Implement remote session invalidation on detected compromise.

## Compliance

- **PCI DSS**: Screenshot prevention on cardholder data screens is recommended.
- **HIPAA**: PHI screens should use prevention.
- **GDPR**: Personal data screens should be protected from capture.
