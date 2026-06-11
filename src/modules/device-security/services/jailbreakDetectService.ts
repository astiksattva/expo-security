import { isIOS } from '../../../utils/platform'
import { logError } from '../../../utils/errors'
import { JailbreakDetectResult, DEVICE_SECURITY_ERRORS } from '../types'

const FEATURE_ID = 'jailbreak-detect'

const JAILBREAK_FILE_PATHS = [
  '/Applications/Cydia.app',
  '/Applications/Sileo.app',
  '/Applications/Zebra.app',
  '/Applications/Installer.app',
  '/Applications/rocketbootstrap.app',
  '/Library/MobileSubstrate/MobileSubstrate.dylib',
  '/Library/MobileSubstrate/DynamicLibraries/LiveClock.plist',
  '/Library/MobileSubstrate/DynamicLibraries/Veency.plist',
  '/Library/MobileSubstrate/DynamicLibraries',
  '/private/var/lib/apt',
  '/private/var/lib/cydia',
  '/private/var/mobile/Library/SBSettings/Themes',
  '/private/var/tmp/cydia.log',
  '/private/var/stash',
  '/usr/libexec/cydia/cydo',
  '/usr/libexec/sftp-server',
  '/usr/libexec/ssh-keysign',
  '/usr/libexec/ssh-keygen',
  '/usr/sbin/frida-server',
  '/usr/sbin/sshd',
  '/usr/bin/sshd',
  '/usr/bin/cycript',
  '/usr/local/bin/cycript',
  '/usr/lib/libcycript.dylib',
  '/bin/bash',
  '/bin/sh',
  '/etc/apt',
  '/etc/ssh/sshd_config',
  '/var/log/cydia.log',
  '/var/lib/cydia',
  '/var/cache/apt',
  '/var/tmp/cydia.log',
  '/System/Library/LaunchDaemons/com.ikey.bbot.plist',
  '/System/Library/LaunchDaemons/com.saurik.Cydia.Startup.plist',
  '/Library/LaunchDaemons/com.saurik.Cydia.Startup.plist',
  '/Library/LaunchDaemons/com.openssh.sshd.plist',
]

const SUSPICIOUS_SCHEMES = [
  'cydia://',
  'sileo://',
  'zebra://',
  'installer://',
]

async function checkJailbreakFiles(): Promise<string[]> {
  const found: string[] = []
  if (!isIOS) return found
  try {
    const RNFS = require('react-native-fs')
    for (const path of JAILBREAK_FILE_PATHS) {
      try {
        const exists = await RNFS.exists(path)
        if (exists) found.push(`Jailbreak indicator found: ${path}`)
      } catch {
        continue
      }
    }
  } catch {
    try {
      const { FileSystem } = require('expo-file-system')
      for (const path of JAILBREAK_FILE_PATHS) {
        try {
          const info = await FileSystem.getInfoAsync(path)
          if (info.exists) found.push(`Jailbreak indicator found: ${path}`)
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

function checkSandboxWrite(): string[] {
  const found: string[] = []
  if (!isIOS) return found
  try {
    const testPath = '/private/test_jb_write.txt'
    const RNFS = require('react-native-fs')
    RNFS.writeFile(testPath, 'test')
    found.push('Sandbox write access outside app container (dev jailbreak detection)')
    RNFS.unlink(testPath)
  } catch {
  }
  return found
}

function checkSuspiciousSchemes(): string[] {
  const found: string[] = []
  if (!isIOS) return found
  try {
    const Linking = require('react-native').Linking
    for (const scheme of SUSPICIOUS_SCHEMES) {
      try {
        Linking.canOpenURL(scheme)
        found.push(`Suspicious URL scheme can be opened: ${scheme}`)
      } catch {
        continue
      }
    }
  } catch {
  }
  return found
}

function checkCydiaInstalled(): boolean {
  if (!isIOS) return false
  try {
    const cydia = 'Cydia'
    const NSBundle = require('react-native').NativeModules.NSBundle
    const isInstalled = NSBundle?.pathForResourceOfType?.(cydia, 'app')
    return !!isInstalled
  } catch {
    return false
  }
}

export async function checkJailbreakStatus(): Promise<JailbreakDetectResult> {
  try {
    if (!isIOS) {
      return {
        isJailbroken: false,
        detections: [],
        confidence: 'low',
      }
    }

    const [fileDetections, sandboxDetections, schemeDetections] = await Promise.all([
      checkJailbreakFiles(),
      Promise.resolve(checkSandboxWrite()),
      Promise.resolve(checkSuspiciousSchemes()),
    ])

    const cydiaDetected = checkCydiaInstalled()
    const allDetections = [
      ...fileDetections,
      ...sandboxDetections,
      ...schemeDetections,
      ...(cydiaDetected ? ['Cydia application detected'] : []),
    ]

    if (allDetections.length === 0) {
      return {
        isJailbroken: false,
        detections: [],
        confidence: 'low',
      }
    }

    let confidence: JailbreakDetectResult['confidence'] = 'low'
    if (allDetections.length >= 3) confidence = 'high'
    else if (allDetections.length >= 1) confidence = 'medium'

    return {
      isJailbroken: true,
      detections: allDetections,
      confidence,
    }
  } catch (error) {
    logError(FEATURE_ID, error)
    throw new Error(DEVICE_SECURITY_ERRORS.DETECTION_FAILED)
  }
}

export async function checkJailbreakStatusSafe(): Promise<JailbreakDetectResult> {
  try {
    return await checkJailbreakStatus()
  } catch {
    return {
      isJailbroken: false,
      detections: [],
      confidence: 'low',
    }
  }
}
