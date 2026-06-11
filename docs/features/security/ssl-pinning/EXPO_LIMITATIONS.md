# SSL Pinning Expo Limitations

## Expo Go
- Not supported - no native module access
- Cannot intercept network requests at native layer

## Expo Dev Builds
- Can use native modules
- react-native-quick-crypto available
- Network layer still JS-based, not true pinning

## EAS Build
- Full native module support
- Can integrate TrustKit / okhttp
- Recommend native SSL pinning libraries

## Workarounds
- Use runtime hash comparison as educational demo
- Consider react-native-ssl-pinning for production
- For simple apps, rely on system HTTPS validation
