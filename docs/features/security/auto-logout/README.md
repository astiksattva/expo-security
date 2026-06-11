# Auto Logout

Automatically log out inactive users based on configurable inactivity timeouts
with warning notifications before session expiration.

## Files

- `src/modules/security/types/index.ts` - AutoLogoutConfig, AutoLogoutStatus, InactivityWarning
- `src/modules/security/services/autoLogoutService.ts` - timer, activity tracking, monitor
- `src/modules/security/hooks/useAutoLogout.ts` - React hook with lifecycle management
- `src/modules/security/screens/AutoLogoutScreen.tsx` - full feature screen
- `src/modules/security/demo/DemoAutoLogoutScreen.tsx` - demo screen

## Usage

```typescript
import { startAutoLogoutMonitor, recordActivity } from '../services/autoLogoutService'

startAutoLogoutMonitor(
  () => { /* logout user */ },
  (warning) => { /* show warning */ },
)

// Call on user interaction
recordActivity()
```
