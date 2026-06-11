import { isAndroid, isIOS } from '../../../utils/platform'
import { logError } from '../../../utils/errors'
import {
  CertificatePin,
  SslPinningConfig,
  SslPinningResult,
  SECURITY_ERRORS,
} from '../types'

const FEATURE_ID = 'ssl-pinning'

const DEFAULT_CONFIG: SslPinningConfig = {
  pins: [],
  validateHostname: true,
}

let configCache: SslPinningConfig | null = null

export async function configureSslPinning(
  config: Partial<SslPinningConfig>,
): Promise<void> {
  configCache = { ...DEFAULT_CONFIG, ...config }
}

export function getSslPinningConfig(): SslPinningConfig | null {
  return configCache
}

export async function verifyCertificatePin(
  host: string,
  certificateHash: string,
): Promise<SslPinningResult> {
  try {
    const pins = configCache?.pins ?? []
    const hostPins = pins.filter((p) => p.host === host)

    if (hostPins.length === 0) {
      return {
        isValid: false,
        host,
        error: SECURITY_ERRORS.NO_PINS_CONFIGURED,
      }
    }

    const matched = hostPins.some((pin) => pin.hash === certificateHash)

    if (!matched) {
      return {
        isValid: false,
        host,
        error: SECURITY_ERRORS.PIN_MISMATCH,
      }
    }

    return { isValid: true, host }
  } catch (error) {
    logError(FEATURE_ID, error)
    return { isValid: false, host, error: SECURITY_ERRORS.PIN_MISMATCH }
  }
}

export function generateCertificateHash(certificate: string): string {
  let hash = 0
  for (let i = 0; i < certificate.length; i++) {
    const char = certificate.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return Math.abs(hash).toString(16)
}

export function isSslPinningSupported(): boolean {
  return isAndroid || isIOS
}

export async function addPin(pin: CertificatePin): Promise<void> {
  const current = configCache ?? { ...DEFAULT_CONFIG }
  const existing = current.pins.findIndex(
    (p) => p.host === pin.host && p.algorithm === pin.algorithm,
  )

  if (existing >= 0) {
    current.pins[existing] = pin
  } else {
    current.pins.push(pin)
  }

  configCache = current
}

export async function removePin(host: string): Promise<void> {
  if (!configCache) return
  configCache.pins = configCache.pins.filter((p) => p.host !== host)
}

export function clearPins(): void {
  configCache = null
}
