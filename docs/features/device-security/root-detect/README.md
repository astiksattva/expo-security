# Root Detection

Detect whether an Android device has been rooted by checking for common root indicators.

## Overview

Root detection scans the Android device for signs of superuser access. Rooting grants
users elevated privileges that can bypass app security measures.

## Detection Methods

1. **File System Checks** — Scans for su binary at common paths
2. **Root Management Apps** — Detects installed root management packages
3. **su Execution** — Attempts to locate su via shell
4. **Build Tags** — Checks for test build properties

## API

```typescript
import { checkRootStatusSafe } from '../../services/rootDetectService'

const result = await checkRootStatusSafe()
// { isRooted: boolean, detections: string[], confidence: 'low' | 'medium' | 'high' }
```

## Confidence Levels

- **High** — 3+ indicators detected
- **Medium** — 1-2 indicators detected
- **Low** — No indicators detected (default for non-Android)

## Platform Support

- Android: ✅ Supported
- iOS: ❌ Not applicable
