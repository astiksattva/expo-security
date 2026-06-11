import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { useScreenshotDetect } from '../hooks/useScreenshotDetect'

export function ScreenshotDetectDemoScreen() {
  const { state, error, reset, startListening, stopListening } =
    useScreenshotDetect()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Screenshot Detect Demo</Text>

      <View style={styles.statusRow}>
        <Text style={styles.label}>Listener:</Text>
        <Text
          style={[
            styles.value,
            { color: state.listenerActive ? Colors.success : Colors.disabled },
          ]}
        >
          {state.listenerActive ? 'Active' : 'Inactive'}
        </Text>
      </View>

      <View style={styles.statusRow}>
        <Text style={styles.label}>Detected:</Text>
        <Text
          style={[
            styles.value,
            { color: state.detected ? Colors.warning : Colors.textSecondary },
          ]}
        >
          {state.detected ? 'Yes' : 'No'}
        </Text>
      </View>

      {state.timestamp && (
        <View style={styles.statusRow}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>
            {new Date(state.timestamp).toLocaleTimeString()}
          </Text>
        </View>
      )}

      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <View style={styles.actions}>
        {!state.listenerActive ? (
          <TouchableOpacity style={styles.button} onPress={startListening}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: Colors.error }]}
            onPress={stopListening}
          >
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.secondary }]}
          onPress={reset}
        >
          <Text style={styles.buttonText}>Reset</Text>
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
