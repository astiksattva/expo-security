import { logError } from '../../../utils/errors'
import { CrashReport, ENTERPRISE_ERRORS } from '../types'

const FEATURE_ID = 'crash-reporting'

const MAX_STORED_REPORTS = 50

let crashReports: CrashReport[] = []

let originalErrorHandler: ((error: Error) => void) | null = null

export function initializeCrashReporting(): void {
  try {
    originalErrorHandler = ErrorUtils.getGlobalHandler?.() ?? null

    ErrorUtils.setGlobalHandler((error: Error, isFatal?: boolean) => {
      const report = createCrashReport(error, { isFatal: String(isFatal) })
      addReport(report)
      sendCrashReport(report).catch(() => {})

      if (originalErrorHandler) {
        originalErrorHandler(error)
      }
    })
  } catch (error) {
    logError(FEATURE_ID, error)
  }
}

export function captureError(error: Error, context?: Record<string, string>): void {
  try {
    const report = createCrashReport(error, context)
    addReport(report)
  } catch (captureError) {
    logError(FEATURE_ID, captureError)
  }
}

export function capturePromiseRejection(event: PromiseRejectionEvent): void {
  try {
    const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason))
    const report = createCrashReport(error, { type: 'unhandled_promise_rejection' })
    addReport(report)
  } catch (error) {
    logError(FEATURE_ID, error)
  }
}

function createCrashReport(error: Error, context?: Record<string, string>): CrashReport {
  return {
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    error: error.message,
    stackTrace: error.stack || 'No stack trace available',
    timestamp: Date.now(),
    context,
  }
}

function addReport(report: CrashReport): void {
  crashReports.push(report)
  if (crashReports.length > MAX_STORED_REPORTS) {
    crashReports = crashReports.slice(-MAX_STORED_REPORTS)
  }
}

export async function sendCrashReport(report: CrashReport): Promise<void> {
  try {
    const response = await fetch('https://api.example.com/crash-reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(report),
    })

    if (!response.ok) {
      throw new Error(`Crash reporting server returned ${response.status}`)
    }
  } catch (error) {
    logError(FEATURE_ID, error)
    throw new Error(ENTERPRISE_ERRORS.REPORT_FAILED)
  }
}

export function getStoredReports(): readonly CrashReport[] {
  return crashReports
}

export function clearReports(): void {
  crashReports = []
}

export function getReportCount(): number {
  return crashReports.length
}

export function restoreOriginalErrorHandler(): void {
  if (originalErrorHandler) {
    ErrorUtils.setGlobalHandler(originalErrorHandler)
    originalErrorHandler = null
  }
}
