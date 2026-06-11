import * as Location from 'expo-location'
import { logError } from '../../../utils/errors'
import { LocationState, LocationPermissionStatus, MONITORING_ERRORS } from '../types'

const FEATURE_ID = 'location-detection'

function mapPermissionStatus(
  status: Location.PermissionStatus,
  canAskAgain: boolean,
): LocationPermissionStatus['status'] {
  switch (status) {
    case Location.PermissionStatus.GRANTED:
      return 'granted'
    case Location.PermissionStatus.DENIED:
      return canAskAgain ? 'denied' : 'blocked'
    case Location.PermissionStatus.UNDETERMINED:
      return 'undetermined'
    default:
      return 'denied'
  }
}

export async function requestLocationPermission(): Promise<LocationPermissionStatus> {
  try {
    const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync()
    return {
      granted: status === Location.PermissionStatus.GRANTED,
      canAskAgain,
      status: mapPermissionStatus(status, canAskAgain),
    }
  } catch (error) {
    logError(FEATURE_ID, error)
    throw new Error(MONITORING_ERRORS.PERMISSION_DENIED)
  }
}

export async function getLocationPermissionStatus(): Promise<LocationPermissionStatus> {
  try {
    const { status, canAskAgain } = await Location.getForegroundPermissionsAsync()
    return {
      granted: status === Location.PermissionStatus.GRANTED,
      canAskAgain,
      status: mapPermissionStatus(status, canAskAgain),
    }
  } catch (error) {
    logError(FEATURE_ID, error)
    return {
      granted: false,
      canAskAgain: false,
      status: 'denied',
    }
  }
}

export async function getCurrentLocation(): Promise<LocationState> {
  try {
    const permission = await getLocationPermissionStatus()
    if (!permission.granted) {
      throw new Error(MONITORING_ERRORS.PERMISSION_DENIED)
    }

    const position = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    })

    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      altitude: position.coords.altitude,
      accuracy: position.coords.accuracy,
      speed: position.coords.speed ?? null,
      timestamp: position.timestamp,
    }
  } catch (error) {
    logError(FEATURE_ID, error)
    throw error
  }
}

export async function watchLocation(
  callback: (location: LocationState) => void,
  onError: (error: Error) => void,
): Promise<() => void> {
  try {
    const permission = await getLocationPermissionStatus()
    if (!permission.granted) {
      throw new Error(MONITORING_ERRORS.PERMISSION_DENIED)
    }

    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 5000,
        distanceInterval: 10,
      },
      (position) => {
        callback({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          altitude: position.coords.altitude,
          accuracy: position.coords.accuracy,
          speed: position.coords.speed ?? null,
          timestamp: position.timestamp,
        })
      },
    )

    return () => subscription.remove()
  } catch (error) {
    logError(FEATURE_ID, error)
    onError(error instanceof Error ? error : new Error(MONITORING_ERRORS.LOCATION_UNAVAILABLE))
    return () => {}
  }
}
