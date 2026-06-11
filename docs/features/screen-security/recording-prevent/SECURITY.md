# Security — Screen Recording Prevention

## Risk assessment

| Risk | Severity | Mitigation |
|------|----------|------------|
| Rooted device bypass | High | Root detection + remote wipe |
| iOS external display leak | Medium | Physical security / casting detection |
| Jailbreak bypass | High | Jailbreak detection |
| Accessibility bypass | Medium | Accessibility service detection |

## Attack vectors

1. **Rooted Android**: Root can unset `FLAG_SECURE`. Detection + remote
   session invalidation is the only defense.
2. **Jailbroken iOS**: Tweak injection can hook `UITextField` to expose
   secure content.
3. **External camera**: Physical camera pointing at screen — no software
   mitigation.
4. **HDMI capture**: External display output can be captured via hardware
   HDMI recorder. Use HDCP if possible.

## Defense layers

1. Enable recording prevention on all sensitive screens.
2. Add recording detection for rapid alerting.
3. Implement device integrity checks.
4. Add remote session termination on compromise.

## Compliance

- **PCI DSS 4.0**: Requirement 4.2.1 — cardholder data must not be recorded.
- **SOC 2**: Recording prevention supports data confidentiality.
- **HIPAA**: ePHI screens should be protected from recording.
