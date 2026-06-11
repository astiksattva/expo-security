import { Platform } from 'react-native'

export const isIOS = Platform.OS === 'ios'
export const isAndroid = Platform.OS === 'android'
export const isWeb = Platform.OS === 'web'
export const isNative = isIOS || isAndroid

export function platformSelect<T>({ ios, android, default: def }: {
  ios?: T
  android?: T
  default: T
}): T {
  if (isIOS && ios !== undefined) return ios
  if (isAndroid && android !== undefined) return android
  return def
}
