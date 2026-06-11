# Force Update Security

## Attack Vectors
- **Version Spoofing**: Attacker modifies version to bypass check
- **Update URL Hijacking**: Redirect to malicious app version
- **Downgrade Attack**: Force user to older vulnerable version
- **Remote Config Poisoning**: Attacker controls min version

## Mitigation Strategies
- Sign version check responses server-side
- Use HTTPS for remote config fetch
- Cache min version locally to prevent replay
- Code obfuscation to prevent version string modification

## Best Practices
- Enforce minimum version server-side as well
- Use Firebase Remote Config with access controls
- Implement version rollback protection
- Notify users before blocking access
