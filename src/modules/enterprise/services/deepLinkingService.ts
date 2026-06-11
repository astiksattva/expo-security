import * as Linking from 'expo-linking'
import { logError } from '../../../utils/errors'
import { DeepLink, ENTERPRISE_ERRORS } from '../types'

type LinkSubscription = { remove: () => void }

const FEATURE_ID = 'deep-linking'

export function createDeepLink(path: string): string {
  return Linking.createURL(path)
}

export function parseDeepLink(url: string): DeepLink {
  try {
    const parsed = Linking.parse(url)
    return {
      url,
      path: parsed.path ?? null,
      queryParams: (parsed.queryParams as Record<string, string> | null) ?? null,
      route: parsed.path ? `/${parsed.path}` : null,
    }
  } catch (error) {
    logError(FEATURE_ID, error)
    throw new Error(ENTERPRISE_ERRORS.LINK_FAILED)
  }
}

export function getInitialURL(): Promise<string | null> {
  return Linking.getInitialURL()
}

export async function openURL(url: string): Promise<boolean> {
  const canOpen = await Linking.canOpenURL(url)
  if (canOpen) {
    await Linking.openURL(url)
    return true
  }
  return false
}

export function canOpenURL(url: string): Promise<boolean> {
  return Linking.canOpenURL(url)
}

export function addURLListener(
  handler: (event: { url: string }) => void,
): LinkSubscription {
  return Linking.addEventListener('url', handler)
}

export function removeURLListener(subscription: LinkSubscription): void {
  subscription.remove()
}

export function useDeepLink(): string | undefined {
  return Linking.useURL() ?? undefined
}

export function getLinkingConfig() {
  return {
    prefixes: [Linking.createURL('/')],
    config: {
      screens: {
        dashboard: 'dashboard',
        auth: 'auth/:id',
        'screen-security': 'screen-security/:id',
        'device-security': 'device-security/:id',
        'device-monitoring': 'device-monitoring/:id',
        enterprise: 'enterprise/:id',
        security: 'security/:id',
      },
    },
  }
}
