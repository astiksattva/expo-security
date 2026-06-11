import { useState, useMemo } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { FEATURES, FEATURE_CATEGORIES } from '../../../constants/features'
import { FeatureCard } from '../../../components/FeatureCard'
import { FeatureInfo } from '../../../types/features'

export function DashboardScreen() {
  const router = useRouter()
  const params = useLocalSearchParams<{ category?: string }>()
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    params.category || null,
  )

  const filteredFeatures = useMemo(() => {
    let result = FEATURES
    if (selectedCategory) {
      result = result.filter((f) => f.category === selectedCategory)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.description.toLowerCase().includes(q),
      )
    }
    return result
  }, [selectedCategory, search])

  const handleFeaturePress = (feature: FeatureInfo) => {
    const categoryRoutes: Record<string, string> = {
      authentication: '/auth/',
      'screen-security': '/screen-security/',
      'device-security': '/device-security/',
      'device-monitoring': '/device-monitoring/',
      enterprise: '/enterprise/',
      security: '/security/',
    }
    const base = categoryRoutes[feature.category]
    if (base) {
      router.push(`${base}${feature.id}`)
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TextInput
        style={styles.search}
        placeholder="Search features..."
        placeholderTextColor={Colors.disabled}
        value={search}
        onChangeText={setSearch}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categories}
        contentContainerStyle={styles.categoriesContent}
      >
        <TouchableOpacity
          style={[styles.chip, !selectedCategory && styles.chipActive]}
          onPress={() => setSelectedCategory(null)}
        >
          <Text style={[styles.chipText, !selectedCategory && styles.chipTextActive]}>
            All
          </Text>
        </TouchableOpacity>
        {FEATURE_CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[styles.chip, selectedCategory === cat.id && styles.chipActive]}
            onPress={() => setSelectedCategory(cat.id)}
          >
            <Text
              style={[
                styles.chipText,
                selectedCategory === cat.id && styles.chipTextActive,
              ]}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.features}>
        {filteredFeatures.map((feature) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            onPress={handleFeaturePress}
          />
        ))}
      </View>

      {filteredFeatures.length === 0 && (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No features found</Text>
        </View>
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
  search: {
    backgroundColor: Colors.surface,
    borderRadius: 10,
    padding: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categories: {
    maxHeight: 44,
  },
  categoriesContent: {
    gap: Spacing.sm,
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  chipTextActive: {
    color: Colors.surface,
    fontWeight: '600',
  },
  features: {
    gap: Spacing.md,
  },
  empty: {
    paddingVertical: Spacing.xxl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: FontSize.lg,
    color: Colors.textSecondary,
  },
})
