import * as LocalAuthentication from 'expo-local-authentication'
import { isAndroid, isIOS } from '../../../utils/platform'
import { FeatureError, logError } from '../../../utils/errors'
import { BiometricAuthResult, BiometricStatus, BiometricType, AUTH_ERRORS } from '../types'

const FEATURE_ID = 'fingerprint'

export async function getFingerprintStatus(): Promise<BiometricStatus> {
  try {
    if (!isAndroid && !isIOS) {
      return { isAvailable: false, isEnrolled: false }
    }

    const compatible = await LocalAuthentication.hasHardwareAsync()
    if (!compatible) {
      return { isAvailable: false, isEnrolled: false }
    }

    const enrolled = await LocalAuthentication.isEnrolledAsync()
    const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync()

    let biometryType: BiometricType | undefined
    const hasFingerprint = supportedTypes.includes(
      LocalAuthentication.AuthenticationType.FINGERPRINT,
    )
    if (hasFingerprint) {
      biometryType = 'fingerprint'
    }

    return {
      isAvailable: compatible && enrolled,
      isEnrolled: enrolled,
      biometryType,
    }
  } catch (error) {
    logError(FEATURE_ID, error)
    return { isAvailable: false, isEnrolled: false }
  }
}

export async function authenticateFingerprint(): Promise<BiometricAuthResult> {
  try {
    const status = await getFingerprintStatus()
    if (!status.isAvailable) {
      return { success: false, error: AUTH_ERRORS.HARDWARE_UNAVAILABLE }
    }
    if (!status.isEnrolled) {
      return { success: false, error: AUTH_ERRORS.NOT_ENROLLED }
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate with fingerprint',
      cancelLabel: 'Cancel',
      disableDeviceFallback: true,
    })

    if (result.success) {
      return { success: true, biometricType: 'fingerprint' }
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
    const message = error instanceof FeatureError ? error.message : AUTH_ERRORS.AUTHENTICATION_FAILED
    return { success: false, error: message }
  }
}
