import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { EmptyState } from '../../../components/EmptyState'
import { useDeepLinking } from '../hooks/useDeepLinking'
import { createDeepLink } from '../services/deepLinkingService'

export function DeepLinkingScreen() {
  const { deepLink, initialDeepLink, isLoading, error } = useDeepLinking()

  if (isLoading) {
    return <LoadingState message="Initializing deep linking..." />
  }

  if (error && !deepLink && !initialDeepLink) {
    return <ErrorState message={error} />
  }

  const appScheme = createDeepLink('')

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Deep Linking</Text>
      <Text style={styles.description}>
        Handle deep links using expo-linking
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App URL Scheme</Text>
        <Text style={styles.monoText}>{appScheme}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sample Links</Text>
        <Text style={styles.monoText}>{createDeepLink('enterprise/deep-linking')}</Text>
        <Text style={styles.monoText}>{createDeepLink('dashboard')}</Text>
        <Text style={styles.monoText}>{createDeepLink('auth/fingerprint')}</Text>
      </View>

      {initialDeepLink && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Initial Deep Link</Text>
          <Text style={styles.valueText}>Path: {initialDeepLink.path || '/'}</Text>
          <Text style={styles.labelText}>{initialDeepLink.url}</Text>
        </View>
      )}

      {deepLink && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Received Deep Link</Text>
          <Text style={styles.valueText}>Path: {deepLink.path || '/'}</Text>
          <Text style={styles.labelText}>{deepLink.url}</Text>
          {deepLink.route && (
            <Text style={styles.labelText}>Route: {deepLink.route}</Text>
          )}
        </View>
      )}

      {!deepLink && !initialDeepLink && !isLoading && !error && (
        <EmptyState
          title="No Deep Links Yet"
          message="Open a deep link to see it appear here"
        />
      )}
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
  description: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: 20,
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
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  valueText: {
    fontSize: FontSize.md,
    color: Colors.text,
    fontWeight: '500',
  },
  labelText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  monoText: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontFamily: 'monospace',
  },
})
