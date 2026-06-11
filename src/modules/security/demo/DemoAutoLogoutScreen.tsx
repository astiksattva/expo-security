import { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'

const DEMO_TIMEOUT = 15000
const DEMO_WARNING = 5000

export function DemoAutoLogoutScreen() {
  const [lastActivity, setLastActivity] = useState<number>(Date.now())
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState<number>(DEMO_TIMEOUT)
  const [showWarning, setShowWarning] = useState(false)
  const [isTimedOut, setIsTimedOut] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const startMonitoring = () => {
    setIsMonitoring(true)
    setIsTimedOut(false)
    setShowWarning(false)
    setLastActivity(Date.now())

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - lastActivity
      const remaining = Math.max(0, DEMO_TIMEOUT - elapsed)
      setTimeRemaining(remaining)

      if (elapsed >= DEMO_TIMEOUT - DEMO_WARNING && !showWarning) {
        setShowWarning(true)
      }

      if (elapsed >= DEMO_TIMEOUT) {
        setIsTimedOut(true)
        setIsMonitoring(false)
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }, 500)
  }

  const stopMonitoring = () => {
    setIsMonitoring(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const recordActivity = () => {
    setLastActivity(Date.now())
    setTimeRemaining(DEMO_TIMEOUT)
    setShowWarning(false)
  }

  const reset = () => {
    setLastActivity(Date.now())
    setTimeRemaining(DEMO_TIMEOUT)
    setShowWarning(false)
    setIsTimedOut(false)
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Auto Logout (Demo)</Text>
      <Text style={styles.subtitle}>Simulated inactivity timer — 15s timeout, 5s warning</Text>

      {isTimedOut && (
        <View style={styles.timeoutBanner}>
          <Text style={styles.timeoutText}>Session timed out due to inactivity!</Text>
        </View>
      )}

      {showWarning && !isTimedOut && (
        <View style={styles.warningBanner}>
          <Text style={styles.warningText}>Inactivity warning! Logging out in {Math.ceil(timeRemaining / 1000)}s</Text>
        </View>
      )}

      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>Status</Text>
        <View style={styles.statusRow}><Text style={styles.statusKey}>Monitoring:</Text><Text style={[styles.statusValue, { color: isMonitoring ? Colors.success : Colors.textSecondary }]}>{isMonitoring ? 'Active' : 'Inactive'}</Text></View>
        <View style={styles.statusRow}><Text style={styles.statusKey}>Time Remaining:</Text><Text style={styles.statusValue}>{Math.ceil(timeRemaining / 1000)}s</Text></View>
      </View>

      <View style={styles.actions}>
        {isMonitoring ? (
          <TouchableOpacity style={[styles.button, { backgroundColor: Colors.error }]} onPress={stopMonitoring}><Text style={styles.buttonText}>Stop Monitoring</Text></TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={startMonitoring}><Text style={styles.buttonText}>Start Monitoring</Text></TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={recordActivity}><Text style={styles.buttonText}>Record Activity</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: Colors.secondary }]} onPress={reset}><Text style={styles.buttonText}>Reset Timer</Text></TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.md, gap: Spacing.md },
  title: { fontSize: FontSize.xxl, fontWeight: '700', color: Colors.text },
  subtitle: { fontSize: FontSize.md, color: Colors.textSecondary },
  timeoutBanner: { backgroundColor: Colors.error, padding: Spacing.md, borderRadius: 8 },
  timeoutText: { color: Colors.surface, fontSize: FontSize.md, fontWeight: '600', textAlign: 'center' },
  warningBanner: { backgroundColor: '#fef7e0', padding: Spacing.md, borderRadius: 8 },
  warningText: { color: Colors.warning, fontSize: FontSize.md, fontWeight: '600', textAlign: 'center' },
  statusCard: { backgroundColor: Colors.surface, borderRadius: 12, padding: Spacing.md, borderWidth: 1, borderColor: Colors.border, gap: Spacing.sm },
  statusLabel: { fontSize: FontSize.sm, color: Colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1 },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statusKey: { fontSize: FontSize.md, color: Colors.textSecondary },
  statusValue: { fontSize: FontSize.md, fontWeight: '500', color: Colors.text },
  actions: { gap: Spacing.sm },
  button: { backgroundColor: Colors.primary, borderRadius: 8, padding: Spacing.md, alignItems: 'center' },
  buttonText: { color: Colors.surface, fontSize: FontSize.md, fontWeight: '600' },
})
