import { AppState, AppStateStatus } from 'react-native'
import { secureSetItem, secureGetItem } from '../../../store/secureStore'
import { logError } from '../../../utils/errors'
import {
  AutoLogoutConfig,
  AutoLogoutStatus,
  InactivityWarning,
} from '../types'

const FEATURE_ID = 'auto-logout'

const DEFAULT_CONFIG: AutoLogoutConfig = {
  timeoutMs: 15 * 60 * 1000,
  warningMs: 60 * 1000,
  enabled: true,
}

const LAST_ACTIVITY_KEY = 'auto_logout_last_activity'
const TIMER_INTERVAL = 1000

let config: AutoLogoutConfig = { ...DEFAULT_CONFIG }
let timerId: ReturnType<typeof setInterval> | null = null
let appStateSubscription: { remove: () => void } | null = null
let onTimeoutCallback: (() => void) | null = null
let onWarningCallback: ((warning: InactivityWarning) => void) | null = null
let warningShown = false

export function configureAutoLogout(cfg: Partial<AutoLogoutConfig>): void {
  config = { ...config, ...cfg }
}

export async function recordActivity(): Promise<void> {
  try {
    const now = Date.now()
    await secureSetItem(LAST_ACTIVITY_KEY, String(now))
    warningShown = false
  } catch (error) {
    logError(FEATURE_ID, error)
  }
}

export async function getLastActivity(): Promise<number | null> {
  try {
    const value = await secureGetItem(LAST_ACTIVITY_KEY)
    return value ? Number(value) : null
  } catch (error) {
    logError(FEATURE_ID, error)
    return null
  }
}

export async function getAutoLogoutStatus(): Promise<AutoLogoutStatus> {
  try {
    const lastActivity = await getLastActivity()
    if (!lastActivity) {
      return { isTimedOut: false, lastActivity: null, timeRemaining: null }
    }

    const elapsed = Date.now() - lastActivity
    const timeRemaining = Math.max(0, config.timeoutMs - elapsed)
    const isTimedOut = elapsed >= config.timeoutMs

    return { isTimedOut, lastActivity, timeRemaining }
  } catch (error) {
    logError(FEATURE_ID, error)
    return { isTimedOut: false, lastActivity: null, timeRemaining: null }
  }
}

export function checkInactivity(): InactivityWarning {
  const threshold = config.timeoutMs - config.warningMs
  const lastActivity = Date.now()
  const elapsed = lastActivity - (lastActivity - 1000)
  const timeUntilLogout = config.timeoutMs - elapsed
  const showWarning = !warningShown && elapsed >= threshold

  if (showWarning) {
    warningShown = true
  }

  return { showWarning, timeUntilLogout }
}

export function startAutoLogoutMonitor(
  onTimeout: () => void,
  onWarning?: (warning: InactivityWarning) => void,
): void {
  if (!config.enabled) return

  onTimeoutCallback = onTimeout
  onWarningCallback = onWarning ?? null

  if (timerId) return

  timerId = setInterval(async () => {
    try {
      const status = await getAutoLogoutStatus()
      if (status.isTimedOut) {
        onTimeoutCallback?.()
        stopAutoLogoutMonitor()
        return
      }

      if (onWarningCallback && !warningShown) {
        const threshold = Date.now() - status.lastActivity!
        if (threshold >= config.timeoutMs - config.warningMs) {
          const warning: InactivityWarning = {
            showWarning: true,
            timeUntilLogout: status.timeRemaining!,
          }
          onWarningCallback(warning)
          warningShown = true
        }
      }
    } catch (error) {
      logError(FEATURE_ID, error)
    }
  }, TIMER_INTERVAL)

  appStateSubscription = AppState.addEventListener(
    'change',
    handleAppStateChange,
  )
}

function handleAppStateChange(nextState: AppStateStatus): void {
  if (nextState === 'active') {
    recordActivity()
  }
}

export function stopAutoLogoutMonitor(): void {
  if (timerId) {
    clearInterval(timerId)
    timerId = null
  }
  appStateSubscription?.remove()
  appStateSubscription = null
  onTimeoutCallback = null
  onWarningCallback = null
}

export function resetAutoLogout(): void {
  warningShown = false
  recordActivity()
}

export function getAutoLogoutConfig(): AutoLogoutConfig {
  return { ...config }
}
