# Interview Notes

## Key Talking Points

- Raw accelerometer provides `{x, y, z}` in m/s² (including gravity ≈ 9.8 on Z)
- Compute magnitude via Euclidean norm: `sqrt(x² + y² + z²)`
- Threshold-based detection with cooldown prevents event spam
- Works in Expo Go on both iOS and Android

## Common Questions

**Q**: How do you distinguish a shake from normal movement?
**A**: Threshold (magnitude > 1.5x gravity deviation). Normal handling ≈ 1.2-1.5; shake > 2.0.

**Q**: What about gravity compensation?
**A**: Substract 9.8 from z-axis before magnitude calculation for better sensitivity.

**Q**: Can you detect shake direction?
**A**: Yes — analyze which axis had largest acceleration (left-right vs up-down).

**Q**: Why use `isShaking` auto-reset?
**A**: UX feedback: shake event is instantaneous; UI needs brief visual indication.
