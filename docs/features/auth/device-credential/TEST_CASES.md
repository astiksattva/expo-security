# Test Cases

## Unit Tests (Service)

| Test | Expected |
|------|----------|
| `isDeviceCredentialAvailable` on iOS/Android | Returns `true` |
| `isDeviceCredentialAvailable` on Web | Returns `false` |
| `authenticateWithDeviceCredential` on success | Returns `success: true` |
| `authenticateWithDeviceCredential` on cancel | Returns `success: false, error: CANCELLED` |
| `authenticateWithDeviceCredential` on lockout | Returns `success: false, error: LOCKOUT` |

## Integration Tests

| Test | Expected |
|------|----------|
| Hook `checkAvailability` sets isAvailable correctly | isAvailable state updated |
| Hook `authenticate` sets result correctly | Result state updated |
| Screen shows availability status | Status information visible |
| Screen shows platform error on Web | "Not available on this platform" message |
| Screen shows error on cancelled auth | Error message displayed |

## E2E Tests

| Test | Expected |
|------|----------|
| Auth button visible when credential available | Button rendered |
| Auth button triggers system dialog | System credential dialog appears |
| Unsupported platform shows empty state | EmptyState with message displayed |

## Android-Specific Tests

| Test | Expected |
|------|----------|
| Pattern lock available | isAvailable returns true |
| No screen lock set | isAvailable returns false |

## iOS-Specific Tests

| Test | Expected |
|------|----------|
| Passcode set | isAvailable returns true |
| No passcode | isAvailable returns false |
