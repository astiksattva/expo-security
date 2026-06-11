# Session Management

Manage user authentication sessions with token storage, expiry tracking,
and automatic refresh capabilities using expo-secure-store.

## Files

- `src/modules/security/types/index.ts` - SessionToken, SessionStatus, SessionConfig
- `src/modules/security/services/sessionService.ts` - token CRUD, status checks, refresh
- `src/modules/security/hooks/useSession.ts` - React hook wrapping the service
- `src/modules/security/screens/SessionManagementScreen.tsx` - full feature screen
- `src/modules/security/demo/DemoSessionManagementScreen.tsx` - demo screen

## Usage

```typescript
import { storeSession, getSessionStatus } from '../services/sessionService'

await storeSession({
  accessToken: '...',
  refreshToken: '...',
  expiresAt: Date.now() + 3600000,
  tokenType: 'Bearer',
})

const status = await getSessionStatus()
```
