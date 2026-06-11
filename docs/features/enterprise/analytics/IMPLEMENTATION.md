# Implementation — Analytics

## Architecture

```
Screen → useAnalytics() hook → Service layer → In-memory buffer → Server (via fetch)
```

The analytics system uses a custom in-memory buffer with server flushing.

## Setup

No external dependencies. Uses built-in `fetch` for server communication.

## Key Implementation Details

1. **Event Buffer**: In-memory array with 1000 event cap
2. **Buffer Overflow**: Oldest events are removed when limit exceeded
3. **Event Flush**: Sends buffer to configured server endpoint
4. **Failed Flush**: Events are re-queued on server failure
5. **Re-queue**: Failed events prepend to buffer (FIFO order)
6. **Screen Views**: Pre-built factory for screen view events
7. **User Actions**: Pre-built factory for user action events

## Error Handling

- Track failure: Silently caught (fire-and-forget)
- Flush failure: Events re-queued, error propagated
- Buffer overflow: Silent trimming of oldest events

## Testing

- Unit tests for event tracking
- Tests for buffer overflow behavior
- Tests for flush success/failure paths
