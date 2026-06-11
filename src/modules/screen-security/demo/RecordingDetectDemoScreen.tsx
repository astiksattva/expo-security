import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { useRecordingDetect } from '../hooks/useRecordingDetect'

export function RecordingDetectDemoScreen() {
  const {
    state,
    error,
    refresh,
    pollingActive,
    startPolling,
    stopPolling,
  } = useRecordingDetect()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recording Detect Demo</Text>

      <View style={styles.statusRow}>
        <Text style={styles.label}>Recording:</Text>
        <Text
          style={[
            styles.value,
            { color: state.isRecording ? Colors.error : Colors.success },
          ]}
        >
          {state.isRecording ? 'Detected' : 'Not Detected'}
        </Text>
      </View>

      <View style={styles.statusRow}>
        <Text style={styles.label}>Available:</Text>
        <Text
          style={[
            styles.value,
            { color: state.available ? Colors.success : Colors.disabled },
          ]}
        >
          {state.available ? 'Yes' : 'No'}
        </Text>
      </View>

      <View style={styles.statusRow}>
        <Text style={styles.label}>Polling:</Text>
        <Text
          style={[
            styles.value,
            { color: pollingActive ? Colors.primary : Colors.disabled },
          ]}
        >
          {pollingActive ? 'Active' : 'Inactive'}
        </Text>
      </View>

      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <View style={styles.actions}>
        {!pollingActive ? (
          <TouchableOpacity style={styles.button} onPress={startPolling}>
            <Text style={styles.buttonText}>Start Polling</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: Colors.error }]}
            onPress={stopPolling}
          >
            <Text style={styles.buttonText}>Stop Polling</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.secondary }]}
          onPress={refresh}
        >
          <Text style={styles.buttonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  label: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  value: {
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  errorBox: {
    backgroundColor: '#fce8e6',
    padding: Spacing.md,
    borderRadius: 8,
  },
  errorText: {
    color: Colors.error,
    fontSize: FontSize.sm,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  button: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.surface,
    fontSize: FontSize.md,
    fontWeight: '600',
  },
})
