import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { EmptyState } from '../../../components/EmptyState'
import { useJailbreakDetect } from '../hooks/useJailbreakDetect'
import { isIOS } from '../../../utils/platform'

export function JailbreakDetectScreen() {
  const { result, status, error, refetch } = useJailbreakDetect()

  if (!isIOS) {
    return (
      <EmptyState
        title="iOS Only"
        message="Jailbreak detection is only available on iOS devices"
      />
    )
  }

  if (status === 'scanning') {
    return <LoadingState message="Scanning for jailbreak indicators..." />
  }

  if (status === 'error') {
    return (
      <ErrorState
        message={error || 'Failed to detect jailbreak status'}
        onRetry={refetch}
      />
    )
  }

  if (!result) {
    return <EmptyState title="No Result" message="No detection data available" />
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Jailbreak Detection</Text>
        <View
          style={[
            styles.badge,
            result.isJailbroken ? styles.badgeUnsafe : styles.badgeSafe,
          ]}
        >
          <Text style={styles.badgeText}>
            {result.isJailbroken ? 'JAILBROKEN' : 'SECURE'}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Confidence Level</Text>
        <Text style={styles.value}>{result.confidence.toUpperCase()}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Findings</Text>
        {result.detections.length === 0 ? (
          <Text style={styles.value}>No jailbreak indicators detected</Text>
        ) : (
          result.detections.map((detection, index) => (
            <View key={index} style={styles.finding}>
              <Text style={styles.findingBullet}>•</Text>
              <Text style={styles.findingText}>{detection}</Text>
            </View>
          ))
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={refetch}>
        <Text style={styles.buttonText}>Rescan</Text>
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
    padding: Spacing.md,
    gap: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: FontSize.title,
    fontWeight: '700',
    color: Colors.text,
  },
  badge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
  },
  badgeSafe: {
    backgroundColor: Colors.success,
  },
  badgeUnsafe: {
    backgroundColor: Colors.error,
  },
  badgeText: {
    color: Colors.surface,
    fontWeight: '700',
    fontSize: FontSize.sm,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.sm,
  },
  label: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  value: {
    fontSize: FontSize.lg,
    color: Colors.text,
    fontWeight: '600',
  },
  finding: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'flex-start',
  },
  findingBullet: {
    color: Colors.warning,
    fontSize: FontSize.md,
  },
  findingText: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.text,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: Spacing.md,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.surface,
    fontSize: FontSize.lg,
    fontWeight: '600',
  },
})
