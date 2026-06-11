# Emulator Detection — Interview Notes

## Key Concepts

| Concept | Explanation |
|---|---|
| Emulator | Software that simulates device hardware (Android Emulator) |
| Simulator | iOS development environment (Xcode Simulator) |
| isDevice | expo-device flag indicating physical vs simulated |
| Device farm | Cloud testing services with real devices |

## Architecture Questions

**Q: Why is emulator detection the only Expo Go-compatible feature?**
A: It only uses expo-device's managed API which is available in Expo Go. Other
features need file system or system settings access that is sandboxed.

**Q: How reliable is Device.isDevice?**
A: Very reliable for standard emulators and simulators. Third-party emulators
like BlueStacks may bypass this check.

**Q: What's the value of model matching?**
A: Defense in depth — catches emulators that might fake isDevice but forget
to change model strings.

## Expo Limitations

- Cannot detect all third-party emulators
- No kernel-level emulator detection
- isDevice can theoretically be patched

## Native Alternatives

- **Android:** Build.prop analysis, QEMU detection, hardware breakpoints
- **iOS:** sysctl hw detection, IOKit property analysis
- **React Native:** expo-device, react-native-device-info

## Interview Questions

1. How would you detect BlueStacks, Nox, or other third-party emulators?
2. What's the difference between an emulator and a simulator?
3. How could an attacker bypass isDevice checks?
4. Why should you combine emulator detection with root/jailbreak detection?
5. How does QEMU-based emulation differ from Android Emulator?
