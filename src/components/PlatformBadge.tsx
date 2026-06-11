import { View, Text, StyleSheet } from 'react-native'
import { Colors, FontSize, Spacing } from '../constants/theme'

interface PlatformBadgeProps {
  platforms: { ios: boolean; android: boolean; web: boolean }
}

export function PlatformBadge({ platforms }: PlatformBadgeProps) {
  const items = [
    { key: 'iOS', supported: platforms.ios },
    { key: 'Android', supported: platforms.android },
    { key: 'Web', supported: platforms.web },
  ]

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <View
          key={item.key}
          style={[
            styles.badge,
            { backgroundColor: item.supported ? '#e6f4ea' : '#f1f3f4' },
          ]}
        >
          <Text
            style={[
              styles.text,
              { color: item.supported ? Colors.success : Colors.disabled },
            ]}
          >
            {item.key}
          </Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 8,
  },
  text: {
    fontSize: FontSize.sm,
    fontWeight: '500',
  },
})
