# Emulator Detection — Troubleshooting

## Always Shows "Real Device" on Emulator

1. expo-device may not be installed correctly
2. Some third-party emulators (BlueStacks) report as real devices
3. Check `Device.isDevice` value directly in debugger
4. Model name may not match known emulator patterns

## Always Shows "Emulator" on Physical Device

1. Device model name matches an emulator pattern (rare)
2. Check actual model name with `Device.modelName`
3. Some custom ROMs use generic model strings

## expo-device Not Available

1. Run `npx expo install expo-device`
2. Verify in node_modules
3. Clean and rebuild

## Web Platform

Emulator detection is not meaningful on web — returns `isEmulator: false`.

## Debugging

Log the raw device info for troubleshooting:
```typescript
console.log('isDevice:', Device.isDevice)
console.log('modelName:', Device.modelName)
console.log('brand:', Device.brand)
```
