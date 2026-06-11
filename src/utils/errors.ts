export class FeatureError extends Error {
  constructor(
    message: string,
    public featureId: string,
    public originalError?: unknown,
  ) {
    super(message)
    this.name = 'FeatureError'
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof FeatureError) return error.message
  if (error instanceof Error) return error.message
  return 'An unknown error occurred'
}

export function logError(featureId: string, error: unknown): void {
  const message = getErrorMessage(error)
  console.error(`[${featureId}] ${message}`, error)
}
