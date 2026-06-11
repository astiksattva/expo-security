import { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'

interface DemoSession {
  accessToken: string
  refreshToken: string
  expiresAt: number
}

export function DemoSessionManagementScreen() {
  const [session, setSession] = useState<DemoSession | null>(null)
  const [status, setStatus] = useState<string>('No session')

  const createSession = () => {
    const newSession: DemoSession = {
      accessToken: 'demo_access_' + Math.random().toString(36).substring(2, 10),
      refreshToken: 'demo_refresh_' + Math.random().toString(36).substring(2, 10),
      expiresAt: Date.now() + 3600000,
    }
    setSession(newSession)
    setStatus('Session created (expires in 1 hour)')
  }

  const refreshSession = () => {
    if (!session) return
    setSession({
      ...session,
      accessToken: 'demo_access_' + Math.random().toString(36).substring(2, 10),
      expiresAt: Date.now() + 3600000,
    })
    setStatus('Session refreshed (expires in 1 hour)')
  }

  const clearSession = () => {
    setSession(null)
    setStatus('Session cleared')
  }

  const expiresSoon = () => {
    if (!session) return
    setSession({ ...session, expiresAt: Date.now() + 60000 })
    setStatus('Session expires in 1 minute — refresh recommended')
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Session Management (Demo)</Text>
      <Text style={styles.subtitle}>Simulated session lifecycle — no native storage</Text>

      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>Status</Text>
        <Text style={[styles.statusValue, { color: session ? Colors.success : Colors.textSecondary }]}>
          {status}
        </Text>
      </View>

      {session && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Session Details</Text>
          <View style={styles.detailRow}><Text style={styles.detailLabel}>Access:</Text><Text style={styles.detailValue}>{session.accessToken}</Text></View>
          <View style={styles.detailRow}><Text style={styles.detailLabel}>Refresh:</Text><Text style={styles.detailValue}>{session.refreshToken}</Text></View>
          <View style={styles.detailRow}><Text style={styles.detailLabel}>Expires:</Text><Text style={styles.detailValue}>{new Date(session.expiresAt).toLocaleTimeString()}</Text></View>
        </View>
      )}

      <View style={styles.actions}>
        {!session ? (
          <TouchableOpacity style={styles.button} onPress={createSession}><Text style={styles.buttonText}>Create Session</Text></TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={refreshSession}><Text style={styles.buttonText}>Refresh Token</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: Colors.warning }]} onPress={expiresSoon}><Text style={styles.buttonText}>Expire Soon</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: Colors.error }]} onPress={clearSession}><Text style={styles.buttonText}>Clear Session</Text></TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.md, gap: Spacing.md },
  title: { fontSize: FontSize.xxl, fontWeight: '700', color: Colors.text },
  subtitle: { fontSize: FontSize.md, color: Colors.textSecondary },
  statusCard: { backgroundColor: Colors.surface, borderRadius: 12, padding: Spacing.md, borderWidth: 1, borderColor: Colors.border, gap: Spacing.sm },
  statusLabel: { fontSize: FontSize.sm, color: Colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1 },
  statusValue: { fontSize: FontSize.lg, fontWeight: '600' },
  section: { backgroundColor: Colors.surface, borderRadius: 12, padding: Spacing.md, borderWidth: 1, borderColor: Colors.border, gap: Spacing.sm },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: '600', color: Colors.text },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between' },
  detailLabel: { fontSize: FontSize.md, color: Colors.textSecondary },
  detailValue: { fontSize: FontSize.md, fontWeight: '500', color: Colors.text },
  actions: { gap: Spacing.sm },
  button: { backgroundColor: Colors.primary, borderRadius: 8, padding: Spacing.md, alignItems: 'center' },
  buttonText: { color: Colors.surface, fontSize: FontSize.md, fontWeight: '600' },
})
