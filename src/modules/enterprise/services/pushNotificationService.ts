import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'
import { logError } from '../../../utils/errors'
import {
  NotificationPermission,
  PushToken,
  NotificationData,
  ENTERPRISE_ERRORS,
} from '../types'

const FEATURE_ID = 'push-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
})

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }

    if (finalStatus !== 'granted') {
      return { granted: false, status: finalStatus as NotificationPermission['status'] }
    }

    return { granted: true, status: 'granted' }
  } catch (error) {
    logError(FEATURE_ID, error)
    return { granted: false, status: 'denied' }
  }
}

export async function getPushToken(): Promise<PushToken> {
  try {
    const { data: token } = await Notifications.getExpoPushTokenAsync()
    return { data: token, type: 'expo' }
  } catch (error) {
    logError(FEATURE_ID, error)
    throw new Error(ENTERPRISE_ERRORS.TOKEN_FAILED)
  }
}

export async function sendLocalNotification(data: NotificationData): Promise<void> {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: data.title,
        body: data.body,
        data: data.data,
      },
      trigger: null,
    })
  } catch (error) {
    logError(FEATURE_ID, error)
    throw new Error(ENTERPRISE_ERRORS.SUBSCRIPTION_FAILED)
  }
}

export function addNotificationListener(
  handler: (notification: Notifications.Notification) => void,
): { remove: () => void } {
  const subscription = Notifications.addNotificationReceivedListener(handler)
  return subscription
}

export function addNotificationResponseListener(
  handler: (response: Notifications.NotificationResponse) => void,
): { remove: () => void } {
  const subscription = Notifications.addNotificationResponseReceivedListener(handler)
  return subscription
}

export function removeNotificationListener(
  subscription: { remove: () => void },
): void {
  subscription.remove()
}

export async function getLastNotificationResponse(): Promise<Notifications.NotificationResponse | null> {
  return Notifications.getLastNotificationResponseAsync()
}

export function getAndroidChannelId(): string {
  if (Platform.OS !== 'android') return ''
  return 'default'
}

export async function setupAndroidChannel(): Promise<void> {
  if (Platform.OS !== 'android') return

  try {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#1a73e8',
    })
  } catch (error) {
    logError(FEATURE_ID, error)
  }
}
