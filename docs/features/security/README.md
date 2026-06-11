# Security Feature Group

Collection of security features for the Expo Security Lab application, covering
SSL pinning, session management, auto logout, device binding, and force update.

## Features

| Feature | Status | Platforms | Expo Go | Native Prebuild |
|---|---|---|---|---|
| SSL Pinning | beta | ios, android | no | yes |
| Session Management | stable | ios, android, web | yes | no |
| Auto Logout | stable | ios, android, web | yes | no |
| Device Binding | beta | ios, android | no | yes |
| Force Update | stable | ios, android, web | yes | no |

## Architecture

All features follow the Feature-Based Architecture pattern:
- **Types** - domain models, interfaces, error constants
- **Services** - business logic, secure store interactions
- **Hooks** - React state management, service wrapping
- **Screens** - UI with error/loading/empty states
- **Demo Screens** - simplified in-memory versions for Expo Go

## Security Considerations

- SSL pinning requires native modules (educational implementation)
- Session tokens stored in expo-secure-store
- Auto logout uses AppState monitoring
- Device binding uses expo-application identifiers
- Force update uses version comparison with remote config pattern
