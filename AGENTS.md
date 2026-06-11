# AGENTS.md — Expo Security Lab

## Project status

Plan-only. No code scaffolded yet. Single source of truth is `plan.md`.

## Stack

- Expo (latest), Expo Router (file-based routing), TypeScript (strict)
- Zustand (state), TanStack React Query (server state)
- Tamagui (UI), Reanimated + Gesture Handler (animations)
- Expo Secure Store (crypto storage)
- Jest + React Native Testing Library + Detox (e2e)
- EAS Build + Dev Builds (no Expo Go for native features)

No `package.json`, `tsconfig.json`, or Expo config yet. Agent should scaffold these.

## Architecture rules

- Feature-based folders under `src/modules/`. Each feature: screen, demo screen, hook, service, types, unit tests, docs.
- Business logic never in screens — extract into hooks/services.
- `src/` structure: `modules/`, `hooks/`, `services/`, `store/`, `navigation/`, `components/`, `constants/`, `utils/`, `types/`, `assets/`, `providers/`.

## Feature workflow (mandatory order)

1. Feature Screen → 2. Demo Screen → 3. Hook → 4. Service → 5. Types → 6. Unit Tests → 7. Docs → 8. Navigation Route → 9. Dashboard Entry.

Every feature must appear on the Dashboard with: name, support status, platform support, demo button, docs button.

## Documentation per feature

Create `docs/features/{name}/` with all of: `README.md`, `IMPLEMENTATION.md`, `EDGE_CASES.md`, `SECURITY.md`, `TEST_CASES.md`, `TROUBLESHOOTING.md`, `EXPO_LIMITATIONS.md`, `INTERVIEW_NOTES.md`. Never skip docs.

## Security & edge case requirements

For every feature document: risks, attack vectors, platform limitations, mitigation strategy. Also: Android/iOS variations, offline mode, permission denied, hardware unsupported, OS version limitations.

## Required features

- **Auth**: Fingerprint, Face ID, device credential, secure storage
- **Screen security**: Screenshot detect/prevent, recording detect/prevent, casting detect
- **Device security**: Root/jailbreak/emulator/dev-mode/mock-location detection
- **Monitoring**: Network, battery, location, shake, app state
- **Enterprise**: Push notifications, deep linking, QR scanner, NFC, analytics, crash reporting
- **Security**: SSL pinning, session management, auto logout, device binding, force update

## Coding rules

- No `any`, no hardcoded strings, no duplicate code
- Every screen/component gets error, loading, and empty states
- Every feature requires success path + failure path + edge case tests
- Classify every feature for Expo Go / Dev Build / EAS Build / native prebuild support and document reasons.

## Dev commands (to add once scaffolded)

```bash
# create
npx create-expo-app@latest . --template blank-typescript
# dev
npx expo start
# test
npx jest
# lint
npx expo lint
# build
npx eas build --platform all
```

## Key constraint

This is educational but all code must follow production-quality standards. SOLID + Clean Architecture required.
