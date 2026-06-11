import { useState, useCallback, useRef } from 'react'
import { checkCameraPermission } from '../services/qrScannerService'
import { ScanResult, ENTERPRISE_ERRORS } from '../types'

interface UseQRScannerReturn {
  isScanning: boolean
  scannedData: ScanResult | null
  hasPermission: boolean | null
  isLoading: boolean
  error: string | null
  startScanning: () => void
  stopScanning: () => void
  handleScan: (data: ScanResult) => void
  resetScan: () => void
}

export function useQRScanner(): UseQRScannerReturn {
  const [isScanning, setIsScanning] = useState(false)
  const [scannedData, setScannedData] = useState<ScanResult | null>(null)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isScannedRef = useRef(false)

  const startScanning = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    setScannedData(null)
    isScannedRef.current = false

    try {
      const granted = await checkCameraPermission()
      setHasPermission(granted)

      if (!granted) {
        setError(ENTERPRISE_ERRORS.CAMERA_PERMISSION_DENIED)
        setIsScanning(false)
        return
      }

      setIsScanning(true)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to start scanner'
      setError(message)
      setIsScanning(false)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const stopScanning = useCallback(() => {
    setIsScanning(false)
    isScannedRef.current = false
  }, [])

  const handleScan = useCallback((data: ScanResult) => {
    if (isScannedRef.current) return
    isScannedRef.current = true
    setScannedData(data)
    setIsScanning(false)
  }, [])

  const resetScan = useCallback(() => {
    setScannedData(null)
    setError(null)
    isScannedRef.current = false
  }, [])

  return {
    isScanning,
    scannedData,
    hasPermission,
    isLoading,
    error,
    startScanning,
    stopScanning,
    handleScan,
    resetScan,
  }
}
