# Device Binding

Bind authentication sessions to specific devices using unique device
identifiers from expo-application.

## Files

- `src/modules/security/types/index.ts` - DeviceBindingInfo, DeviceBindingStatus, BindingConfig
- `src/modules/security/services/deviceBindingService.ts` - bind/verify/unbind logic
- `src/modules/security/hooks/useDeviceBinding.ts` - React hook wrapping the service
- `src/modules/security/screens/DeviceBindingScreen.tsx` - full feature screen
- `src/modules/security/demo/DemoDeviceBindingScreen.tsx` - demo screen

## Usage

```typescript
import { bindDevice, verifyBinding } from '../services/deviceBindingService'

await bindDevice('auth_token')
const status = await verifyBinding()
console.log('Verified:', status.isVerified)
```
