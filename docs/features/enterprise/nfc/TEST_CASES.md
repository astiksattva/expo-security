# Test Cases — NFC

## Unit Tests

| Test | Description |
|------|-------------|
| NFC available | Mock isAvailableAsync as true, verify true |
| NFC unavailable | Mock isAvailableAsync as false, verify false |
| Start polling | Mock polling start, verify no error |
| Stop polling | Mock polling stop, verify no error |
| Parse NFC tag | Mock raw tag, verify structured output with records |
| Format NFC data | Mock base64 data, verify decoded string |
| Web platform | Mock web platform, verify NFC unavailable |

## Integration Tests

| Test | Description |
|------|-------------|
| Full NFC flow | Check available → Start polling → Read tag → Stop polling |
| Unavailable device | Check available → false → Show unavailable state |
| Tag discovery | Start polling → Tag detected → Parse → Display data |

## Manual Test Cases

| Scenario | Steps |
|----------|-------|
| Read NFC tag | Tap "Start Polling" → Hold NFC tag near device → Verify data |
| Read multiple tags | Scan one tag → Clear → Scan another → Verify new data |
| Stop polling | Start polling → Tap "Stop Polling" → Verify stopped |
| Hardware unavailable | Test on simulator → Verify unavailable state |
| Different tag types | Test with NDEF, Mifare, and other tag types |
| Hold tag briefly | Tap tag quickly → Verify data still captured |
