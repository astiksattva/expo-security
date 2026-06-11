import * as Application from 'expo-application'
import {
  secureSetItem,
  secureGetItem,
  secureDeleteItem,
} from '../../../store/secureStore'
import { isAndroid, isIOS } from '../../../utils/platform'
import { logError } from '../../../utils/errors'
import {
  DeviceBindingInfo,
  DeviceBindingStatus,
  BindingConfig,
  SECURITY_ERRORS,
} from '../types'

const FEATURE_ID = 'device-binding'

const DEFAULT_CONFIG: BindingConfig = {
  requireBinding: false,
  verifyOnLaunch: true,
}

const BINDING_KEY = 'device_binding'
const DEVICE_ID_KEY = 'bound_device_id'

let bindingConfig: BindingConfig = { ...DEFAULT_CONFIG }
let cachedDeviceId: string | null = null

export function configureDeviceBinding(config: Partial<BindingConfig>): void {
  bindingConfig = { ...bindingConfig, ...config }
}

export async function getDeviceId(): Promise<string | null> {
  try {
    if (cachedDeviceId) return cachedDeviceId

    if (isAndroid) {
      const androidId = await Application.getAndroidId()
      cachedDeviceId = androidId
      return androidId
    }

    if (isIOS) {
      const iosId = await Application.getIosIdForVendorAsync()
      cachedDeviceId = iosId
      return iosId
    }

    return null
  } catch (error) {
    logError(FEATURE_ID, error)
    return null
  }
}

export async function bindDevice(token: string): Promise<boolean> {
  try {
    const deviceId = await getDeviceId()
    if (!deviceId) {
      throw new Error(SECURITY_ERRORS.DEVICE_NOT_BOUND)
    }

    const binding: DeviceBindingInfo = {
      deviceId,
      boundAt: Date.now(),
      lastVerified: Date.now(),
    }

    await secureSetItem(BINDING_KEY, JSON.stringify(binding))
    await secureSetItem(DEVICE_ID_KEY, deviceId)

    return true
  } catch (error) {
    logError(FEATURE_ID, error)
    return false
  }
}

export async function getBindingInfo(): Promise<DeviceBindingInfo | null> {
  try {
    const data = await secureGetItem(BINDING_KEY)
    if (!data) return null
    return JSON.parse(data) as DeviceBindingInfo
  } catch (error) {
    logError(FEATURE_ID, error)
    return null
  }
}

export async function verifyBinding(): Promise<DeviceBindingStatus> {
  try {
    const binding = await getBindingInfo()
    if (!binding) {
      return { isBound: false, isVerified: false, deviceId: null }
    }

    const currentDeviceId = await getDeviceId()
    const isVerified = currentDeviceId === binding.deviceId

    if (isVerified) {
      binding.lastVerified = Date.now()
      await secureSetItem(BINDING_KEY, JSON.stringify(binding))
    }

    return {
      isBound: true,
      isVerified,
      deviceId: binding.deviceId,
    }
  } catch (error) {
    logError(FEATURE_ID, error)
    return { isBound: false, isVerified: false, deviceId: null }
  }
}

export async function unbindDevice(): Promise<void> {
  try {
    await secureDeleteItem(BINDING_KEY)
    await secureDeleteItem(DEVICE_ID_KEY)
    cachedDeviceId = null
  } catch (error) {
    logError(FEATURE_ID, error)
  }
}

export function isDeviceBindingSupported(): boolean {
  return isAndroid || isIOS
}

export function getBindingConfig(): BindingConfig {
  return { ...bindingConfig }
}
