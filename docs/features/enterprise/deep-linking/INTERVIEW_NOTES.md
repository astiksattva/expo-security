# Interview Notes — Deep Linking

## Concepts

- URL schemes (custom vs universal)
- Universal Links (iOS)
- App Links (Android)
- Deep link vs deferred deep link
- Cold start vs warm start
- Expo Router linking configuration

## Architecture

```
URL → OS Intent → App → expo-linking → Handler → Navigation
```

Expo Router integrates deep linking with file-based routing.

## Expo Limitations

- Universal links require server config
- Cannot fully customize intent filter behavior
- `expo-linking` is a thin wrapper over platform APIs

## Native Alternatives

- React Navigation deep linking
- Branch.io (deferred deep linking)
- Firebase Dynamic Links (deprecated)
- AppsFlyer, Adjust (attribution + deep linking)

## Interview Questions

1. What's the difference between custom scheme and universal links?
2. How does cold start deep linking work?
3. How do you handle deep links with Expo Router?
4. What security considerations exist for deep linking?
5. How would you test deep links during development?
6. What's the difference between deep linking and deferred deep linking?
7. How do universal links work on iOS?
8. How do app links work on Android?

## Best Practices

- Use universal/app links in production (not custom schemes)
- Validate all deep link parameters
- Handle both cold start and warm start scenarios
- Implement deep link routing centrally
- Log deep link analytics
- Test on real devices
- Document all supported deep link routes
