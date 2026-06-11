# Expo Limitations — Analytics

## Expo Go

- Full analytics support (custom implementation)
- No external dependency required

## Development Build

- Full support

## EAS Build

- Full support

## Native Prebuild Required

No — analytics is a custom implementation

## Known Limitations

- In-memory storage: Events lost on app restart
- No persistence layer (would need AsyncStorage or SecureStore)
- No batching configuration (fixed at 1000 events)
- No automatic retry with exponential backoff
- No built-in analytics SDK features (funnels, retention, etc.)
- Limited to custom implementation (no Amplitude/Mixpanel/etc.)
- No offline queue persistence
- No event sampling or throttling
- No GDPR/CCPA compliance built-in
