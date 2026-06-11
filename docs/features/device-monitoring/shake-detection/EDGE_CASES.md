# Edge Cases

| Case | Behavior |
|------|----------|
| No accelerometer (iPad 1st gen, some Android tablets) | `isAvailable` = false |
| Accelerometer permissions denied (iOS 14.5+) | `addListener` may not fire |
| Very sensitive threshold (< 1.0) | False positives from normal handling |
| Very insensitive threshold (> 3.0) | Only violent shakes detected |
| Multiple shakes in cooldown | Only first shake registered; cooldown starts from last shake |
| App backgrounded while monitoring | Accelerometer data continues, callback fires on foreground |
| Rapid shake | Each shake increments count if cooldown elapsed |
| Device flat on table | `z ≈ 9.8` (gravity); `sqrt(x²+y²+z²) ≈ 9.8` — will not trigger unless threshold > 9.8 or device moves |
