import { View, Text, StyleSheet } from 'react-native'
import { Colors, FontSize, Spacing } from '../constants/theme'

type Status = 'stable' | 'beta' | 'planned'

interface StatusBadgeProps {
  status: Status
}

const STATUS_CONFIG: Record<Status, { label: string; color: string; bg: string }> = {
  stable: { label: 'Stable', color: Colors.success, bg: '#e6f4ea' },
  beta: { label: 'Beta', color: Colors.warning, bg: '#fef7e0' },
  planned: { label: 'Planned', color: Colors.secondary, bg: '#f1f3f4' },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status]
  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <Text style={[styles.text, { color: config.color }]}>{config.label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
  },
  text: {
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
})
