# Interview Notes

## Key Talking Points

- Device credential auth uses `expo-local-authentication` with `disableDeviceFallback: false`
- Works on both iOS (passcode) and Android (PIN/pattern/password)
- Should be used as fallback when biometrics are unavailable or locked out
- Always check availability first — you can't authenticate without a configured passcode
- The term "device credential" covers all types of screen locks

## Common Questions

### Q: How is device credential different from biometric auth?
A: Device credential uses passcode/PIN/pattern instead of biometric data. The underlying API is the same (`LAContext` / `BiometricPrompt`), but the authentication policy differs. With `disableDeviceFallback: true`, you force biometric-only. With `false`, you allow passcode.

### Q: When should you use device credential instead of biometric?
A: Use device credential as fallback when:
- Biometric hardware is unavailable
- No biometrics enrolled
- Biometric auth is locked out
- User preference for passcode

### Q: How do you handle the case where no passcode is set?
A: Check `isEnrolledAsync()` which returns false when no passcode is set. Show an appropriate message directing the user to set a screen lock in device settings.

### Q: Can you enforce passcode complexity?
A: Not with Expo's API. The system handles passcode policy. For enterprise MDM, device restrictions can enforce passcode requirements.

## Architecture Decisions

- **Why `disableDeviceFallback: false`?** Allows passcode as an option alongside biometrics — the user chooses the method
- **Why separate from biometric hooks?** Different UX pattern (fallback vs primary) and different availability checks
- **Why `isAvailable` boolean instead of full status object?** Device credential has simpler status — available or not
