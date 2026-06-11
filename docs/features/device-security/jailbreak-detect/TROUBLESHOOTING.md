# Jailbreak Detection — Troubleshooting

## Always Shows "Secure" on Jailbroken Device

1. Jailbreak detection bypass tweak may be active (Liberty Lite etc.)
2. Rootless jailbreak (iOS 15+) may not leave traditional traces
3. Disable bypass tweaks in Cydia/Sileo
4. Check that file system module is correctly installed

## Sandbox Write Test Causing Issues

1. The write test expects failure — it's normal for the test to "fail"
2. If sandbox write succeeds unexpectedly, check device security
3. Remove any test files that may have been created

## False Positive

1. Some enterprise MDM profiles install SSH-like services
2. Developer mode on iOS 16+ may open some paths
3. Test on a known secure device for baseline

## Expo Go

Jailbreak detection will not work in Expo Go due to sandbox restrictions.

## Logging

Enable verbose logging to trace detection steps:
```
[jailbreak-detect] Checking path: /Applications/Cydia.app
[jailbreak-detect] Sandbox write test: blocked
```
