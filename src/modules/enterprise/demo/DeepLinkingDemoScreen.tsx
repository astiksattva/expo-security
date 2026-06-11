import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { EmptyState } from '../../../components/EmptyState'
import { useDeepLinking } from '../hooks/useDeepLinking'
import { createDeepLink, parseDeepLink } from '../services/deepLinkingService'

export function DeepLinkingDemoScreen() {
  const { deepLink, initialDeepLink, isLoading, error } = useDeepLinking()

  if (isLoading) {
    return <LoadingState message="Initializing deep linking demo..." />
  }

  if (error && !deepLink && !initialDeepLink) {
    return <ErrorState message={error} />
  }

  const testLinks = [
    { label: 'Dashboard', path: 'dashboard' },
    { label: 'Fingerprint Auth', path: 'auth/fingerprint' },
    { label: 'QR Scanner', path: 'enterprise/qr-scanner' },
    { label: 'NFC', path: 'enterprise/nfc' },
  ]

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>DEMO</Text>
      </View>

      <Text style={styles.title}>Deep Linking — Demo</Text>
      <Text style={styles.description}>
        Interactive demo for testing deep link generation and handling.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App URL Scheme</Text>
        <Text style={styles.monoText}>{createDeepLink('')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Test Deep Links</Text>
        <Text style={styles.labelText}>
          These URLs can be opened from a browser or another app:
        </Text>
        {testLinks.map((link) => (
          <View key={link.path} style={styles.linkItem}>
            <Text style={styles.linkLabel}>{link.label}</Text>
            <Text style={styles.monoText}>{createDeepLink(link.path)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Parse a Link Manually</Text>
        {testLinks.map((link) => {
          const parsed = parseDeepLink(createDeepLink(link.path))
          return (
            <View key={link.path} style={styles.parsedItem}>
              <Text style={styles.parsedLabel}>{link.label}</Text>
              <Text style={styles.parsedText}>
                Path: {parsed.path} | Route: {parsed.route}
              </Text>
            </View>
          )
        })}
      </View>

      {initialDeepLink && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Initial Deep Link</Text>
          <Text style={styles.valueText}>Path: {initialDeepLink.path || '/'}</Text>
          <Text style={styles.monoText}>{initialDeepLink.url}</Text>
        </View>
      )}

      {deepLink && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Live Deep Link</Text>
          <Text style={styles.valueText}>Path: {deepLink.path || '/'}</Text>
          <Text style={styles.monoText}>{deepLink.url}</Text>
        </View>
      )}

      {!deepLink && !initialDeepLink && !isLoading && !error && (
        <EmptyState
          title="No Deep Links Detected"
          message="Open a deep link URL to test handling"
        />
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Demo Notes</Text>
        <Text style={styles.noteText}>
      {'• Use `xcrun simctl openurl booted <url>` on iOS simulator\n'}
      {'• Use `adb shell am start -W -a android.intent.action.VIEW -d <url>` on Android\n'}
          • Deep links are parsed and displayed in real-time{'\n'}
          • Initial deep link captures the URL that launched the app
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
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.warning,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: FontSize.sm,
    fontWeight: '700',
    color: Colors.surface,
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
  linkItem: {
    gap: Spacing.xs,
  },
  linkLabel: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.text,
  },
  parsedItem: {
    gap: Spacing.xs,
  },
  parsedLabel: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.text,
  },
  parsedText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  noteText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
})
