# SSL Pinning

Certificate pinning for secure network communication. Compares certificate
hashes against a configured set of trusted pins to detect MITM attacks.

## Files

- `src/modules/security/types/index.ts` - CertificatePin, SslPinningConfig, SslPinningResult
- `src/modules/security/services/sslPinningService.ts` - pin management, verification logic
- `src/modules/security/hooks/useSslPinning.ts` - React hook wrapping the service
- `src/modules/security/screens/SslPinningScreen.tsx` - full feature screen
- `src/modules/security/demo/DemoSslPinningScreen.tsx` - demo screen for Expo Go

## Usage

```typescript
import { configureSslPinning, verifyCertificatePin } from '../services/sslPinningService'

await configureSslPinning({
  pins: [{ host: 'api.example.com', hash: '...', algorithm: 'sha256' }],
})

const result = await verifyCertificatePin('api.example.com', '...')
console.log('Pin valid:', result.isValid)
```

## Limitations

- Real SSL pinning requires native platform implementation
- Cannot fully work in Expo managed workflow
- This implementation demonstrates the concept with hash comparison
- react-native-quick-crypto is used for hashing
