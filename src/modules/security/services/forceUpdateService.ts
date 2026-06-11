import * as Application from 'expo-application'
import Constants from 'expo-constants'
import { isAndroid, isIOS } from '../../../utils/platform'
import { logError } from '../../../utils/errors'
import {
  VersionInfo,
  UpdateStatus,
  ForceUpdateConfig,
  SECURITY_ERRORS,
} from '../types'

const FEATURE_ID = 'force-update'

const DEFAULT_CONFIG: ForceUpdateConfig = {
  checkOnLaunch: true,
  checkIntervalMs: 24 * 60 * 60 * 1000,
}

const VERSION_CACHE_KEY = 'force_update_version_cache'
const LAST_CHECK_KEY = 'force_update_last_check'

let updateConfig: ForceUpdateConfig = { ...DEFAULT_CONFIG }
let cachedMinVersion: string | null = null

export function configureForceUpdate(config: Partial<ForceUpdateConfig>): void {
  updateConfig = { ...updateConfig, ...config }
}

export function getCurrentAppVersion(): string {
  const nativeVersion = Application.nativeApplicationVersion
  const buildVersion = Application.nativeBuildVersion
  const expoVersion = Constants.expoConfig?.version

  return nativeVersion ?? expoVersion ?? buildVersion ?? '0.0.0'
}

export function getBuildNumber(): string {
  return Application.nativeBuildVersion ?? '1'
}

export function compareVersions(a: string, b: string): number {
  const aParts = a.split('.').map(Number)
  const bParts = b.split('.').map(Number)

  for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
    const aPart = aParts[i] ?? 0
    const bPart = bParts[i] ?? 0
    if (aPart > bPart) return 1
    if (aPart < bPart) return -1
  }

  return 0
}

export function isUpdateRequired(minVersion: string): boolean {
  const current = getCurrentAppVersion()
  return compareVersions(current, minVersion) < 0
}

export async function checkForUpdate(
  fetchMinVersion: () => Promise<string>,
): Promise<UpdateStatus> {
  try {
    const currentVersion = getCurrentAppVersion()
    const minVersion = await fetchMinVersion()
    cachedMinVersion = minVersion

    const needsUpdate = isUpdateRequired(minVersion)
    const comparison = compareVersions(currentVersion, minVersion)

    return {
      needsUpdate: comparison < 0,
      isOptional: comparison === 0,
      updateUrl: isAndroid
        ? 'market://details?id=' + Constants.expoConfig?.android?.package
        : isIOS
          ? 'https://apps.apple.com/app/id'
          : null,
    }
  } catch (error) {
    logError(FEATURE_ID, error)
    return {
      needsUpdate: false,
      isOptional: false,
      updateUrl: null,
    }
  }
}

export async function getVersionInfo(
  fetchLatestVersion: () => Promise<string>,
  fetchMinVersion: () => Promise<string>,
): Promise<VersionInfo> {
  try {
    const currentVersion = getCurrentAppVersion()
    const minVersion = await fetchMinVersion()
    const latestVersion = await fetchLatestVersion()

    return { currentVersion, minVersion, latestVersion }
  } catch (error) {
    logError(FEATURE_ID, error)
    return {
      currentVersion: getCurrentAppVersion(),
      minVersion: '0.0.0',
      latestVersion: '0.0.0',
    }
  }
}

export function getForceUpdateConfig(): ForceUpdateConfig {
  return { ...updateConfig }
}

export function isForceUpdateSupported(): boolean {
  return isAndroid || isIOS
}
