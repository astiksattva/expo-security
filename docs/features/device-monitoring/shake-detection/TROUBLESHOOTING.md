# Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Accelerometer not available | Device lacks sensor or iOS 14.5+ permission | Handle gracefully; show unavailable message |
| False positives | Threshold too low | Increase from 1.5 to 2.0-3.0 |
| Shakes not detected | Threshold too high | Decrease from 1.5 to 1.2 |
| Delayed response | Update interval too large | Reduce from 100ms to 50ms |
| Multiple events for one shake | Cooldown too short | Increase from 500ms to 800ms |
| No data on iOS Simulator | Simulator lacks accelerometer | Test on physical device |
