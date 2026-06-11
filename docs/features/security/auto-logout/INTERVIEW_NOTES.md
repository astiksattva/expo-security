# Auto Logout Interview Notes

## Key Concepts
- Inactivity timeout patterns
- Timer vs event-based tracking
- App lifecycle management
- Session vs idle timeout

## Common Questions
1. How is auto logout different from session expiry?
   > Auto logout tracks user activity (idle timeout). Session expiry is
   > token-based (absolute time). They complement each other.

2. Should you pause the timer when app is backgrounded?
   > Depends on requirements. Banking apps count background time. Media
   > apps may pause. Consider the threat model.

3. How do you track user activity efficiently?
   > Touch/click events on a root wrapper. Debounce to avoid excessive
   > writes to secure storage.

4. What happens if the user is watching a long video?
   > Consider exempting certain screens from auto-logout. Or use
   > periodic heartbeats instead of interaction events.
