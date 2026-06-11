import * as LocalAuthentication from 'expo-local-authentication'
import { isIOS, isAndroid } from '../../../utils/platform'
import { logError } from '../../../utils/errors'
import { BiometricAuthResult, AUTH_ERRORS } from '../types'

const FEATURE_ID = 'device-credential'

export async function isDeviceCredentialAvailable(): Promise<boolean> {
  try {
    if (!isIOS && !isAndroid) {
      return false
    }
    return LocalAuthentication.hasHardwareAsync()
  } catch (error) {
    logError(FEATURE_ID, error)
    return false
  }
}

export async function authenticateWithDeviceCredential(): Promise<BiometricAuthResult> {
  try {
    const available = await isDeviceCredentialAvailable()
    if (!available) {
      return { success: false, error: AUTH_ERRORS.HARDWARE_UNAVAILABLE }
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Enter device passcode',
      cancelLabel: 'Cancel',
      disableDeviceFallback: false,
    })

    if (result.success) {
      return { success: true }
    }

    if (result.error === 'user_cancel') {
      return { success: false, error: AUTH_ERRORS.CANCELLED }
    }
    if (result.error === 'lockout') {
      return { success: false, error: AUTH_ERRORS.LOCKOUT }
    }

    return { success: false, error: AUTH_ERRORS.AUTHENTICATION_FAILED }
  } catch (error) {
    logError(FEATURE_ID, error)
    return { success: false, error: AUTH_ERRORS.AUTHENTICATION_FAILED }
  }
}
