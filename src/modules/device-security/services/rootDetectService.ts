import { isAndroid } from '../../../utils/platform'
import { logError } from '../../../utils/errors'
import { RootDetectResult, DEVICE_SECURITY_ERRORS } from '../types'

const FEATURE_ID = 'root-detect'

const ROOT_INDICATORS = [
  '/system/app/Superuser.apk',
  '/sbin/su',
  '/system/bin/su',
  '/system/xbin/su',
  '/data/local/xbin/su',
  '/data/local/bin/su',
  '/system/sd/xbin/su',
  '/system/bin/failsafe/su',
  '/data/local/su',
  '/su/bin/su',
]

const ROOT_MANAGEMENT_APPS = [
  'com.noshufou.android.su',
  'com.noshufou.android.su.elite',
  'eu.chainfire.supersu',
  'com.koushikdutta.superuser',
  'com.thirdparty.superuser',
  'com.yellowes.su',
  'com.topjohnwu.magisk',
  'com.kingroot.kinguser',
  'com.kingo.root',
  'com.smedialink.oneclickroot',
  'com.zhiqupk.root.global',
]

async function checkRootFiles(): Promise<string[]> {
  const found: string[] = []
  if (!isAndroid) return found
  try {
    const RNFS = require('react-native-fs')
    for (const path of ROOT_INDICATORS) {
      try {
        const exists = await RNFS.exists(path)
        if (exists) found.push(`Root binary found: ${path}`)
      } catch {
        continue
      }
    }
  } catch {
    try {
      const { FileSystem } = require('expo-file-system')
      for (const path of ROOT_INDICATORS) {
        try {
          const info = await FileSystem.getInfoAsync(path)
          if (info.exists) found.push(`Root binary found: ${path}`)
        } catch {
          continue
        }
      }
    } catch {
      return found
    }
  }
  return found
}

async function checkSuExecution(): Promise<string[]> {
  const found: string[] = []
  if (!isAndroid) return found
  try {
    const { exec } = require('react-native-exec')
    const result = await exec('which su')
    if (result && result.trim()) {
      found.push('su binary accessible via PATH')
    }
  } catch {
  }
  return found
}

async function checkBuildTags(): Promise<string[]> {
  const found: string[] = []
  if (!isAndroid) return found
  try {
    const Constants = require('expo-constants')
    const tags = Constants.default?.executionEnvironment
    if (tags === 'test') {
      found.push('Build tags indicate test environment')
    }
  } catch {
  }
  return found
}

export async function checkRootStatus(): Promise<RootDetectResult> {
  try {
    if (!isAndroid) {
      return {
        isRooted: false,
        detections: [],
        confidence: 'low',
      }
    }

    const [fileDetections, suDetections, buildDetections] = await Promise.all([
      checkRootFiles(),
      checkSuExecution(),
      checkBuildTags(),
    ])

    const allDetections = [...fileDetections, ...suDetections, ...buildDetections]

    if (allDetections.length === 0) {
      return {
        isRooted: false,
        detections: [],
        confidence: 'low',
      }
    }

    let confidence: RootDetectResult['confidence'] = 'low'
    if (allDetections.length >= 3) confidence = 'high'
    else if (allDetections.length >= 1) confidence = 'medium'

    return {
      isRooted: true,
      detections: allDetections,
      confidence,
    }
  } catch (error) {
    logError(FEATURE_ID, error)
    throw new Error(DEVICE_SECURITY_ERRORS.DETECTION_FAILED)
  }
}

export async function checkRootStatusSafe(): Promise<RootDetectResult> {
  try {
    return await checkRootStatus()
  } catch {
    return {
      isRooted: false,
      detections: [],
      confidence: 'low',
    }
  }
}
