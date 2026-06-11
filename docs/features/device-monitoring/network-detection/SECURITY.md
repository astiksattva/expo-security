# Security

## Risks

- **Network eavesdropping**: Service only reads connection type, not traffic
- **IP exposure**: `getIpAddressAsync()` returns device IP — avoid logging or displaying without user awareness
- **False sense of security**: `isInternetReachable` checks basic connectivity, not whether the connection is secure (MITM possible)

## Mitigations

- Never send IP address to remote servers without consent
- Do not rely solely on `isInternetReachable` for security-critical connectivity checks
- Use SSL pinning alongside network detection for secure communication validation
