import * as SecureStore from 'expo-secure-store'

const KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  DEVICE_ID: 'device_id',
  USER_SETTINGS: 'user_settings',
} as const

export async function secureSetItem(key: string, value: string): Promise<void> {
  await SecureStore.setItemAsync(key, value)
}

export async function secureGetItem(key: string): Promise<string | null> {
  return SecureStore.getItemAsync(key)
}

export async function secureDeleteItem(key: string): Promise<void> {
  await SecureStore.deleteItemAsync(key)
}

export async function storeAuthToken(token: string): Promise<void> {
  await secureSetItem(KEYS.AUTH_TOKEN, token)
}

export async function getAuthToken(): Promise<string | null> {
  return secureGetItem(KEYS.AUTH_TOKEN)
}

export async function clearAuth(): Promise<void> {
  await secureDeleteItem(KEYS.AUTH_TOKEN)
  await secureDeleteItem(KEYS.REFRESH_TOKEN)
}

export { KEYS }
