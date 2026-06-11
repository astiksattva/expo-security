# Jailbreak Detection — Test Cases

## Unit Test Cases

### Success Path

| Test | Expected |
|---|---|
| Non-jailbroken device | `isJailbroken` false, empty detections |
| Cydia.app detected | `isJailbroken` true, indicator in detections |
| Sandbox write succeeds | indicator in detections |
| Multiple indicators found | High confidence |

### Failure Path

| Test | Expected |
|---|---|
| File system API throws | Fallback to safe result |
| expo-file-system unavailable | Graceful degradation |
| All checks fail individually | Empty detections, low confidence |

### Edge Cases

| Test | Expected |
|---|---|
| Android device | Returns false, empty detections |
| Non-iOS platform | Returns false, empty detections |
| Partial path check success | Partial detection |
| Sandbox write test blocked | No sandbox detection |

## Manual Test Scenarios

1. Physical iPhone (not jailbroken) → SECURE
2. Jailbroken iPhone → JAILBROKEN with detections
3. Android device → iOS Only message
4. Simulator → may show emulator OR jailbreak indicators

## Integration Tests

- Hook returns correct status mapping
- Screen renders appropriate UI for each status
- Navigation resolves correct screen from route
