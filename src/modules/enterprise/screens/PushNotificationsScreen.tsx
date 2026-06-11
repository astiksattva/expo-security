import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { EmptyState } from '../../../components/EmptyState'
import { usePushNotifications } from '../hooks/usePushNotifications'

export function PushNotificationsScreen() {
  const {
    permission,
    token,
    lastNotification,
    lastResponse,
    isLoading,
    error,
    requestPermission,
    sendTestNotification,
  } = usePushNotifications()

  const handleSendTest = () => {
    sendTestNotification({
      title: 'Test Notification',
      body: 'This is a test push notification',
      data: { type: 'test', screen: 'enterprise/push-notifications' },
    })
  }

  if (isLoading && !permission) {
    return <LoadingState message="Setting up notifications..." />
  }

  if (error && !permission) {
    return <ErrorState message={error} onRetry={requestPermission} />
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Push Notifications</Text>
      <Text style={styles.description}>
        Send and receive push notifications using expo-notifications
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Permission Status</Text>
        <Text style={styles.valueText}>
          {permission ? permission.status : 'Not requested'}
        </Text>
        {!permission?.granted && (
          <TouchableOpacity style={styles.button} onPress={requestPermission}>
            <Text style={styles.buttonText}>Request Permission</Text>
          </TouchableOpacity>
        )}
      </View>

      {token && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Push Token</Text>
          <Text style={styles.monoText} numberOfLines={2}>
            {token.data}
          </Text>
        </View>
      )}

      {permission?.granted && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions</Text>
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleSendTest}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>Send Test Notification</Text>
          </TouchableOpacity>
        </View>
      )}

      {lastNotification && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Last Notification</Text>
          <Text style={styles.valueText}>
            {lastNotification.request.content.title}
          </Text>
          <Text style={styles.labelText}>
            {lastNotification.request.content.body}
          </Text>
        </View>
      )}

      {lastResponse && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Last Response</Text>
          <Text style={styles.valueText}>
            {lastResponse.notification.request.content.title}
          </Text>
        </View>
      )}

      {!permission && !isLoading && !error && (
        <EmptyState
          title="Notifications Not Setup"
          message="Tap the button above to request notification permissions"
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
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
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
})
