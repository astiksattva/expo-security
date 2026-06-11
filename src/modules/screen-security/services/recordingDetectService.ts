import { isIOS, isAndroid } from '../../../utils/platform'
import { FeatureError, logError } from '../../../utils/errors'

export interface RecordingDetectionResult {
  isRecording: boolean
  platform: string
  method: 'native' | 'unavailable'
}

export async function checkRecordingStatus(): Promise<RecordingDetectionResult> {
  if (isIOS) {
    try {
      const ScreenCapture = require('expo-screen-capture')
      if (typeof ScreenCapture.isCapturedAsync === 'function') {
        const captured = await ScreenCapture.isCapturedAsync()
        return {
          isRecording: captured,
          platform: 'ios',
          method: 'native',
        }
      }
    } catch (error) {
      logError('recording-detect', error)
    }
    return {
      isRecording: false,
      platform: 'ios',
      method: 'unavailable',
    }
  }

  if (isAndroid) {
    return {
      isRecording: false,
      platform: 'android',
      method: 'unavailable',
    }
  }

  return {
    isRecording: false,
    platform: 'web',
    method: 'unavailable',
  }
}

export function isRecordingDetectionAvailable(): boolean {
  return isIOS
}

export function getDetectionStatus(): string {
  if (isIOS) {
    return 'Uses UIScreen.isCaptured via expo-screen-capture'
  }
  if (isAndroid) {
    return 'Not available on Android — use Screenshot Prevention as workaround'
  }
  return 'Not available on web'
}
