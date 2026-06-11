# Session Management Interview Notes

## Key Concepts
- Access token vs refresh token
- Token expiry and refresh flow
- Secure storage (Keychain/Keystore)
- Token rotation

## Common Questions
1. Why use both access and refresh tokens?
   > Access tokens are short-lived (limited damage if stolen). Refresh tokens
   > allow seamless renewal without re-authentication.

2. How do you handle token refresh during API calls?
   > Use an interceptor/axios middleware. Queue pending requests during
   > refresh, then retry them with the new token.

3. Where should tokens be stored?
   > Secure storage (Keychain iOS, EncryptedSharedPreferences Android).
   > Never AsyncStorage, never Redux, never URL params.

4. JWT vs opaque tokens?
   > JWTs contain claims (self-validating). Opaque tokens require server
   > lookup. JWTs are common but can't be revoked server-side easily.
