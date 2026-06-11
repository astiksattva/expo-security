import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { useRecordingPrevent } from '../hooks/useRecordingPrevent'
import { LoadingState } from '../../../components/LoadingState'
import { ErrorState } from '../../../components/ErrorState'
import { EmptyState } from '../../../components/EmptyState'

export function RecordingPreventScreen() {
  const { state, error, loading, enable, disable } = useRecordingPrevent()

  if (loading) {
    return <LoadingState message="Configuring recording prevention..." />
  }

  if (!state.available) {
    return (
      <EmptyState
        title="Recording prevention unavailable"
        message="This feature requires a physical device with a Dev Build or EAS Build. Expo Go does not support native screen protection APIs."
      />
    )
  }

  if (error) {
    return <ErrorState message={error} onRetry={state.isPrevented ? disable : enable} />
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Recording Prevention</Text>
      <Text style={styles.description}>
        Prevents screen recording by applying secure window flags. Protects
        sensitive content from being captured.
      </Text>

      <View style={styles.statusCard}>
        <View
          style={[
            styles.indicator,
            { backgroundColor: state.isPrevented ? Colors.success : Colors.disabled },
          ]}
        />
        <Text style={styles.statusLabel}>Recording Protection</Text>
        <Text
          style={[
            styles.statusValue,
            { color: state.isPrevented ? Colors.success : Colors.textSecondary },
          ]}
        >
          {state.isPrevented ? 'Enabled' : 'Disabled'}
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Platform Behavior</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoPlatform}>iOS</Text>
          <Text style={styles.infoDesc}>
            Screen content is hidden when recording is active via secure text
            field overlay
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Text style={styles.infoPlatform}>Android</Text>
          <Text style={styles.infoDesc}>
            FLAG_SECURE prevents screen recording and screenshots at the window
            level
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.primaryButton,
          { backgroundColor: state.isPrevented ? Colors.error : Colors.primary },
        ]}
        onPress={state.isPrevented ? disable : enable}
      >
        <Text style={styles.buttonText}>
          {state.isPrevented ? 'Disable Prevention' : 'Enable Prevention'}
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
    gap: Spacing.sm,
  },
  indicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  statusLabel: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    flex: 1,
  },
  statusValue: {
    fontSize: FontSize.lg,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.md,
  },
  infoTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
  },
  infoRow: {
    gap: Spacing.xs,
  },
  infoPlatform: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.primary,
  },
  infoDesc: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
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
