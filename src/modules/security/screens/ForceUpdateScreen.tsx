import { useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { useForceUpdate } from '../hooks/useForceUpdate'

export function ForceUpdateScreen() {
  const {
    versionInfo,
    updateStatus,
    currentVersion,
    isSupported,
    isLoading,
    error,
    checkUpdate,
    fetchVersionInfo,
    configure,
  } = useForceUpdate()

  useEffect(() => {
    fetchVersionInfo(
      async () => '2.0.0',
      async () => '1.5.0',
    )
  }, [fetchVersionInfo])

  if (isLoading && !versionInfo) {
    return <LoadingState message="Checking version info..." />
  }

  if (error && !versionInfo) {
    return <ErrorState message={error} />
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Force Update</Text>
      <Text style={styles.subtitle}>
        Ensure users are on a supported app version
      </Text>

      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <View style={styles.versionCard}>
        <Text style={styles.versionLabel}>Current Version</Text>
        <Text style={styles.versionValue}>{currentVersion}</Text>
      </View>

      {versionInfo && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Version Comparison</Text>
          <View style={styles.compareRow}>
            <Text style={styles.compareLabel}>Min Required:</Text>
            <Text style={styles.compareValue}>{versionInfo.minVersion}</Text>
          </View>
          <View style={styles.compareRow}>
            <Text style={styles.compareLabel}>Latest Available:</Text>
            <Text style={styles.compareValue}>{versionInfo.latestVersion}</Text>
          </View>
          <View style={styles.compareRow}>
            <Text style={styles.compareLabel}>Status:</Text>
            <Text
              style={[
                styles.compareValue,
                {
                  color:
                    versionInfo.currentVersion === versionInfo.latestVersion
                      ? Colors.success
                      : Colors.warning,
                },
              ]}
            >
              {versionInfo.currentVersion === versionInfo.latestVersion
                ? 'Up to date'
                : 'Update available'}
            </Text>
          </View>
        </View>
      )}

      {updateStatus && (
        <View
          style={[
            styles.updateBanner,
            updateStatus.needsUpdate
              ? styles.updateRequired
              : styles.updateOptional,
          ]}
        >
          <Text
            style={[
              styles.updateText,
              {
                color: updateStatus.needsUpdate
                  ? Colors.surface
                  : Colors.text,
              },
            ]}
          >
            {updateStatus.needsUpdate
              ? 'Update required to continue using this app'
              : updateStatus.isOptional
                ? 'A new version is available'
                : 'App is up to date'}
          </Text>
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            checkUpdate(async () => '1.5.0')
          }
        >
          <Text style={styles.buttonText}>Check with Min v1.5.0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={() =>
            checkUpdate(async () => {
              const [major, minor] = currentVersion.split('.').map(Number)
              return `${major}.${minor + 1}.0`
            })
          }
        >
          <Text style={styles.buttonText}>Check with Next Minor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonWarning]}
          onPress={() =>
            checkUpdate(async () => {
              const major = Number(currentVersion.split('.')[0]) + 1
              return `${major}.0.0`
            })
          }
        >
          <Text style={styles.buttonText}>Check Major Update</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuration</Text>
        <TouchableOpacity
          style={[styles.button, styles.configButton]}
          onPress={() => configure({ checkOnLaunch: true })}
        >
          <Text style={styles.buttonText}>Enable Launch Check</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.configButton]}
          onPress={() => configure({ checkOnLaunch: false })}
        >
          <Text style={styles.buttonText}>Disable Launch Check</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>How it works</Text>
        <Text style={styles.infoText}>
          The current app version is read from expo-application. In production,
          you would fetch the minimum required version from a remote server or
          Firebase Remote Config and compare it to determine if an update is
          needed.
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
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
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
  versionCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  versionLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  versionValue: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.text,
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
  compareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  compareLabel: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  compareValue: {
    fontSize: FontSize.md,
    fontWeight: '500',
    color: Colors.text,
  },
  updateBanner: {
    padding: Spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  updateRequired: {
    backgroundColor: Colors.error,
  },
  updateOptional: {
    backgroundColor: '#fef7e0',
  },
  updateText: {
    fontSize: FontSize.md,
    fontWeight: '600',
    textAlign: 'center',
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
  buttonSecondary: {
    backgroundColor: Colors.secondary,
  },
  buttonWarning: {
    backgroundColor: Colors.warning,
  },
  buttonText: {
    color: Colors.surface,
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  configButton: {
    backgroundColor: Colors.secondary,
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
