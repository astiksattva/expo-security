# SSL Pinning Security

## Attack Vectors
- **MITM Attack**: Fake certificate presented by attacker
- **Pin Bypass**: Debugging frameworks that hook network calls
- **Reverse Engineering**: Pins extracted from binary
- **Downgrade Attack**: Attacker forces fallback to unpinned endpoint

## Mitigation Strategies
- Use at least 2 backup pins per host
- Rotate pins before certificate expiry
- Obfuscate pin values in the binary
- Implement certificate transparency checks
- Pin to the public key, not the certificate

## Platform Limitations
- iOS: ATS can interfere with custom pinning
- Android: Network security config can override
- Both: System certificate stores differ
