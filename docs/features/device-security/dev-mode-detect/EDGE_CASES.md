# Developer Mode Detection — Edge Cases

## Android Variations

| Issue | Impact | Mitigation |
|---|---|---|
| OEM settings changes | SettingsManager values vary | Check multiple indicators |
| Android 10+ restrictions | Some settings not readable | Use intent-based checks |
| Custom ROM settings | Different settings layout | Multiple check methods |
| Samsung Secure Folder | May restrict settings access | Graceful degradation |

## Offline Mode

Fully offline — all checks are local.

## Permission Denied

- SettingsManager may be null on some devices
- No special permissions needed for settings reads
- Intent checks may fail silently

## OS Version Limitations

| Version | Limitation |
|---|---|
| Android 4.x | Basic settings access |
| Android 5-9 | Best coverage for settings |
| Android 10+ | Settings.Global restrictions |
| Android 12+ | Even tighter settings access |

## False Positives

- USB debugging may be enabled without developer mode
- Some MDM profiles trigger dev mode flags
- React Native dev menu enables flag

## False Negatives

- Developer mode enabled but ADB disabled
- OEM settings hiding developer options
- SettingsManager unavailable on the device
