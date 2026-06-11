# Device Binding Interview Notes

## Key Concepts
- Device fingerprinting vs device binding
- Platform identifiers (IDFV, AAID, IMEI - deprecated)
- Session hijacking prevention
- Hardware-backed attestation

## Common Questions
1. Why use IDFV vs IDFA?
   > IDFV is consistent across apps from same vendor. IDFA is for ads,
   > can be reset by user, and requires ATT permission.

2. Is device binding enough for security?
   > No — it's a layer of defense. Combine with server-side checks,
   > biometric auth, and anomaly detection.

3. What happens when a user gets a new phone?
   > Server-side binding must support unbind/re-bind flow. Send
   > verification email/SMS to authorize new device.

4. Android ID vs SafetyNet Attestation?
   > Android ID identifies the device. SafetyNet attests the device
   > integrity (not rooted, bootloader locked). Use both for
   > production security.
