import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { EmptyState } from '../../../components/EmptyState'
import { useNetwork } from '../hooks/useNetwork'

export function NetworkDetectDemoScreen() {
  const { data, error, isLoading, refetch } = useNetwork()

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Network Detection</Text>
        <Text style={styles.subtitle}>Monitor network connectivity and internet reachability</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>About this feature</Text>
        <Text style={styles.infoText}>
          Uses expo-network to detect Wi-Fi, cellular, VPN, ethernet, and Bluetooth
          connections. Monitors internet reachability and provides real-time updates
          via event listeners.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Demo</Text>
        {isLoading ? (
          <LoadingState message="Checking network..." />
        ) : error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : !data ? (
          <EmptyState title="No Data" message="Network information unavailable" />
        ) : (
          <View style={styles.demoContainer}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Connected</Text>
              <Text style={[styles.rowValue, data.isConnected ? styles.success : styles.failure]}>
                {data.isConnected ? 'Yes' : 'No'}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Type</Text>
              <Text style={styles.rowValue}>{data.type}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Internet</Text>
              <Text style={[styles.rowValue, data.isInternetReachable ? styles.success : styles.failure]}>
                {data.isInternetReachable === null ? 'Unknown' : data.isInternetReachable ? 'Reachable' : 'Not Reachable'}
              </Text>
            </View>
          </View>
        )}
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
          <Text style={styles.supportLabel}>Native Prebuild</Text>
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
          <Text style={styles.apiName}>getNetworkStateAsync()</Text>
          <Text style={styles.apiDesc}>Returns current network state</Text>
        </View>
        <View style={styles.apiRow}>
          <Text style={styles.apiName}>addNetworkStateListener()</Text>
          <Text style={styles.apiDesc}>Subscribe to network changes</Text>
        </View>
        <View style={styles.apiRow}>
          <Text style={styles.apiName}>getIpAddressAsync()</Text>
          <Text style={styles.apiDesc}>Get device IP address</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.refreshButton} onPress={refetch}>
        <Text style={styles.refreshText}>Refresh Network Status</Text>
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
  },
  success: {
    color: Colors.success,
  },
  failure: {
    color: Colors.error,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.xs,
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
})
