# Emulator Detection — Edge Cases

## Platform Variations

| Issue | Impact | Mitigation |
|---|---|---|
| iOS simulator returns false for isDevice | Correctly detected as simulator | Expected behavior |
| Google-provided emulator models | Well-known model strings | Comprehensive list |
| Third-party emulators (BlueStacks, Nox) | May report as device | Custom model detection |
| Windows/macOS running Android emulator | Android model strings | Model-based detection |
| Cloud device farms (AWS Device Farm) | May show as emulator | Accept false positive |

## Offline Mode

Fully offline — expo-device data is synchronous.

## Hardware Unsupported

No hardware requirements. Works on all iOS/Android devices.

## OS Version Limitations

- Works on all iOS and Android versions supported by expo-device
- Older Android (< 4.4) may have different model name formats

## False Positives

- Physical devices with generic model names
- Some Chinese OEM devices with unusual model strings
- Custom ROMs reporting unknown model names

## False Negatives

- Sophisticated emulators that fake isDevice response
- Jailbroken devices that spoof device properties
- Custom Android builds running on actual hardware
