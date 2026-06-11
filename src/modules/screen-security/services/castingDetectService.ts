import { isIOS, isAndroid } from '../../../utils/platform'
import { FeatureError, logError } from '../../../utils/errors'

export interface CastingDetectionResult {
  isCasting: boolean
  platform: string
  method: 'native' | 'unavailable'
  details: string
}

export async function checkCastingStatus(): Promise<CastingDetectionResult> {
  if (isIOS) {
    try {
      const ScreenCapture = require('expo-screen-capture')
      if (typeof ScreenCapture.isCapturedAsync === 'function') {
        const captured = await ScreenCapture.isCapturedAsync()
        return {
          isCasting: captured,
          platform: 'ios',
          method: 'native',
          details: captured
            ? 'Screen is being mirrored or recorded'
            : 'No casting detected',
        }
      }
    } catch (error) {
      logError('casting-detect', error)
    }
    return {
      isCasting: false,
      platform: 'ios',
      method: 'unavailable',
      details: 'isCapturedAsync not available in this version',
    }
  }

  if (isAndroid) {
    return {
      isCasting: false,
      platform: 'android',
      method: 'unavailable',
      details:
        'Android casting detection requires native module (DisplayManager)',
    }
  }

  return {
    isCasting: false,
    platform: 'web',
    method: 'unavailable',
    details: 'Screen casting detection not available on web',
  }
}

export function isCastingDetectionAvailable(): boolean {
  return false
}

export function getCastingDetectionMethods(): string[] {
  const methods: string[] = []
  if (isIOS) {
    methods.push('UIScreen.isCaptured')
  }
  if (isAndroid) {
    methods.push('DisplayManager.DisplayListener (native module required)')
    methods.push('MediaRouter (native module required)')
  }
  return methods
}
