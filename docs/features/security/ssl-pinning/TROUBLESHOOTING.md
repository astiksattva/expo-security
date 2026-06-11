# SSL Pinning Troubleshooting

## Common Issues

### "Certificate pin mismatch"
- Server certificate has changed
- Wrong pin configured for the host
- Network proxy is intercepting traffic

### No pins configured
- configureSslPinning was not called
- Config was cleared or reset

### Pinning not working
- Using Expo Go (native features not available)
- Platform is web (not supported)
- App Transport Security blocking on iOS

## Debugging Tips
- Log all pins during configuration
- Capture certificate hashes from actual connections
- Test with known-good and known-bad certificates
- Use a staging environment with test certificates
