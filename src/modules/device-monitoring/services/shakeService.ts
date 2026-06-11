import { Accelerometer, AccelerometerMeasurement } from 'expo-sensors'
import { logError } from '../../../utils/errors'
import { MONITORING_ERRORS } from '../types'

const FEATURE_ID = 'shake-detection'

const DEFAULT_THRESHOLD = 1.5
const DEFAULT_UPDATE_INTERVAL = 100
const SHAKE_COOLDOWN_MS = 500

export interface ShakeDetectionConfig {
  threshold?: number
  updateInterval?: number
  cooldownMs?: number
}

export interface ShakeEvent {
  timestamp: number
  acceleration: number
}

type ShakeCallback = (event: ShakeEvent) => void

export async function isAccelerometerAvailable(): Promise<boolean> {
  try {
    const isAvailable = await Accelerometer.isAvailableAsync()
    return isAvailable
  } catch (error) {
    logError(FEATURE_ID, error)
    return false
  }
}

export function startShakeDetection(
  onShake: ShakeCallback,
  config: ShakeDetectionConfig = {},
): () => void {
  const threshold = config.threshold ?? DEFAULT_THRESHOLD
  const cooldownMs = config.cooldownMs ?? SHAKE_COOLDOWN_MS

  Accelerometer.setUpdateInterval(config.updateInterval ?? DEFAULT_UPDATE_INTERVAL)

  let lastShakeTime = 0

  const subscription = Accelerometer.addListener((measurement: AccelerometerMeasurement) => {
    const { x, y, z } = measurement
    const acceleration = Math.sqrt(x * x + y * y + z * z)
    const now = Date.now()

    if (acceleration > threshold && now - lastShakeTime > cooldownMs) {
      lastShakeTime = now
      onShake({ timestamp: now, acceleration })
    }
  })

  return () => {
    subscription.remove()
  }
}

export function stopShakeDetection(subscription: { remove: () => void }): void {
  try {
    subscription.remove()
  } catch (error) {
    logError(FEATURE_ID, error)
  }
}

export async function checkShakeAvailability(): Promise<{ available: boolean; error: string | null }> {
  try {
    const available = await isAccelerometerAvailable()
    return {
      available,
      error: available ? null : MONITORING_ERRORS.SHAKE_UNAVAILABLE,
    }
  } catch (error) {
    logError(FEATURE_ID, error)
    return { available: false, error: MONITORING_ERRORS.SHAKE_UNAVAILABLE }
  }
}
