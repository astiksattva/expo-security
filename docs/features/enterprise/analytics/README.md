# Analytics

Track user events and app usage.

## Features

- Event tracking with properties
- In-memory event buffer
- Event flushing to server
- Screen view tracking
- User action tracking
- Event count and log display
- Buffer overflow protection (max 1000 events)

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

- `trackEvent(name, properties?)` — Track an analytics event
- `getBufferedEvents()` — Get all buffered events
- `clearBuffer()` — Clear event buffer
- `flushEvents()` — Send buffered events to server
- `getEventCount()` — Get current event count
- `createScreenViewEvent(screenName)` — Create screen view event
- `createUserActionEvent(action, details?)` — Create user action event

### Hooks

- `useAnalytics()` — Analytics state management

### Types

- `AnalyticsEvent` — Event data structure
