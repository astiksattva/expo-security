# Jailbreak Detection — Expo Limitations

## Expo Go

- **Status:** Not Supported
- **Reason:** The Expo Go runtime sandboxes the app, preventing file system access to system paths and blocking the sandbox write test. All jailbreak checks require full native capabilities.

## Development Build

- **Status:** Supported
- **Reason:** Development builds run with full native runtime. File system APIs can access iOS system paths.

## EAS Build

- **Status:** Supported
- **Reason:** Production builds have full native capabilities.

## Native Prebuild

- **Required:** Yes
- **Reason:** `expo-file-system` or `react-native-fs` must be configured in native project.

## Alternative Approaches

For Expo Go:
1. Use `expo-device` model/brand checks as weak indicators
2. Check for development tools via URL schemes
3. Server-side device attestation (Apple App Attest)
