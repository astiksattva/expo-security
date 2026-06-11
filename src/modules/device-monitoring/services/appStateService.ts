import { AppState, AppStateStatus } from 'react-native'
import { logError } from '../../../utils/errors'
import { AppStateInfo, AppVisibilityState, MONITORING_ERRORS } from '../types'

const FEATURE_ID = 'app-state-monitoring'

function mapAppState(state: AppStateStatus): AppVisibilityState {
  switch (state) {
    case 'active':
      return 'active'
    case 'inactive':
      return 'inactive'
    case 'background':
      return 'background'
    default:
      return 'unknown'
  }
}

let appStartTime = Date.now()
let backgroundStartTime: number | null = null
let totalBackgroundTime = 0
let totalForegroundTime = 0

export function getAppStateInfo(): AppStateInfo {
  const currentState = mapAppState(AppState.currentState)
  return {
    state: currentState,
    previousState: null,
    timeInBackground: totalBackgroundTime,
    timeInForeground: totalForegroundTime,
  }
}

export function subscribeToAppStateChanges(
  callback: (info: AppStateInfo) => void,
): () => void {
  let previousState: AppVisibilityState | null = null

  const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
    try {
      const nextState = mapAppState(nextAppState)
      const now = Date.now()

      if (previousState === 'active' && nextState === 'background') {
        backgroundStartTime = now
        totalForegroundTime += now - appStartTime
      } else if (previousState === 'background' && nextState === 'active') {
        appStartTime = now
        if (backgroundStartTime !== null) {
          totalBackgroundTime += now - backgroundStartTime
          backgroundStartTime = null
        }
      }

      const info: AppStateInfo = {
        state: nextState,
        previousState,
        timeInBackground: totalBackgroundTime,
        timeInForeground: totalForegroundTime,
      }

      previousState = nextState
      callback(info)
    } catch (error) {
      logError(FEATURE_ID, error)
    }
  })

  previousState = mapAppState(AppState.currentState)

  return () => {
    subscription.remove()
  }
}

export function resetAppStateTimers(): void {
  appStartTime = Date.now()
  backgroundStartTime = null
  totalBackgroundTime = 0
  totalForegroundTime = 0
}

export function isAppInForeground(): boolean {
  const state = mapAppState(AppState.currentState)
  return state === 'active'
}
