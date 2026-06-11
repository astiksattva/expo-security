import { useState, useCallback, useEffect } from 'react'
import {
  initializeCrashReporting,
  captureError,
  getStoredReports,
  clearReports,
  getReportCount,
  sendCrashReport,
  restoreOriginalErrorHandler,
} from '../services/crashReportingService'
import { CrashReport } from '../types'

interface UseCrashReportingReturn {
  reports: readonly CrashReport[]
  reportCount: number
  isSending: boolean
  error: string | null
  initialize: () => void
  capture: (error: Error, context?: Record<string, string>) => void
  sendReport: (report: CrashReport) => Promise<void>
  clear: () => void
  refresh: () => void
  restore: () => void
}

export function useCrashReporting(): UseCrashReportingReturn {
  const [reports, setReports] = useState<readonly CrashReport[]>([])
  const [reportCount, setReportCount] = useState(0)
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    refresh()
    return () => {
      restoreOriginalErrorHandler()
    }
  }, [])

  const refresh = useCallback(() => {
    setReports(getStoredReports())
    setReportCount(getReportCount())
  }, [])

  const initialize = useCallback(() => {
    initializeCrashReporting()
    refresh()
  }, [refresh])

  const capture = useCallback(
    (err: Error, context?: Record<string, string>) => {
      captureError(err, context)
      refresh()
    },
    [refresh],
  )

  const sendReport = useCallback(async (report: CrashReport) => {
    setIsSending(true)
    setError(null)
    try {
      await sendCrashReport(report)
      refresh()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send report'
      setError(message)
    } finally {
      setIsSending(false)
    }
  }, [refresh])

  const clear = useCallback(() => {
    clearReports()
    refresh()
  }, [refresh])

  const restore = useCallback(() => {
    restoreOriginalErrorHandler()
  }, [])

  return {
    reports,
    reportCount,
    isSending,
    error,
    initialize,
    capture,
    sendReport,
    clear,
    refresh,
    restore,
  }
}
