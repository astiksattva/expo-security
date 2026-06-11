# Edge Cases

| Case | Behavior |
|------|----------|
| Location disabled (system) | `getCurrentPositionAsync` throws; shown as error |
| Permission denied (user) | `granted` = false, `status` = 'denied' |
| Permission blocked (user) | `canAskAgain` = false, `status` = 'blocked' |
| GPS unavailable (indoor) | Accuracy may be low (>100m) |
| No GPS hardware (WiFi iPad) | Falls back to WiFi-based location |
| Permission revoked while watching | Next position update throws |
| Rapid location changes | `distanceInterval: 10` prevents excessive updates |
| iOS 14+ approximate location | Accuracy may be reduced; check `coords.accuracy` |
| Background location | Not implemented — foreground only |
