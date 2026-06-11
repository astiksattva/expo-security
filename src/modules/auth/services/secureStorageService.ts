import * as SecureStore from 'expo-secure-store'
import { isWeb } from '../../../utils/platform'
import { logError } from '../../../utils/errors'
import { SecureStorageResult, AUTH_ERRORS } from '../types'

const FEATURE_ID = 'secure-storage'

export async function secureWrite(key: string, value: string): Promise<SecureStorageResult> {
  try {
    if (isWeb) {
      return { success: false, error: AUTH_ERRORS.NOT_SUPPORTED_ON_PLATFORM }
    }
    await SecureStore.setItemAsync(key, value)
    return { success: true, value }
  } catch (error) {
    logError(FEATURE_ID, error)
    return { success: false, error: AUTH_ERRORS.STORAGE_WRITE_FAILED }
  }
}

export async function secureRead(key: string): Promise<SecureStorageResult> {
  try {
    if (isWeb) {
      return { success: false, error: AUTH_ERRORS.NOT_SUPPORTED_ON_PLATFORM }
    }
    const value = await SecureStore.getItemAsync(key)
    return { success: true, value: value ?? undefined }
  } catch (error) {
    logError(FEATURE_ID, error)
    return { success: false, error: AUTH_ERRORS.STORAGE_READ_FAILED }
  }
}

export async function secureDelete(key: string): Promise<SecureStorageResult> {
  try {
    if (isWeb) {
      return { success: false, error: AUTH_ERRORS.NOT_SUPPORTED_ON_PLATFORM }
    }
    await SecureStore.deleteItemAsync(key)
    return { success: true }
  } catch (error) {
    logError(FEATURE_ID, error)
    return { success: false, error: AUTH_ERRORS.STORAGE_DELETE_FAILED }
  }
}

export async function secureKeyExists(key: string): Promise<boolean> {
  try {
    if (isWeb) {
      return false
    }
    const value = await SecureStore.getItemAsync(key)
    return value !== null
  } catch {
    return false
  }
}
