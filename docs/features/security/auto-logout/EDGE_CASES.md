# Auto Logout Edge Cases

## App Lifecycle
- App backgrounded → timer continues (or pause?)
- App killed → activity lost, fresh start
- App foreground after long absence → immediate timeout
- Multi-task switching → timer state

## Time Adjustments
- Device clock changes (manual, timezone)
- DST transitions
- Device sleep/wake cycle

## User Interactions
- Passive activity (watching video) vs active interaction
- Background audio playback
- Navigation within app (should reset timer)
- Form filling without network calls

## Configuration
- Zero timeout (immediate logout)
- Very short timeout (< warning period)
- Disabled/enabled toggle races

## Platform
- iOS background execution limits
- Android Doze mode interference
- Web tab visibility changes
