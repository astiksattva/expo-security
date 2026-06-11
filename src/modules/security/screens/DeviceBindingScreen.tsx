import { useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { useDeviceBinding } from '../hooks/useDeviceBinding'

export function DeviceBindingScreen() {
  const {
    bindingInfo,
    bindingStatus,
    deviceId,
    isSupported,
    isLoading,
    error,
    bind,
    unbind,
    verify,
    checkStatus,
  } = useDeviceBinding()

  useEffect(() => {
    checkStatus()
  }, [checkStatus])

  if (!isSupported) {
    return (
      <ErrorState message="Device Binding requires iOS or Android with native prebuild" />
    )
  }

  if (isLoading && !bindingStatus) {
    return <LoadingState message="Checking device binding..." />
  }

  if (error && !bindingStatus) {
    return <ErrorState message={error} onRetry={checkStatus} />
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Device Binding</Text>
      <Text style={styles.subtitle}>
        Bind sessions to a specific device using unique device identifiers
      </Text>

      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>Binding Status</Text>
        <View style={styles.statusRow}>
          <Text style={styles.statusKey}>Bound:</Text>
          <Text
            style={[
              styles.statusValue,
              { color: bindingStatus?.isBound ? Colors.success : Colors.textSecondary },
            ]}
          >
            {bindingStatus?.isBound ? 'Yes' : 'No'}
          </Text>
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.statusKey}>Verified:</Text>
          <Text
            style={[
              styles.statusValue,
              { color: bindingStatus?.isVerified ? Colors.success : Colors.error },
            ]}
          >
            {bindingStatus?.isVerified ? 'Yes' : 'No'}
          </Text>
        </View>
        {bindingStatus?.deviceId && (
          <View style={styles.statusRow}>
            <Text style={styles.statusKey}>Device ID:</Text>
            <Text style={styles.statusValue}>
              {bindingStatus.deviceId.substring(0, 16)}...
            </Text>
          </View>
        )}
      </View>

      {deviceId && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Device</Text>
          <Text style={styles.deviceId}>{deviceId}</Text>
        </View>
      )}

      {bindingInfo && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Binding Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Bound At:</Text>
            <Text style={styles.detailValue}>
              {new Date(bindingInfo.boundAt).toLocaleString()}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Last Verified:</Text>
            <Text style={styles.detailValue}>
              {new Date(bindingInfo.lastVerified).toLocaleString()}
            </Text>
          </View>
        </View>
      )}

      <View style={styles.actions}>
        {bindingStatus?.isBound ? (
          <TouchableOpacity
            style={[styles.button, styles.unbindButton]}
            onPress={unbind}
          >
            <Text style={styles.buttonText}>Unbind Device</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => bind('demo_token_' + Date.now())}
          >
            <Text style={styles.buttonText}>Bind Device</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.button, styles.verifyButton]}
          onPress={verify}
        >
          <Text style={styles.buttonText}>Verify Binding</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.refreshButton]}
          onPress={checkStatus}
        >
          <Text style={styles.buttonText}>Refresh Status</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>How it works</Text>
        <Text style={styles.infoText}>
          On Android, the Android ID is used. On iOS, the vendor identifier is
          used. The device ID is stored securely and verified on each session
          check to prevent session hijacking across devices.
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
    padding: Spacing.md,
    gap: Spacing.md,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.text,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  errorBox: {
    backgroundColor: '#fce8e6',
    padding: Spacing.md,
    borderRadius: 8,
  },
  errorText: {
    color: Colors.error,
    fontSize: FontSize.md,
  },
  statusCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.sm,
  },
  statusLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusKey: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  statusValue: {
    fontSize: FontSize.md,
    fontWeight: '500',
    color: Colors.text,
  },
  section: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
  },
  deviceId: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontFamily: 'monospace',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  detailValue: {
    fontSize: FontSize.md,
    fontWeight: '500',
    color: Colors.text,
  },
  actions: {
    gap: Spacing.sm,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: Spacing.md,
    alignItems: 'center',
  },
  unbindButton: {
    backgroundColor: Colors.error,
  },
  verifyButton: {
    backgroundColor: Colors.success,
  },
  refreshButton: {
    backgroundColor: Colors.secondary,
  },
  buttonText: {
    color: Colors.surface,
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#e8f0fe',
    padding: Spacing.md,
    borderRadius: 8,
    gap: Spacing.xs,
  },
  infoTitle: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  infoText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
})
