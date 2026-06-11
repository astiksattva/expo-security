import * as ScreenCapture from 'expo-screen-capture'
import { FeatureError, logError } from '../../../utils/errors'

export async function preventScreenshots(): Promise<void> {
  try {
    await ScreenCapture.preventScreenCaptureAsync()
  } catch (error) {
    logError('screenshot-prevent', error)
    throw new FeatureError(
      'Failed to prevent screenshots',
      'screenshot-prevent',
      error,
    )
  }
}

export async function allowScreenshots(): Promise<void> {
  try {
    await ScreenCapture.allowScreenCaptureAsync()
  } catch (error) {
    logError('screenshot-prevent', error)
    throw new FeatureError(
      'Failed to allow screenshots',
      'screenshot-prevent',
      error,
    )
  }
}

export async function isScreenCaptureAvailable(): Promise<boolean> {
  try {
    await ScreenCapture.preventScreenCaptureAsync()
    await ScreenCapture.allowScreenCaptureAsync()
    return true
  } catch {
    return false
  }
}
