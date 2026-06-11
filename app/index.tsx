import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { Colors, Spacing, FontSize } from '../src/constants/theme'
import { FEATURE_CATEGORIES } from '../src/constants/features'

export default function HomeScreen() {
  const router = useRouter()

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.title}>Expo Security Lab</Text>
        <Text style={styles.subtitle}>
          Enterprise-grade mobile security features for React Native Expo
        </Text>
      </View>

      <View style={styles.grid}>
        {FEATURE_CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.card}
            onPress={() => router.push(`/dashboard?category=${category.id}`)}
            activeOpacity={0.7}
          >
            <Text style={styles.cardIcon}>{getCategoryIcon(category.id)}</Text>
            <Text style={styles.cardTitle}>{category.label}</Text>
            <Text style={styles.cardAction}>Explore →</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.dashboardButton}
        onPress={() => router.push('/dashboard')}
        activeOpacity={0.7}
      >
        <Text style={styles.dashboardButtonText}>Open Full Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

function getCategoryIcon(id: string): string {
  const icons: Record<string, string> = {
    authentication: '🔐',
    'screen-security': '🖥️',
    'device-security': '🛡️',
    'device-monitoring': '📊',
    enterprise: '🏢',
    security: '🔒',
  }
  return icons[id] || '📦'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.md,
    gap: Spacing.lg,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    gap: Spacing.sm,
  },
  title: {
    fontSize: FontSize.title,
    fontWeight: '700',
    color: Colors.text,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  grid: {
    gap: Spacing.md,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  cardIcon: {
    fontSize: 32,
  },
  cardTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  cardAction: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: '500',
  },
  dashboardButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: Spacing.md,
    alignItems: 'center',
  },
  dashboardButtonText: {
    color: Colors.surface,
    fontSize: FontSize.lg,
    fontWeight: '600',
  },
})
