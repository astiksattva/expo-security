import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { useScreenshotPrevent } from '../hooks/useScreenshotPrevent'

export function ScreenshotPreventDemoScreen() {
  const { state, error, enable, disable } = useScreenshotPrevent()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Screenshot Prevent Demo</Text>

      <View style={styles.statusCard}>
        <Text style={styles.statusEmoji}>
          {state.isPrevented ? '🔒' : '🔓'}
        </Text>
        <Text
          style={[
            styles.statusText,
            { color: state.isPrevented ? Colors.success : Colors.textSecondary },
          ]}
        >
          {state.isPrevented ? 'Protected' : 'Not Protected'}
        </Text>
      </View>

      {!state.available && (
        <View style={styles.warningBox}>
          <Text style={styles.warningText}>
            Not available on this device
          </Text>
        </View>
      )}

      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <View style={styles.actions}>
        {!state.isPrevented ? (
          <TouchableOpacity style={styles.button} onPress={enable}>
            <Text style={styles.buttonText}>Enable</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: Colors.error }]}
            onPress={disable}
          >
            <Text style={styles.buttonText}>Disable</Text>
          </TouchableOpacity>
        )}
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
  statusCard: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  statusEmoji: {
    fontSize: 40,
  },
  statusText: {
    fontSize: FontSize.xl,
    fontWeight: '600',
  },
  warningBox: {
    backgroundColor: '#fef7e0',
    padding: Spacing.md,
    borderRadius: 8,
  },
  warningText: {
    color: Colors.warning,
    fontSize: FontSize.sm,
    fontWeight: '500',
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
