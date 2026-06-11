import * as ScreenCapture from 'expo-screen-capture'
import { isIOS, isAndroid } from '../../../utils/platform'
import { FeatureError, logError } from '../../../utils/errors'

export async function preventRecording(): Promise<void> {
  try {
    await ScreenCapture.preventScreenCaptureAsync()
  } catch (error) {
    logError('recording-prevent', error)
    throw new FeatureError(
      'Failed to prevent screen recording',
      'recording-prevent',
      error,
    )
  }
}

export async function allowRecording(): Promise<void> {
  try {
    await ScreenCapture.allowScreenCaptureAsync()
  } catch (error) {
    logError('recording-prevent', error)
    throw new FeatureError(
      'Failed to allow screen recording',
      'recording-prevent',
      error,
    )
  }
}

export function isRecordingPreventionAvailable(): boolean {
  return isIOS || isAndroid
}

export function getRecordingPreventionDetails(): string {
  if (isIOS) {
    return 'Prevents recording by hiding screen content via secure view'
  }
  if (isAndroid) {
    return 'Prevents recording via FLAG_SECURE window flag'
  }
  return 'Not available on web'
}
