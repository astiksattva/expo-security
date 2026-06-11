# Security

## Risks

- **Sensor data access**: Accelerometer data is available without permission on most platforms
- **Keystroke inference**: Acceleration data can theoretically be used to infer tap position on screen (proof-of-concept attacks exist)
- **Motion fingerprinting**: Device vibration patterns can fingerprint specific devices

## Mitigations

- Do not expose raw accelerometer readings to users or analytics without need
- Only use shake events (boolean), not continuous acceleration data
- Clear sensor subscriptions when app goes to background
- No permission required on iOS/Android for accelerometer access
