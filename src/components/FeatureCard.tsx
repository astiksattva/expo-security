import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FeatureInfo } from '../types/features'
import { Colors, Spacing, FontSize } from '../constants/theme'
import { StatusBadge } from './StatusBadge'
import { PlatformBadge } from './PlatformBadge'

interface FeatureCardProps {
  feature: FeatureInfo
  onPress: (feature: FeatureInfo) => void
}

export function FeatureCard({ feature, onPress }: FeatureCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(feature)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{feature.name}</Text>
        <StatusBadge status={feature.supportStatus} />
      </View>
      <Text style={styles.description}>{feature.description}</Text>
      <View style={styles.footer}>
        <PlatformBadge platforms={feature.platformSupport} />
        <Text style={styles.docLink}>Docs →</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
    marginRight: Spacing.sm,
  },
  description: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  docLink: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: '500',
  },
})
