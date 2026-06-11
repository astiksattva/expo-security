# SSL Pinning Interview Notes

## Key Concepts
- Certificate pinning vs public key pinning
- HPKP (HTTP Public Key Pinning) - deprecated, use static pinning
- MITM attack prevention
- Pin rotation strategy

## Common Questions
1. Why can't we do SSL pinning in JavaScript?
   > Network requests go through native layers; JS only sees already-verified
   > connections. True pinning requires native interception.

2. What happens when a pinned certificate expires?
   > App must be updated with new pins. Backup pins mitigate this.

3. SSL pinning vs certificate transparency?
   > Pinning trusts specific certs; CT logs all certs for public audit.
   > They complement each other.

4. How do you handle proxy environments?
   > Allow-list known corporate proxies or disable pinning per environment.
