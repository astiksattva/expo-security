# Test Cases — Crash Reporting

## Unit Tests

| Test | Description |
|------|-------------|
| Initialize handler | Install global handler, verify replaced |
| Capture error | Capture error with message, verify report created |
| Capture error with context | Capture with context, verify context in report |
| Capture promise rejection | Capture rejection event, verify report |
| Report ID uniqueness | Capture two errors, verify different IDs |
| Stack trace capture | Capture error with stack, verify trace stored |
| Report storage limit | Capture 55 errors, verify max 50 stored |
| Clear reports | Clear after capture, verify empty |
| Send report | Send report, verify network call |
| Restore handler | Restore original, verify restored |

## Integration Tests

| Test | Description |
|------|-------------|
| Initialize → Capture → Send | Full crash reporting flow |
| Capture → Clear → Verify empty | Clear flow |
| Multiple captures → Send all | Batch processing |

## Manual Test Cases

| Scenario | Steps |
|----------|-------|
| Simulate error | Initialize reporting → Tap "Simulate Error" → Verify report appears |
| Clear reports | Capture errors → Tap "Clear All" → Verify empty |
| Send report | Capture error → Tap "Send Latest" → Verify sent |
| Restore handler | Initialize → Restore → Verify original handler restored |
| View stack trace | Capture error → Verify stack trace visible in report |
