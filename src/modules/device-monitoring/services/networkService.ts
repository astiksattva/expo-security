import * as Network from 'expo-network'
import { logError } from '../../../utils/errors'
import { NetworkState, NetworkType, MONITORING_ERRORS } from '../types'

const FEATURE_ID = 'network-detection'

function mapNetworkType(type: Network.NetworkStateType | undefined): NetworkType {
  switch (type) {
    case Network.NetworkStateType.WIFI:
      return 'wifi'
    case Network.NetworkStateType.CELLULAR:
      return 'cellular'
    case Network.NetworkStateType.NONE:
      return 'none'
    case Network.NetworkStateType.VPN:
      return 'vpn'
    case Network.NetworkStateType.ETHERNET:
      return 'ethernet'
    case Network.NetworkStateType.BLUETOOTH:
      return 'bluetooth'
    case Network.NetworkStateType.OTHER:
      return 'other'
    default:
      return 'unknown'
  }
}

export async function getNetworkState(): Promise<NetworkState> {
  try {
    const state = await Network.getNetworkStateAsync()
    return {
      isConnected: state.isConnected ?? false,
      type: mapNetworkType(state.type),
      isInternetReachable: state.isInternetReachable ?? null,
    }
  } catch (error) {
    logError(FEATURE_ID, error)
    throw new Error(MONITORING_ERRORS.NETWORK_UNAVAILABLE)
  }
}

export function subscribeToNetworkChanges(
  callback: (state: NetworkState) => void,
): () => void {
  const subscription = Network.addNetworkStateListener((event) => {
    callback({
      isConnected: event.isConnected ?? false,
      type: mapNetworkType(event.type),
      isInternetReachable: event.isInternetReachable ?? null,
    })
  })
  return () => subscription.remove()
}

export async function getIpAddress(): Promise<string | null> {
  try {
    const ip = await Network.getIpAddressAsync()
    return ip
  } catch (error) {
    logError(FEATURE_ID, error)
    return null
  }
}

export async function isNetworkAvailable(): Promise<boolean> {
  try {
    const state = await getNetworkState()
    return state.isConnected
  } catch {
    return false
  }
}
