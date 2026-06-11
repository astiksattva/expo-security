import { isAndroid } from '../../../utils/platform'
import { logError } from '../../../utils/errors'
import { DevModeDetectResult, DEVICE_SECURITY_ERRORS } from '../types'

const FEATURE_ID = 'dev-mode-detect'

async function checkSettingsGlobal(): Promise<string[]> {
  const detections: string[] = []
  if (!isAndroid) return detections

  try {
    const { NativeModules } = require('react-native')
    const DevSettings = NativeModules.DevSettings

    if (DevSettings) {
      detections.push('Developer settings native module is available')
    }
  } catch {
  }

  return detections
}

async function checkAdbEnabled(): Promise<string[]> {
  const detections: string[] = []
  if (!isAndroid) return detections

  try {
    const { Platform } = require('react-native')
    const IntentLauncher = require('expo-intent-launcher')

    const result = await IntentLauncher.startActivityAsync(
      'android.settings.APPLICATION_DEVELOPMENT_SETTINGS',
    )

    if (result.resultCode === 'ok') {
      detections.push('Developer settings activity available')
    }
  } catch {
  }

  return detections
}

async function checkBuildProperties(): Promise<string[]> {
  const detections: string[] = []
  if (!isAndroid) return detections

  try {
    const Constants = require('expo-constants')
    const manifest = Constants.default?.manifest || Constants.default?.expoConfig

    if (manifest?.android?.package) {
      try {
        const Application = require('expo-application')
        if (Application.androidId) {
          detections.push('Application androidId accessible (dev mode indicator)')
        }
      } catch {
      }
    }
  } catch {
  }

  return detections
}

async function checkDevOptionsEnabled(): Promise<string[]> {
  const detections: string[] = []
  if (!isAndroid) return detections

  try {
    const { NativeModules } = require('react-native')
    const UIManager = NativeModules.UIManager

    if (UIManager?.getConstants?.()?.extra?.['enableDevMenu']) {
      detections.push('Dev menu is enabled')
    }
  } catch {
  }

  return detections
}

export async function checkDevModeStatus(): Promise<DevModeDetectResult> {
  try {
    if (!isAndroid) {
      return {
        isDevModeEnabled: false,
        detections: [],
      }
    }

    const [
      settingsDetections,
      adbDetections,
      buildDetections,
      devMenuDetections,
    ] = await Promise.all([
      checkSettingsGlobal(),
      checkAdbEnabled(),
      checkBuildProperties(),
      checkDevOptionsEnabled(),
    ])

    const allDetections = [
      ...settingsDetections,
      ...adbDetections,
      ...buildDetections,
      ...devMenuDetections,
    ]

    return {
      isDevModeEnabled: allDetections.length > 0,
      detections: allDetections,
    }
  } catch (error) {
    logError(FEATURE_ID, error)
    throw new Error(DEVICE_SECURITY_ERRORS.DETECTION_FAILED)
  }
}

export async function checkDevModeStatusSafe(): Promise<DevModeDetectResult> {
  try {
    return await checkDevModeStatus()
  } catch {
    return {
      isDevModeEnabled: false,
      detections: [],
    }
  }
}
