# Edge Cases

| Case | Behavior |
|------|----------|
| App killed in background | Timers lost; reset on next launch |
| Rapid foreground/background | Each transition tracked independently |
| iOS "inactive" state | Brief transition between active↔background (e.g., incoming call) |
| Split screen / multitasking (Android) | App remains in `active` state |
| Notification center pull-down | iOS: becomes `inactive` |
| Lock screen | Both platforms: becomes `background` |
| Long background time | Accumulates without upper bound |
| App restored from background | Background time finalizes; foreground timer restarts |
