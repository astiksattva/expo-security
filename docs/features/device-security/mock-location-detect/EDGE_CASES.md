# Mock Location Detection — Edge Cases

## Android Variations

| Issue | Impact | Mitigation |
|---|---|---|
| Android 10+ API changes | ALLOW_MOCK_LOCATION deprecated | Use location provider check |
| Custom ROM | Different settings keys | Multiple check methods |
| OEM settings UI | Mock location setting may be renamed | Check all available flags |
| Huawei devices | ContentResolver differences | Graceful fallback |

## Offline Mode

Fully offline — all detection is local.

## Permission Denied

- Location permission NOT required for detection
- SettingsManager access may be restricted
- No runtime permissions needed

## OS Version Limitations

| Version | Limitation |
|---|---|
| Android 4.x | ALLOW_MOCK_LOCATION readable |
| Android 5-9 | Best coverage |
| Android 10+ | Deprecated setting, use location provider |
| Android 12+ | Further restrictions on settings access |

## False Positives

- ADB enabled triggers the detection even if mock location isn't active
- Some MDM solutions register as mock location providers
- Development devices with location mock apps installed

## False Negatives

- Mock location hidden via Magisk module
- Custom ROM with mock location built into system
- Mock location via Xposed module (system-level)
