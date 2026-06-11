# Jailbreak Detection — Implementation

## File Structure

```
src/modules/device-security/
├── services/jailbreakDetectService.ts — Detection logic
├── hooks/useJailbreakDetect.ts        — React hook
├── screens/JailbreakDetectScreen.tsx  — Feature screen
└── demo/JailbreakDetectDemoScreen.tsx — Demo screen
```

## Service

`jailbreakDetectService.ts` exports two functions:
- `checkJailbreakStatus()` — Throws on error
- `checkJailbreakStatusSafe()` — Returns default on error

### Jailbreak File Paths

30+ paths checked including:
- `/Applications/Cydia.app`, `/Applications/Sileo.app`
- `/Library/MobileSubstrate/MobileSubstrate.dylib`
- `/usr/libexec/ssh-keysign`, `/usr/sbin/sshd`
- `/bin/bash`, `/bin/sh`
- `/etc/apt`, `/var/lib/cydia`
- SSH-related files, frida-server, cycript

### Sandbox Write Test

Attempts to write to `/private/test_jb_write.txt`. If it succeeds, the device
is jailbroken (sandbox is not enforced).

### URL Scheme Detection

Checks if `cydia://`, `sileo://`, `zebra://` can be opened — jailbroken devices
will have these handlers registered.

## Dependencies

- `expo-file-system` or `react-native-fs` — File existence checks
- `expo-linking` — URL scheme detection

## Confidence Levels

- **High** — 3+ indicators detected (file + sandbox + scheme)
- **Medium** — 1-2 indicators detected
- **Low** — No indicators (default for non-iOS)
