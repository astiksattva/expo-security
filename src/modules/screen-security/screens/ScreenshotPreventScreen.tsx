import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { useScreenshotPrevent } from '../hooks/useScreenshotPrevent'
import { LoadingState } from '../../../components/LoadingState'
import { ErrorState } from '../../../components/ErrorState'

export function ScreenshotPreventScreen() {
  const { state, error, loading, enable, disable } = useScreenshotPrevent()

  if (loading) {
    return <LoadingState message="Configuring screenshot prevention..." />
  }

  if (!state.available) {
    return (
      <ErrorState message="Screenshot prevention is not available on this device" />
    )
  }

  if (error) {
    return <ErrorState message={error} onRetry={state.isPrevented ? disable : enable} />
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Screenshot Prevention</Text>
      <Text style={styles.description}>
        Prevents screenshots and screen recording of sensitive screens using
        platform-native secure window flags.
      </Text>

      <View style={styles.statusCard}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: state.isPrevented ? '#e6f4ea' : '#f1f3f4' },
          ]}
        >
          <Text style={styles.icon}>
            {state.isPrevented ? '🔒' : '🔓'}
          </Text>
        </View>
        <View style={styles.statusInfo}>
          <Text style={styles.statusLabel}>Screen Protection</Text>
          <Text
            style={[
              styles.statusValue,
              { color: state.isPrevented ? Colors.success : Colors.textSecondary },
            ]}
          >
            {state.isPrevented ? 'Protected' : 'Not Protected'}
          </Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>How it works</Text>
        <Text style={styles.infoText}>
          On iOS: Uses secure UITextField to obscure screen content when
          recording/casting.
        </Text>
        <Text style={styles.infoText}>
          On Android: Applies FLAG_SECURE to the window, preventing screenshots
          and recording.
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.primaryButton,
          { backgroundColor: state.isPrevented ? Colors.error : Colors.primary },
        ]}
        onPress={state.isPrevented ? disable : enable}
      >
        <Text style={styles.buttonText}>
          {state.isPrevented ? 'Disable Protection' : 'Enable Protection'}
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
  },
  description: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  statusCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
  },
  statusInfo: {
    flex: 1,
  },
  statusLabel: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  statusValue: {
    fontSize: FontSize.xl,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.sm,
  },
  infoTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
  },
  infoText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  primaryButton: {
    borderRadius: 10,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  buttonText: {
    color: Colors.surface,
    fontSize: FontSize.lg,
    fontWeight: '600',
  },
})
