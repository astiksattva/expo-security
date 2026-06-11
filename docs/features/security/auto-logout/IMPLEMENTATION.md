# Auto Logout Implementation

## Architecture

- Configurable timeout (default 15 minutes)
- Configurable warning period (default 1 minute before timeout)
- Last activity timestamp stored in SecureStore
- Periodic timer checks elapsed time
- AppState listener to handle foreground/background transitions
- Callbacks for timeout and warning events

## Flow

1. App starts → configureAutoLogout(config)
2. User interacts → recordActivity() (updates timestamp)
3. Timer ticks every 1s → checks elapsed time
4. Elapsed > (timeout - warning) → onWarning callback
5. Elapsed > timeout → onTimeout callback → stop monitor
6. App foreground → recordActivity() automatically

## Key Decisions

- Timer-based (1s interval) for real-time accuracy
- SecureStore persistence to survive app restarts
- Separate start/stop lifecycle management
- Warning state tracking to avoid repeated warnings
