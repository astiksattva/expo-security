# Security — QR Scanner

## Risks

- QR codes can contain malicious URLs or data
- Camera permission exposes device camera
- Scanned data may trigger unintended actions
- QR codes can be used for phishing attacks

## Attack Vectors

- Malicious QR code: Scanned URL leads to phishing site
- Camera access: Unauthorized camera access by third-party code
- Data injection: QR code with crafted payload
- URL spoofing: QR code masks malicious URL as legitimate

## Platform Limitations

- Camera access is permission-protected on both platforms
- QR scanners cannot validate URL safety
- No built-in URL sanitization

## Mitigation Strategy

- Validate scanned URLs against allowlist
- Show confirmation dialog before opening URLs
- Never auto-execute actions from scanned data
- Request camera permission only when needed
- Release camera resources when not scanning
- Implement URL scanning for known malicious patterns
- Log all scan attempts
- Limit scan rate to prevent abuse
