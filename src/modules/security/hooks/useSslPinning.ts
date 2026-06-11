import { useState, useCallback } from 'react'
import { SslPinningConfig, SslPinningResult, CertificatePin } from '../types'
import {
  configureSslPinning,
  verifyCertificatePin,
  addPin,
  removePin,
  clearPins,
  getSslPinningConfig,
  isSslPinningSupported,
} from '../services/sslPinningService'

interface UseSslPinningReturn {
  config: SslPinningConfig | null
  lastResult: SslPinningResult | null
  isSupported: boolean
  isLoading: boolean
  error: string | null
  configure: (config: Partial<SslPinningConfig>) => Promise<void>
  verify: (host: string, hash: string) => Promise<void>
  addPin: (pin: CertificatePin) => Promise<void>
  removePin: (host: string) => Promise<void>
  clearPins: () => void
  refresh: () => void
}

export function useSslPinning(): UseSslPinningReturn {
  const [config, setConfig] = useState<SslPinningConfig | null>(
    getSslPinningConfig(),
  )
  const [lastResult, setLastResult] = useState<SslPinningResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supported = isSslPinningSupported()

  const configure = useCallback(async (cfg: Partial<SslPinningConfig>) => {
    setIsLoading(true)
    setError(null)
    try {
      await configureSslPinning(cfg)
      setConfig(getSslPinningConfig())
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to configure SSL pinning',
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  const verify = useCallback(async (host: string, hash: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await verifyCertificatePin(host, hash)
      setLastResult(result)
      if (!result.isValid && result.error) {
        setError(result.error)
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to verify certificate pin',
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleAddPin = useCallback(async (pin: CertificatePin) => {
    setIsLoading(true)
    setError(null)
    try {
      await addPin(pin)
      setConfig(getSslPinningConfig())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add pin')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleRemovePin = useCallback(async (host: string) => {
    setIsLoading(true)
    setError(null)
    try {
      await removePin(host)
      setConfig(getSslPinningConfig())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove pin')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleClearPins = useCallback(() => {
    clearPins()
    setConfig(null)
    setLastResult(null)
    setError(null)
  }, [])

  const refresh = useCallback(() => {
    setConfig(getSslPinningConfig())
  }, [])

  return {
    config,
    lastResult,
    isSupported: supported,
    isLoading,
    error,
    configure,
    verify,
    addPin: handleAddPin,
    removePin: handleRemovePin,
    clearPins: handleClearPins,
    refresh,
  }
}
