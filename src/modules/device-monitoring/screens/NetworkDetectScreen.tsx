import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { EmptyState } from '../../../components/EmptyState'
import { useNetwork } from '../hooks/useNetwork'

export function NetworkDetectScreen() {
  const { data, error, isLoading, refetch } = useNetwork()

  if (isLoading) {
    return <LoadingState message="Checking network status..." />
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />
  }

  if (!data) {
    return <EmptyState title="No Network Data" message="Unable to retrieve network information" />
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Network Detection</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Connection Status</Text>
        <Text style={[styles.value, data.isConnected ? styles.connected : styles.disconnected]}>
          {data.isConnected ? 'Connected' : 'Disconnected'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Network Type</Text>
        <Text style={styles.value}>{data.type.toUpperCase()}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Internet Reachable</Text>
        <Text style={[styles.value, data.isInternetReachable ? styles.connected : styles.disconnected]}>
          {data.isInternetReachable === null
            ? 'Unknown'
            : data.isInternetReachable
              ? 'Reachable'
              : 'Not Reachable'}
        </Text>
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
  connected: {
    color: Colors.success,
  },
  disconnected: {
    color: Colors.error,
  },
})
