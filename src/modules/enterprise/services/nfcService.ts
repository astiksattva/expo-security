import { Platform } from 'react-native'
import { logError } from '../../../utils/errors'
import { NFCReadResult, NFCTag } from '../types'

const FEATURE_ID = 'nfc'

export async function isNFCAvailable(): Promise<boolean> {
  try {
    if (Platform.OS === 'web') return false
    if (Platform.OS === 'ios') {
      return false
    }
    return false
  } catch (error) {
    logError(FEATURE_ID, error)
    return false
  }
}

export async function startNFCPolling(): Promise<void> {
  const available = await isNFCAvailable()
  if (!available) {
    throw new Error('NFC is not available on this device')
  }
}

export async function stopNFCPolling(): Promise<void> {
}

export function parseNfcTag(tag: { id?: string; records?: Array<{ mediaType?: string; data?: string }>; techTypes?: string[] }): NFCTag {
  const records: NFCReadResult[] = (tag.records || []).map((record) => ({
    id: tag.id || '',
    type: record.mediaType || 'unknown',
    payload: record.data ? String(record.data) : '',
    techTypes: tag.techTypes || [],
  }))

  return {
    id: tag.id || '',
    records,
  }
}

export function addNfcTagListener(
  handler: (tag: unknown) => void,
): { remove: () => void } {
  return { remove: () => {} }
}

export function removeNfcListener(subscription: { remove: () => void }): void {
  subscription.remove()
}
