# Test Cases

## Unit Tests (Service)

| Test | Expected |
|------|----------|
| `getFaceIdStatus` on device with Face ID hardware | Returns `isAvailable: true` |
| `getFaceIdStatus` on device without Face ID | Returns `isAvailable: false` |
| `getFaceIdStatus` with Face ID enrolled | Returns `isEnrolled: true` |
| `getFaceIdStatus` without enrollment | Returns `isEnrolled: false` |
| `authenticateFaceId` on success | Returns `success: true` |
| `authenticateFaceId` on Android | Returns `success: false` (platform check) |
| `authenticateFaceId` on cancel | Returns `success: false, error: CANCELLED` |
| `authenticateFaceId` on lockout | Returns `success: false, error: LOCKOUT` |

## Integration Tests

| Test | Expected |
|------|----------|
| Hook `checkStatus` sets status correctly | Status state updated |
| Hook `authenticate` sets result correctly | Result state updated |
| Screen shows platform error on Android | "Only available on iOS" message |
| Screen shows success after Face ID auth | Success message displayed |

## iOS Simulator Testing

- Test with: Hardware > Face ID > Enrolled / Non-enrolled
- Test with: Hardware > Face ID > Matching Face / Non-matching Face

## E2E Tests

| Test | Expected |
|------|----------|
| Face ID screen renders status | Status information visible |
| Auth button triggers system dialog | System Face ID dialog appears |
| Demo mode shows demo badge | "Demo Mode" text visible |
