# Edge Cases — Analytics

## iOS Variations

- Network requests behave consistently on iOS
- Background app refresh may affect flush timing
- No platform-specific analytics variations

## Android Variations

- Network requests behave consistently on Android
- Battery optimization may delay background flushes
- No platform-specific analytics variations

## Offline Mode

- Events continue to buffer while offline
- Flush fails gracefully when offline
- Events are re-queued until online
- Buffer has finite capacity (1000 events)

## Permission Denied

- Not applicable — analytics doesn't require permissions

## Hardware Unsupported

- Not applicable — analytics is software-based

## OS Version Limitations

- No OS limitations for basic analytics

## Edge Cases

- Extremely rapid event tracking (buffer overflow)
- Very large event properties
- Flush while another flush is in progress
- Empty buffer flush
- Server returns error after partial processing
- Network timeout during flush
- App backgrounding during flush
- Events with special characters in property values
