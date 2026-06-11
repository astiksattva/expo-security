import * as ScreenCapture from 'expo-screen-capture'
import { Subscription } from 'expo-screen-capture'
import { FeatureError, logError } from '../../../utils/errors'

export type ScreenshotCallback = () => void

export function subscribeToScreenshots(callback: ScreenshotCallback): Subscription {
  try {
    return ScreenCapture.addScreenshotListener(callback)
  } catch (error) {
    logError('screenshot-detect', error)
    throw new FeatureError(
      'Failed to subscribe to screenshot events',
      'screenshot-detect',
      error,
    )
  }
}

export function unsubscribeFromScreenshots(
  subscription: Subscription | null,
): void {
  if (subscription) {
    try {
      subscription.remove()
    } catch (error) {
      logError('screenshot-detect', error)
    }
  }
}
