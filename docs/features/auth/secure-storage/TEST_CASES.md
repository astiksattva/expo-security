# Test Cases

## Unit Tests (Service)

| Test | Expected |
|------|----------|
| `secureWrite` with valid key/value | Returns `success: true` |
| `secureRead` with existing key | Returns `success: true` with value |
| `secureRead` with non-existing key | Returns `success: true` with value undefined |
| `secureDelete` with existing key | Returns `success: true` |
| `secureDelete` with non-existing key | Returns `success: true` (no-op) |
| `secureKeyExists` with existing key | Returns `true` |
| `secureKeyExists` with non-existing key | Returns `false` |
| `secureWrite` on Web | Returns `success: false` with platform error |

## Integration Tests

| Test | Expected |
|------|----------|
| Hook `saveItem` adds entry to list | Entry appears in entries array |
| Hook `readItem` adds entry to list | Entry appears in entries array |
| Hook `deleteItem` removes entry | Entry removed from entries array |
| Hook `clearItems` clears all entries | entries array empty |
| Hook handles duplicate keys | Existing entry replaced |

## E2E Tests

| Test | Expected |
|------|----------|
| Write form saves item | Item appears in stored list |
| Read form reads item | Item value displayed |
| Delete button removes item | Item removed from list |
| Clear button removes all items | List empties |
| Web platform shows not supported | EmptyState displayed |

## Edge Case Tests

| Test | Expected |
|------|----------|
| Empty key write | Behavior depends on platform |
| Empty value write | Stored successfully |
| Unicode key/value | Stored and retrieved correctly |
| Very long value | Error or truncation consistent with platform limits |
