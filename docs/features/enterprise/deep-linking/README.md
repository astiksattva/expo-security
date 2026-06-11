# Deep Linking

Handle deep links into the app using `expo-linking`.

## Features

- Create deep links with custom scheme
- Parse incoming deep links
- Listen for deep link events
- Get initial deep link (cold start)
- Open external URLs
- Check URL availability
- Expo Router linking configuration

## Expo Compatibility

| Environment | Support |
|-------------|---------|
| Expo Go | Yes |
| Development Build | Yes |
| EAS Build | Yes |
| Native Prebuild Required | No |

## Platform Support

| Platform | Support |
|----------|---------|
| iOS | Yes |
| Android | Yes |
| Web | Yes |

## API

### Services

- `createDeepLink(path)` — Create deep link URL with app scheme
- `parseDeepLink(url)` — Parse deep link into structured object
- `getInitialURL()` — Get initial URL (cold start)
- `addURLListener(handler)` — Listen for incoming deep links
- `getLinkingConfig()` — Expo Router linking configuration

### Hooks

- `useDeepLinking()` — Deep link state management

### Types

- `DeepLink` — Parsed deep link structure
