import { useState, useCallback } from 'react'
import {
  DeviceBindingInfo,
  DeviceBindingStatus,
  BindingConfig,
} from '../types'
import {
  bindDevice,
  getBindingInfo,
  verifyBinding,
  unbindDevice,
  configureDeviceBinding,
  getDeviceId,
  isDeviceBindingSupported,
  getBindingConfig,
} from '../services/deviceBindingService'

interface UseDeviceBindingReturn {
  bindingInfo: DeviceBindingInfo | null
  bindingStatus: DeviceBindingStatus | null
  deviceId: string | null
  isSupported: boolean
  isLoading: boolean
  error: string | null
  bind: (token: string) => Promise<void>
  unbind: () => Promise<void>
  verify: () => Promise<void>
  checkStatus: () => Promise<void>
  configure: (config: Partial<BindingConfig>) => void
}

export function useDeviceBinding(): UseDeviceBindingReturn {
  const [bindingInfo, setBindingInfo] = useState<DeviceBindingInfo | null>(null)
  const [bindingStatus, setBindingStatus] =
    useState<DeviceBindingStatus | null>(null)
  const [deviceId, setDeviceId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supported = isDeviceBindingSupported()

  const handleBind = useCallback(async (token: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const success = await bindDevice(token)
      if (success) {
        const info = await getBindingInfo()
        setBindingInfo(info)
        const status = await verifyBinding()
        setBindingStatus(status)
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to bind device',
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleUnbind = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      await unbindDevice()
      setBindingInfo(null)
      setBindingStatus(null)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to unbind device',
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleVerify = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const status = await verifyBinding()
      setBindingStatus(status)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to verify device binding',
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleCheckStatus = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const info = await getBindingInfo()
      setBindingInfo(info)
      const did = await getDeviceId()
      setDeviceId(did)
      const status = await verifyBinding()
      setBindingStatus(status)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to check binding status',
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleConfigure = useCallback((cfg: Partial<BindingConfig>) => {
    configureDeviceBinding(cfg)
  }, [])

  return {
    bindingInfo,
    bindingStatus,
    deviceId,
    isSupported: supported,
    isLoading,
    error,
    bind: handleBind,
    unbind: handleUnbind,
    verify: handleVerify,
    checkStatus: handleCheckStatus,
    configure: handleConfigure,
  }
}
