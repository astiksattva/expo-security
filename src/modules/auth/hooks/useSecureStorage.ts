import { useState, useCallback } from 'react'
import { SecureStorageResult } from '../types'
import {
  secureWrite,
  secureRead,
  secureDelete,
  secureKeyExists,
} from '../services/secureStorageService'

interface SecureStorageEntry {
  key: string
  value: string
}

interface UseSecureStorageReturn {
  entries: SecureStorageEntry[]
  isLoading: boolean
  error: string | null
  result: SecureStorageResult | null
  saveItem: (key: string, value: string) => Promise<void>
  readItem: (key: string) => Promise<void>
  deleteItem: (key: string) => Promise<void>
  clearItems: () => void
  checkExists: (key: string) => Promise<boolean>
}

export function useSecureStorage(): UseSecureStorageReturn {
  const [entries, setEntries] = useState<SecureStorageEntry[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<SecureStorageResult | null>(null)

  const saveItem = useCallback(async (key: string, value: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const writeResult = await secureWrite(key, value)
      setResult(writeResult)
      if (writeResult.success) {
        setEntries((prev) => {
          const filtered = prev.filter((e) => e.key !== key)
          return [...filtered, { key, value }]
        })
      } else if (writeResult.error) {
        setError(writeResult.error)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save item')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const readItem = useCallback(async (key: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const readResult = await secureRead(key)
      setResult(readResult)
      if (readResult.success && readResult.value !== undefined) {
        setEntries((prev) => {
          const filtered = prev.filter((e) => e.key !== key)
          return [...filtered, { key, value: readResult.value! }]
        })
      } else if (readResult.error) {
        setError(readResult.error)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to read item')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const deleteItem = useCallback(async (key: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const deleteResult = await secureDelete(key)
      setResult(deleteResult)
      if (deleteResult.success) {
        setEntries((prev) => prev.filter((e) => e.key !== key))
      } else if (deleteResult.error) {
        setError(deleteResult.error)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearItems = useCallback(() => {
    setEntries([])
    setError(null)
    setResult(null)
  }, [])

  const checkExists = useCallback(async (key: string): Promise<boolean> => {
    try {
      return await secureKeyExists(key)
    } catch {
      return false
    }
  }, [])

  return {
    entries,
    isLoading,
    error,
    result,
    saveItem,
    readItem,
    deleteItem,
    clearItems,
    checkExists,
  }
}
