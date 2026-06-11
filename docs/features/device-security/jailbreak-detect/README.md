# Jailbreak Detection

Detect whether an iOS device has been jailbroken by checking for common jailbreak indicators.

## Overview

Jailbreak detection scans for file system artifacts and behaviors that indicate a compromised iOS device.

## Detection Methods

1. **File System Checks** — Scans for Cydia, Sileo, MobileSubstrate, SSH daemon files
2. **Sandbox Violation** — Attempts to write outside the app sandbox
3. **URL Scheme Detection** — Tests for Cydia/Sileo URL schemes
4. **Bundle Detection** — Checks for Cydia application bundle

## API

```typescript
import { checkJailbreakStatusSafe } from '../../services/jailbreakDetectService'

const result = await checkJailbreakStatusSafe()
// { isJailbroken: boolean, detections: string[], confidence: 'low' | 'medium' | 'high' }
```

## Platform Support

- iOS: ✅ Supported
- Android: ❌ Not applicable (use root detection)
