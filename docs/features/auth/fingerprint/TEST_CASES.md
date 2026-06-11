# Test Cases

## Unit Tests (Service)

| Test | Expected |
|------|----------|
| `getFingerprintStatus` on device with fingerprint hardware | Returns `isAvailable: true` |
| `getFingerprintStatus` on device without hardware | Returns `isAvailable: false` |
| `getFingerprintStatus` with enrolled fingerprint | Returns `isEnrolled: true` |
| `getFingerprintStatus` with no enrolled fingerprint | Returns `isEnrolled: false` |
| `authenticateFingerprint` on success | Returns `success: true` |
| `authenticateFingerprint` on cancel | Returns `success: false, error: CANCELLED` |
| `authenticateFingerprint` on lockout | Returns `success: false, error: LOCKOUT` |
| `authenticateFingerprint` on iOS | Returns `success: false` (platform check) |

## Integration Tests

| Test | Expected |
|------|----------|
| Hook `checkStatus` sets status correctly | Status state updated |
| Hook `authenticate` sets result correctly | Result state updated |
| Hook `reset` clears all state | All state nullified |
| Screen shows loading during auth | LoadingState component rendered |
| Screen shows success after auth | Success message displayed |

## E2E Tests (Detox)

| Test | Expected |
|------|----------|
| Fingerprint screen renders status | Status information visible |
| Auth button triggers system dialog | System dialog appears |
| Demo mode shows demo badge | "Demo Mode" text visible |
