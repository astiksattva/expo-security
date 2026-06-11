import * as Device from 'expo-device'
import { isAndroid, isIOS } from '../../../utils/platform'
import { logError } from '../../../utils/errors'
import { EmulatorDetectResult, DEVICE_SECURITY_ERRORS } from '../types'

const FEATURE_ID = 'emulator-detect'

const KNOWN_EMULATOR_MODELS: string[] = [
  'sdk_gphone64_arm64',
  'sdk_gphone64_x86_64',
  'sdk_gphone_arm64',
  'sdk_gphone_x86',
  'sdk_phone_arm64',
  'sdk_phone_x86',
  'Android SDK built for x86',
  'Android SDK built for x86_64',
  'emu64a',
  'emu64x',
  'generic_x86',
  'generic_x86_64',
  'generic_arm64',
  'generic',
]

const KNOWN_EMULATOR_BRANDS: string[] = [
  'google',
  'android',
  'generic',
]

const KNOWN_SIMULATOR_MODELS: string[] = [
  'iPhone Simulator',
  'iPad Simulator',
  'Apple Simulator',
  'Simulator',
  'i386',
  'x86_64',
  'arm64',
]

async function getDeviceInfo(): Promise<EmulatorDetectResult> {
  const detections: string[] = []

  const basicCheck = Device.isDevice
  if (!basicCheck) {
    detections.push('expo-device reports this is not a physical device')
  }

  const modelName = Device.modelName
  const brand = Device.brand

  if (isAndroid && modelName) {
    const modelMatch = KNOWN_EMULATOR_MODELS.some(
      (model) => modelName.toLowerCase().includes(model.toLowerCase()),
    )
    if (modelMatch) {
      detections.push(`Device model matches known emulator model: ${modelName}`)
    }

    if (brand) {
      const brandMatch = KNOWN_EMULATOR_BRANDS.some(
        (b) => brand.toLowerCase().includes(b),
      )
      if (brandMatch && !basicCheck) {
        detections.push(`Device brand matches known emulator brand: ${brand}`)
      }
    }
  }

  if (isIOS && modelName) {
    const simMatch = KNOWN_SIMULATOR_MODELS.some(
      (model) => modelName.includes(model),
    )
    if (simMatch) {
      detections.push(`Device model matches simulator: ${modelName}`)
    }
  }

  return {
    isEmulator: detections.length > 0,
    detections,
  }
}

async function checkEmulatorProperties(): Promise<string[]> {
  const detections: string[] = []
  if (!isAndroid) return detections

  try {
    const Constants = require('expo-constants')
    const appOwnership = Constants.default?.appOwnership
    if (appOwnership === 'expo' && !Device.isDevice) {
      detections.push('Running in Expo Go on an emulator')
    }
  } catch {
  }

  return detections
}

export async function checkEmulatorStatus(): Promise<EmulatorDetectResult> {
  try {
    const [deviceInfo, extraDetections] = await Promise.all([
      getDeviceInfo(),
      checkEmulatorProperties(),
    ])

    return {
      isEmulator: deviceInfo.isEmulator || extraDetections.length > 0,
      detections: [...deviceInfo.detections, ...extraDetections],
    }
  } catch (error) {
    logError(FEATURE_ID, error)
    return {
      isEmulator: false,
      detections: [],
    }
  }
}
