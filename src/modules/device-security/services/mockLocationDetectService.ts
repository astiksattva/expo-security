import { isAndroid } from '../../../utils/platform'
import { logError } from '../../../utils/errors'
import { MockLocationDetectResult, DEVICE_SECURITY_ERRORS } from '../types'

const FEATURE_ID = 'mock-location-detect'

async function checkSettingsAllowMockLocation(): Promise<string[]> {
  const detections: string[] = []
  if (!isAndroid) return detections

  try {
    const { NativeModules } = require('react-native')
    const SettingsManager = NativeModules.SettingsManager

    if (SettingsManager?.settings) {
      const mockLocation = SettingsManager.settings['mock_location']
      if (mockLocation === '1' || mockLocation === 1 || mockLocation === true) {
        detections.push('Allow mock location setting is enabled')
      }

      const adbEnabled = SettingsManager.settings['adb_enabled']
      if (adbEnabled === '1' || adbEnabled === 1 || adbEnabled === true) {
        detections.push('ADB is enabled (mock location may be available)')
      }
    }
  } catch {
  }

  return detections
}

async function checkLocationProviders(): Promise<string[]> {
  const detections: string[] = []
  if (!isAndroid) return detections

  try {
    const Location = require('expo-location')
    const providers = await Location.getProviderStatusAsync()

    if (providers.locationServicesEnabled && providers.gpsAvailable) {
      const mockProvider = providers.mockLocationProvider
      if (mockProvider) {
        detections.push('Mock location provider is active in location services')
      }
    }
  } catch {
  }

  return detections
}

async function checkContentResolver(): Promise<string[]> {
  const detections: string[] = []
  if (!isAndroid) return detections

  try {
    const { NativeModules } = require('react-native')
    const ContentResolver = NativeModules.ContentResolver

    if (ContentResolver) {
      const mockLocationAllowed = await ContentResolver.querySecureSetting?.(
        'mock_location',
      )
      if (mockLocationAllowed === '1') {
        detections.push('ContentResolver confirms mock location is allowed')
      }
    }
  } catch {
  }

  return detections
}

async function checkDevOptionsForMockLocation(): Promise<string[]> {
  const detections: string[] = []
  if (!isAndroid) return detections

  try {
    const { NativeModules } = require('react-native')
    const UIManager = NativeModules.UIManager

    if (UIManager?.getConstants?.()?.extra?.['mockLocation']) {
      detections.push('Dev settings indicate mock location may be active')
    }
  } catch {
  }

  return detections
}

export async function checkMockLocationStatus(): Promise<MockLocationDetectResult> {
  try {
    if (!isAndroid) {
      return {
        isMockLocationEnabled: false,
        detections: [],
      }
    }

    const [
      settingsDetections,
      locationDetections,
      contentResolverDetections,
      devOptionsDetections,
    ] = await Promise.all([
      checkSettingsAllowMockLocation(),
      checkLocationProviders(),
      checkContentResolver(),
      checkDevOptionsForMockLocation(),
    ])

    const allDetections = [
      ...settingsDetections,
      ...locationDetections,
      ...contentResolverDetections,
      ...devOptionsDetections,
    ]

    return {
      isMockLocationEnabled: allDetections.length > 0,
      detections: allDetections,
    }
  } catch (error) {
    logError(FEATURE_ID, error)
    throw new Error(DEVICE_SECURITY_ERRORS.DETECTION_FAILED)
  }
}

export async function checkMockLocationStatusSafe(): Promise<MockLocationDetectResult> {
  try {
    return await checkMockLocationStatus()
  } catch {
    return {
      isMockLocationEnabled: false,
      detections: [],
    }
  }
}
