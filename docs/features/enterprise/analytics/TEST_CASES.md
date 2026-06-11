# Test Cases — Analytics

## Unit Tests

| Test | Description |
|------|-------------|
| Track event | Track event with name, verify buffer has one event |
| Track with properties | Track with properties, verify properties stored |
| Track multiple events | Track 10 events, verify count is 10 |
| Buffer overflow | Track 1001 events, verify max 1000 stored |
| Clear buffer | Clear after tracking, verify empty |
| Flush with events | Flush with events > 0, verify buffer cleared |
| Flush without events | Flush with empty buffer, verify no network call |
| Screen view event | Create screen view event, verify format |
| User action event | Create user action event, verify format |

## Integration Tests

| Test | Description |
|------|-------------|
| Track then flush | Track events → Flush → Verify buffer empty |
| Failed flush re-queue | Track events → Flush fails → Verify events in buffer |
| Full analytics flow | Track → View count → Flush → Clear → Verify empty |

## Manual Test Cases

| Scenario | Steps |
|----------|-------|
| Track events | Tap various action buttons → Verify count increases |
| Flush events | Track events → Tap "Flush" → Verify count resets |
| Clear events | Track events → Tap "Clear" → Verify empty |
| View event log | Track events → Scroll log → Verify events visible |
| Offline behavior | Enable airplane mode → Track → Flush → Verify error |
