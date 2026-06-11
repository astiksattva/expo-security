# Force Update

Ensure users are running a supported version of the app by comparing the
current version against a minimum required version.

## Files

- `src/modules/security/types/index.ts` - VersionInfo, UpdateStatus, ForceUpdateConfig
- `src/modules/security/services/forceUpdateService.ts` - version comparison, check logic
- `src/modules/security/hooks/useForceUpdate.ts` - React hook wrapping the service
- `src/modules/security/screens/ForceUpdateScreen.tsx` - full feature screen
- `src/modules/security/demo/DemoForceUpdateScreen.tsx` - demo screen

## Usage

```typescript
import { checkForUpdate } from '../services/forceUpdateService'

const status = await checkForUpdate(async () => {
  // Fetch from remote config / API
  return '2.0.0'
})

if (status.needsUpdate) {
  // Show update screen
}
```
