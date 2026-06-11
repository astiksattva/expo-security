import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { EmptyState } from '../../../components/EmptyState'
import { usePushNotifications } from '../hooks/usePushNotifications'

export function PushNotificationsDemoScreen() {
  const {
    permission,
    token,
    lastNotification,
    isLoading,
    error,
    requestPermission,
    sendTestNotification,
  } = usePushNotifications()

  const handleSendTest = () => {
    sendTestNotification({
      title: 'Demo Notification',
      body: 'This is a demo notification from the test screen',
      data: { type: 'demo', source: 'demo-screen' },
    })
  }

  if (isLoading && !permission) {
    return <LoadingState message="Setting up demo notifications..." />
  }

  if (error && !permission) {
    return <ErrorState message={error} onRetry={requestPermission} />
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>DEMO</Text>
      </View>

      <Text style={styles.title}>Push Notifications — Demo</Text>
      <Text style={styles.description}>
        Interactive demo for testing push notification permissions, token retrieval,
        and sending local notifications.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Step 1: Permission</Text>
        <Text style={styles.valueText}>
          Status: {permission ? permission.status : 'Not requested'}
        </Text>
        {!permission?.granted && (
          <TouchableOpacity style={styles.button} onPress={requestPermission}>
            <Text style={styles.buttonText}>Grant Permission</Text>
          </TouchableOpacity>
        )}
        {permission?.granted && (
          <Text style={styles.successText}>Permission granted ✓</Text>
        )}
      </View>

      {token && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Step 2: Push Token</Text>
          <Text style={styles.monoText} numberOfLines={2}>
            {token.data}
          </Text>
        </View>
      )}

      {permission?.granted && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Step 3: Send Test</Text>
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleSendTest}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Sending...' : 'Send Demo Notification'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {lastNotification && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Received Notification</Text>
          <Text style={styles.valueText}>
            {lastNotification.request.content.title}
          </Text>
          <Text style={styles.labelText}>
            {lastNotification.request.content.body}
          </Text>
        </View>
      )}

      {!permission && !isLoading && !error && (
        <EmptyState
          title="Demo Not Started"
          message="Tap 'Grant Permission' to begin testing push notifications"
        />
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Demo Notes</Text>
        <Text style={styles.noteText}>
          • Requires physical device or simulator{'\n'}
          • iOS simulator cannot receive push tokens{'\n'}
          • Android emulator requires Google Play Services{'\n'}
          • Local notifications work on both platforms
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
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  successText: {
    fontSize: FontSize.md,
    color: Colors.success,
    fontWeight: '600',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: Colors.surface,
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  noteText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
})
