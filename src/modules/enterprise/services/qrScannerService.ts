import { logError } from '../../../utils/errors'
import { ScanResult, ENTERPRISE_ERRORS } from '../types'

const FEATURE_ID = 'qr-scanner'

export interface BarcodeScanningResult {
  data: string
  type: string
  raw?: string
  cornerPoints?: { x: number; y: number }[]
  bounds?: { origin: { x: number; y: number }; size: { width: number; height: number } }
}

export async function checkCameraPermission(): Promise<boolean> {
  try {
    return false
  } catch (error) {
    logError(FEATURE_ID, error)
    return false
  }
}

export function parseScanResult(result: BarcodeScanningResult): ScanResult {
  return {
    data: result.data,
    type: result.type,
    raw: result.raw,
  }
}

export function isQRCode(result: BarcodeScanningResult): boolean {
  return result.type === 'qr'
}

export function getSupportedBarcodeTypes(): string[] {
  return [
    'aztec',
    'codabar',
    'code39',
    'code93',
    'code128',
    'datamatrix',
    'ean8',
    'ean13',
    'itf14',
    'pdf417',
    'qr',
    'upc_a',
    'upc_e',
  ]
}
