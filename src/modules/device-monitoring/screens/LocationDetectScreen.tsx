import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { EmptyState } from '../../../components/EmptyState'
import { useLocation } from '../hooks/useLocation'

export function LocationDetectScreen() {
  const {
    data,
    error,
    isLoading,
    permission,
    requestPermission,
    refetch,
    startWatching,
    stopWatching,
    isWatching,
  } = useLocation()

  if (isLoading) {
    return <LoadingState message="Getting location..." />
  }

  if (!permission || !permission.granted) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Location Detection</Text>
        <EmptyState
          title="Location Permission Required"
          message={permission?.status === 'blocked'
            ? 'Location permission is permanently blocked. Please enable it in Settings.'
            : 'Grant location access to see your current position.'}
        />
        {permission?.status !== 'blocked' && (
          <TouchableOpacity style={styles.button} onPress={requestPermission}>
            <Text style={styles.buttonText}>Grant Permission</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    )
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />
  }

  if (!data) {
    return <EmptyState title="No Location Data" message="Unable to retrieve location information" />
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Location Detection</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Latitude</Text>
        <Text style={styles.value}>{data.latitude.toFixed(6)}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Longitude</Text>
        <Text style={styles.value}>{data.longitude.toFixed(6)}</Text>
      </View>

      {data.altitude !== null && (
        <View style={styles.card}>
          <Text style={styles.label}>Altitude</Text>
          <Text style={styles.value}>{data.altitude.toFixed(1)} m</Text>
        </View>
      )}

      {data.accuracy !== null && (
        <View style={styles.card}>
          <Text style={styles.label}>Accuracy</Text>
          <Text style={styles.value}>{data.accuracy.toFixed(1)} m</Text>
        </View>
      )}

      {data.speed !== null && (
        <View style={styles.card}>
          <Text style={styles.label}>Speed</Text>
          <Text style={styles.value}>{data.speed.toFixed(1)} m/s</Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, isWatching && styles.buttonActive]}
        onPress={isWatching ? stopWatching : startWatching}
      >
        <Text style={styles.buttonText}>
          {isWatching ? 'Stop Watching' : 'Start Watching'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  title: {
    fontSize: FontSize.title,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  label: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  value: {
    fontSize: FontSize.xl,
    fontWeight: '600',
    color: Colors.text,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: Spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: Colors.error,
  },
  buttonText: {
    color: Colors.surface,
    fontSize: FontSize.lg,
    fontWeight: '600',
  },
})
