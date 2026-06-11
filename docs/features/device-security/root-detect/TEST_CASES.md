# Root Detection — Test Cases

## Unit Test Cases

### Success Path

| Test | Expected |
|---|---|
| Unrooted device returns isRooted=false | `detections` empty, `confidence` low |
| Rooted device with su binary detected | `isRooted` true, confidence medium+ |
| Multiple indicators found | `confidence` high |
| Root management app detected | Indicator in `detections` array |

### Failure Path

| Test | Expected |
|---|---|
| File system API throws | `isRooted` false, safe fallback |
| expo-file-system unavailable | Graceful degradation |
| All file checks fail individually | Empty detections, low confidence |

### Edge Cases

| Test | Expected |
|---|---|
| iOS device | Returns false, empty detections |
| Non-Android platform | Returns false, empty detections |
| Empty ROOT_INDICATORS list | No file-based detections |
| Partial file system access | Some paths checked, others skipped |

## Manual Test Scenarios

1. Run on physical unrooted Android device → SECURE
2. Run on rooted Android device → ROOTED with detections
3. Run on iOS device → Android Only message
4. Toggle airplane mode → Detection still works (offline)
5. Install/uninstall Magisk → Result changes accordingly

## Integration Tests

- Hook + Service: Hook returns service data with correct status mapping
- Screen + Hook: Screen renders correct UI for each status
- Navigation: Route resolves to correct screen
