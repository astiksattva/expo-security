# Test Cases — Deep Linking

## Unit Tests

| Test | Description |
|------|-------------|
| Create deep link | Verify URL created with correct scheme and path |
| Parse deep link | Verify path, query params, and route parsed correctly |
| Parse with query params | Verify query params extracted |
| Parse without path | Verify default route handling |
| Get initial URL | Mock initial URL and verify return |
| Add URL listener | Mock URL event and verify handler |
| Create linking config | Verify Expo Router config structure |

## Integration Tests

| Test | Description |
|------|-------------|
| Cold start deep link | Launch app via deep link → Verify initial URL captured |
| Warm start deep link | Open app → Send deep link → Verify listener fires |
| Invalid URL parsing | Send malformed URL → Verify error state |

## Manual Test Cases

| Scenario | Steps |
|----------|-------|
| iOS custom scheme | `xcrun simctl openurl booted "exp-security-lab://dashboard"` → Verify deep link shown |
| Android custom scheme | `adb shell am start -W -a android.intent.action.VIEW -d "exp-security-lab://auth/fingerprint"` → Verify |
| Query parameters | Send URL with params → Verify they appear in parsed output |
| Invalid scheme | Open unsupported URL → Verify error handling |
| Rapid deep links | Send multiple URLs quickly → Verify all processed |
