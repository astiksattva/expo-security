# CODEX_INSTRUCTIONS.md

## Project Overview

You are building an enterprise-grade React Native Expo application called **Expo Security Lab**.

The goal is to learn and demonstrate advanced React Native, Expo, Mobile Security, Device APIs, Native Integrations, Testing, and Production Architecture.

This project is educational but all implementations must follow production-quality standards.

---

## Technology Stack

### Core

- React Native Expo (Latest)
- Expo Router
- TypeScript (Strict Mode)
- Zustand
- TanStack React Query
- Expo Secure Store

### UI

- Tamagui
- React Native Reanimated
- React Native Gesture Handler

### Testing

- Jest
- React Native Testing Library
- Detox (when applicable)

### Build

- EAS Build
- Expo Development Build

---

## Architecture Rules

Follow:

- SOLID Principles
- Clean Architecture
- Feature-Based Folder Structure
- Dependency Injection where appropriate
- Reusable Hooks
- Reusable Services
- Strict TypeScript

Never place business logic directly inside screens.

---

## Folder Structure

src/

├── modules/
├── hooks/
├── services/
├── store/
├── navigation/
├── components/
├── constants/
├── utils/
├── types/
├── assets/
└── providers/

docs/

├── architecture/
├── features/
└── decisions/

---

## Feature Development Workflow

When implementing a feature:

1. Create Feature Screen
2. Create Demo Screen
3. Create Hook
4. Create Service
5. Create Types
6. Create Unit Tests
7. Create Documentation
8. Register Navigation Route
9. Add Dashboard Entry

Never skip documentation.

---

## Documentation Requirements

For every feature create:

docs/features/{feature-name}/

README.md
IMPLEMENTATION.md
EDGE_CASES.md
SECURITY.md
TEST_CASES.md
TROUBLESHOOTING.md
EXPO_LIMITATIONS.md
INTERVIEW_NOTES.md

---

## Dashboard Requirements

Create a Dashboard Screen.

Every feature must appear on the dashboard.

Display:

- Feature Name
- Support Status
- Platform Support
- Demo Button
- Documentation Button

---

## Expo Compatibility Matrix

For every feature classify:

### Expo Go

Supported / Not Supported

### Development Build

Supported / Not Supported

### EAS Build

Supported / Not Supported

### Native Prebuild Required

Yes / No

Document reasons.

---

## Required Features

### Authentication

- Fingerprint Authentication
- Face ID Authentication
- Device Credential Authentication
- Secure Storage

### Screen Security

- Screenshot Detection
- Screenshot Prevention
- Screen Recording Detection
- Screen Recording Protection
- Screen Casting Detection

### Device Security

- Root Detection
- Jailbreak Detection
- Emulator Detection
- Developer Mode Detection
- Mock Location Detection

### Device Monitoring

- Network Detection
- Battery Detection
- Location Detection
- Shake Detection
- App State Monitoring

### Enterprise Features

- Push Notifications
- Deep Linking
- QR Scanner
- NFC
- Analytics
- Crash Reporting

### Security

- SSL Pinning
- Session Management
- Auto Logout
- Device Binding
- Force Update

---

## Coding Standards

Always:

- Use TypeScript
- Add Types
- Add Error Handling
- Add Loading States
- Add Empty States
- Add Logging
- Add Comments where necessary

Never:

- Use any
- Hardcode strings
- Duplicate code
- Skip error handling

---

## Testing Requirements

Every feature requires:

### Unit Tests

- Success Path
- Failure Path
- Edge Cases

### Integration Tests

- User Flow
- API Flow

### Manual Test Cases

Document all manual test scenarios.

---

## Security Requirements

Document:

- Risks
- Attack Vectors
- Platform Limitations
- Mitigation Strategy

For every feature.

---

## Edge Case Requirements

Document:

- Android Variations
- iOS Variations
- Offline Mode
- Permission Denied
- Hardware Unsupported
- OS Version Limitations

---

## Learning Requirements

For every feature generate:

INTERVIEW_NOTES.md

Include:

- Concepts
- Architecture
- Expo Limitations
- Native Alternatives
- Interview Questions
- Best Practices

---

## Output Requirements

When generating code:

1. Explain architecture.
2. Explain dependencies.
3. Explain setup.
4. Generate code.
5. Generate tests.
6. Generate documentation.
7. Update dashboard.

Do not skip any step.

Always assume this project is intended for production-quality learning.
