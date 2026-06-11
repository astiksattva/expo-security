# Security — NFC

## Risks

- NFC tags can be rewritten with malicious data
- Proximity-based sniffing of tag data
- NFC spoofing (cloning tags)
- Unauthorized tag reading in background

## Attack Vectors

- Tag spoofing: Clone a legitimate NFC tag with malicious payload
- Data injection: Write malicious NDEF data to tag
- Proximity attack: Read tag data without user awareness
- Replay attack: Capture and replay NFC communication

## Platform Limitations

- iOS: NFC reading requires explicit user action (app foreground)
- Android: Background NFC reading possible (intent dispatch)
- Both platforms: No built-in tag authentication

## Mitigation Strategy

- Validate all NFC tag data before processing
- Implement tag authentication using cryptographic signatures
- Use encrypted NDEF records for sensitive data
- Limited scan window to prevent continuous reading
- Never auto-execute actions from NFC data
- Log NFC read attempts for auditing
- Implement rate limiting for NFC reads
- Require user confirmation for NFC-triggered actions
