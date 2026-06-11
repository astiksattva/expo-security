# Security

## Risks

- **Screen lock detection**: Background state transitions can identify when user locks device
- **Inactivity tracking**: Accumulated time data can infer user behavior patterns
- **Photo/video detection**: Camera active state may be detectable through app state changes

## Mitigations

- Clear accumulated time data on user logout
- Do not persist app state timing data to disk
- Use app state to trigger security actions (lock screen, clear clipboard) rather than for tracking
- Aggregate timing data with minimum precision (e.g., round to 10s)
