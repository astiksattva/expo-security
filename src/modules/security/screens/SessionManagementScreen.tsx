import { useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { useAppStore } from '../../../store/appStore'
import { useSession } from '../hooks/useSession'

export function SessionManagementScreen() {
  const setAuthenticated = useAppStore((s) => s.setAuthenticated)
  const {
    session,
    status,
    isLoading,
    error,
    login,
    logout,
    checkStatus,
    validate,
  } = useSession()

  useEffect(() => {
    checkStatus()
  }, [checkStatus])

  if (isLoading && !session) {
    return <LoadingState message="Loading session..." />
  }

  if (error && !session) {
    return <ErrorState message={error} onRetry={checkStatus} />
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Session Management</Text>

      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>Session Status</Text>
        <Text
          style={[
            styles.statusValue,
            { color: status?.isValid ? Colors.success : Colors.error },
          ]}
        >
          {status?.isValid ? 'Valid' : 'Invalid / No Session'}
        </Text>
        {status?.expiresAt && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Expires:</Text>
            <Text style={styles.detailValue}>
              {new Date(status.expiresAt).toLocaleString()}
            </Text>
          </View>
        )}
        {status?.timeRemaining != null && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Time Remaining:</Text>
            <Text style={styles.detailValue}>
              {Math.max(0, Math.floor(status.timeRemaining / 1000))}s
            </Text>
          </View>
        )}
        {status?.needsRefresh && (
          <View style={styles.warningBox}>
            <Text style={styles.warningText}>Session needs refresh</Text>
          </View>
        )}
      </View>

      {session ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Session Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Token Type:</Text>
            <Text style={styles.detailValue}>{session.tokenType}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Access Token:</Text>
            <Text style={styles.detailValue}>
              {session.accessToken.substring(0, 20)}...
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Refresh Token:</Text>
            <Text style={styles.detailValue}>
              {session.refreshToken.substring(0, 20)}...
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.emptySection}>
          <Text style={styles.emptyText}>No active session</Text>
        </View>
      )}

      <View style={styles.actions}>
        {session ? (
          <TouchableOpacity
            style={[styles.button, styles.logoutButton]}
            onPress={async () => {
              await logout()
              setAuthenticated(false)
            }}
          >
            <Text style={styles.buttonText}>Logout / Clear Session</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              login({
                accessToken: 'demo_access_token_' + Date.now(),
                refreshToken: 'demo_refresh_token_' + Date.now(),
                expiresAt: Date.now() + 3600000,
                tokenType: 'Bearer',
              })
            }
          >
            <Text style={styles.buttonText}>Create Demo Session</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.button, styles.refreshButton]}
          onPress={validate}
        >
          <Text style={styles.buttonText}>Validate Session</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>How it works</Text>
        <Text style={styles.infoText}>
          Sessions are stored in expo-secure-store. Tokens are persisted across
          app restarts. Auto-refresh triggers when time remaining falls below
          the configured threshold.
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
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.text,
  },
  errorBox: {
    backgroundColor: '#fce8e6',
    padding: Spacing.md,
    borderRadius: 8,
  },
  errorText: {
    color: Colors.error,
    fontSize: FontSize.md,
  },
  statusCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.sm,
  },
  statusLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statusValue: {
    fontSize: FontSize.xl,
    fontWeight: '700',
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
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  detailValue: {
    fontSize: FontSize.md,
    color: Colors.text,
    fontWeight: '500',
  },
  warningBox: {
    backgroundColor: '#fef7e0',
    padding: Spacing.sm,
    borderRadius: 8,
  },
  warningText: {
    color: Colors.warning,
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  emptySection: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  actions: {
    gap: Spacing.sm,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: Spacing.md,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: Colors.error,
  },
  refreshButton: {
    backgroundColor: Colors.secondary,
  },
  buttonText: {
    color: Colors.surface,
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#e8f0fe',
    padding: Spacing.md,
    borderRadius: 8,
    gap: Spacing.xs,
  },
  infoTitle: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  infoText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
})
