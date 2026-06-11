# SSL Pinning Implementation

## Architecture

- `SslPinningConfig` holds an array of `CertificatePin` objects
- Each pin associates a host with a SHA-256/SHA-1 hash
- `verifyCertificatePin` checks if any pin for the host matches
- In-memory configuration (no persistence needed)
- `react-native-quick-crypto` for hash generation

## Flow

1. App starts → configure pins for trusted hosts
2. Before network request → get server certificate hash
3. Compare hash against configured pins for that host
4. Match → allow connection; Mismatch → block/report

## Production Notes

For real SSL pinning in production:
- Use `react-native-ssl-pinning` or `okhttp` on Android
- Use `TrustKit` or `AFNetworking` on iOS
- Bundle certificate hashes at build time
- Support pin rotation with backup pins
- Never hardcode single pins (use at least 2)
