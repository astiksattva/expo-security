import * as Battery from 'expo-battery'
import { logError } from '../../../utils/errors'
import { BatteryState, BatteryChargeState, MONITORING_ERRORS } from '../types'

const FEATURE_ID = 'battery-detection'

function mapBatteryState(state: Battery.BatteryState): BatteryChargeState {
  switch (state) {
    case Battery.BatteryState.CHARGING:
      return 'charging'
    case Battery.BatteryState.FULL:
      return 'full'
    case Battery.BatteryState.UNPLUGGED:
      return 'unplugged'
    default:
      return 'unknown'
  }
}

export async function getBatteryLevel(): Promise<number> {
  try {
    const level = await Battery.getBatteryLevelAsync()
    return level
  } catch (error) {
    logError(FEATURE_ID, error)
    throw new Error(MONITORING_ERRORS.BATTERY_UNAVAILABLE)
  }
}

export async function getBatteryState(): Promise<BatteryState> {
  try {
    const [level, state, lowPowerMode] = await Promise.all([
      Battery.getBatteryLevelAsync(),
      Battery.getBatteryStateAsync(),
      Battery.isLowPowerModeEnabledAsync(),
    ])
    return {
      level,
      isCharging: state === Battery.BatteryState.CHARGING || state === Battery.BatteryState.FULL,
      state: mapBatteryState(state),
      lowPowerMode,
    }
  } catch (error) {
    logError(FEATURE_ID, error)
    throw new Error(MONITORING_ERRORS.BATTERY_UNAVAILABLE)
  }
}

export function subscribeToBatteryLevelChanges(
  callback: (level: number) => void,
): () => void {
  const subscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
    callback(batteryLevel)
  })
  return () => subscription.remove()
}

export function subscribeToBatteryStateChanges(
  callback: (state: BatteryState) => void,
): () => void {
  const stateSubscription = Battery.addBatteryStateListener(({ batteryState }) => {
    const mappedState = mapBatteryState(batteryState)
    Battery.getBatteryLevelAsync().then((level) => {
      callback({
        level,
        isCharging: batteryState === Battery.BatteryState.CHARGING || batteryState === Battery.BatteryState.FULL,
        state: mappedState,
        lowPowerMode: false,
      })
    })
  })
  return () => stateSubscription.remove()
}

export function subscribeToLowPowerModeChanges(
  callback: (lowPowerMode: boolean) => void,
): () => void {
  const subscription = Battery.addLowPowerModeListener(({ lowPowerMode }) => {
    callback(lowPowerMode)
  })
  return () => subscription.remove()
}
