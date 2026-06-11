import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { EmptyState } from '../../../components/EmptyState'
import { useLocation } from '../hooks/useLocation'

export function LocationDetectDemoScreen() {
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

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Location Detection</Text>
        <Text style={styles.subtitle}>Monitor device GPS coordinates in real-time</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>About this feature</Text>
        <Text style={styles.infoText}>
          Uses expo-location to request permissions, get current position, and
          watch location changes. Provides latitude, longitude, altitude,
          accuracy, and speed data.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Demo</Text>

        {permission && !permission.granted && (
          <View style={styles.permissionBanner}>
            <Text style={styles.permissionText}>
              {permission.status === 'blocked'
                ? 'Permission permanently blocked. Enable in Settings.'
                : 'Location permission required.'}
            </Text>
            {permission.status !== 'blocked' && (
              <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
                <Text style={styles.permissionButtonText}>Grant</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {isLoading ? (
          <LoadingState message="Getting location..." />
        ) : error ? (
          <ErrorState message={error} />
        ) : !data ? (
          <EmptyState title="No Data" message="Tap refresh or request permission" />
        ) : (
          <View style={styles.demoContainer}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Latitude</Text>
              <Text style={styles.rowValue}>{data.latitude.toFixed(6)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Longitude</Text>
              <Text style={styles.rowValue}>{data.longitude.toFixed(6)}</Text>
            </View>
            {data.altitude !== null && (
              <>
                <View style={styles.divider} />
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Altitude</Text>
                  <Text style={styles.rowValue}>{data.altitude.toFixed(1)}m</Text>
                </View>
              </>
            )}
            {data.accuracy !== null && (
              <>
                <View style={styles.divider} />
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Accuracy</Text>
                  <Text style={styles.rowValue}>{data.accuracy.toFixed(1)}m</Text>
                </View>
              </>
            )}
          </View>
        )}
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.refreshButton} onPress={refetch}>
          <Text style={styles.refreshText}>Refresh Location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.watchButton, isWatching && styles.watchButtonActive]}
          onPress={isWatching ? stopWatching : startWatching}
        >
          <Text style={styles.watchText}>
            {isWatching ? 'Stop Watching' : 'Watch Location'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Platform Support</Text>
        <View style={styles.supportRow}>
          <Text style={styles.supportLabel}>Expo Go</Text>
          <Text style={styles.supportValue}>✅ Full</Text>
        </View>
        <View style={styles.supportRow}>
          <Text style={styles.supportLabel}>Dev Build</Text>
          <Text style={styles.supportValue}>✅ Full</Text>
        </View>
        <View style={styles.supportRow}>
          <Text style={styles.supportLabel}>EAS Build</Text>
          <Text style={styles.supportValue}>✅ Full</Text>
        </View>
        <View style={styles.supportRow}>
          <Text style={styles.supportLabel}>Android</Text>
          <Text style={styles.supportValue}>✅ Full</Text>
        </View>
        <View style={styles.supportRow}>
          <Text style={styles.supportLabel}>iOS</Text>
          <Text style={styles.supportValue}>✅ Full</Text>
        </View>
        <View style={styles.supportRow}>
          <Text style={styles.supportLabel}>Web</Text>
          <Text style={styles.supportValue}>⚠️ Limited</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key APIs Used</Text>
        <View style={styles.apiRow}>
          <Text style={styles.apiName}>requestForegroundPermissionsAsync()</Text>
          <Text style={styles.apiDesc}>Request location access</Text>
        </View>
        <View style={styles.apiRow}>
          <Text style={styles.apiName}>getCurrentPositionAsync()</Text>
          <Text style={styles.apiDesc}>Get current GPS coordinates</Text>
        </View>
        <View style={styles.apiRow}>
          <Text style={styles.apiName}>watchPositionAsync()</Text>
          <Text style={styles.apiDesc}>Real-time location updates</Text>
        </View>
      </View>
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
  header: {
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: FontSize.title,
    fontWeight: '700',
    color: Colors.text,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  infoBox: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  infoTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  infoText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  section: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  permissionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.warning + '20',
    padding: Spacing.md,
    borderRadius: 8,
  },
  permissionText: {
    fontSize: FontSize.md,
    color: Colors.text,
    flex: 1,
  },
  permissionButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: Colors.surface,
    fontWeight: '600',
  },
  demoContainer: {
    gap: Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLabel: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  rowValue: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
    fontFamily: 'monospace',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.xs,
  },
  buttonGroup: {
    gap: Spacing.sm,
  },
  refreshButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
  },
  refreshText: {
    color: Colors.surface,
    fontSize: FontSize.lg,
    fontWeight: '600',
  },
  watchButton: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  watchButtonActive: {
    backgroundColor: Colors.error,
    borderColor: Colors.error,
  },
  watchText: {
    color: Colors.text,
    fontSize: FontSize.lg,
    fontWeight: '600',
  },
  supportRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xs,
  },
  supportLabel: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  supportValue: {
    fontSize: FontSize.md,
    fontWeight: '500',
    color: Colors.text,
  },
  apiRow: {
    paddingVertical: Spacing.xs,
  },
  apiName: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
    fontFamily: 'monospace',
  },
  apiDesc: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
})
