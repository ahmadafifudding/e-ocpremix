import { colors } from '@/constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { Pressable, PressableProps, StyleSheet, Text } from 'react-native'

interface RadioButtonProps {
  iconName: keyof typeof Ionicons.glyphMap
  label: string
  isSelected?: boolean
  value: string
  onPress: (value: string) => void
}

export function RadioButton({
  iconName,
  label,
  isSelected,
  value,
  onPress,
  ...props
}: RadioButtonProps) {
  return (
    <Pressable
      style={[styles.container, isSelected ? styles.active : styles.inactive]}
      onPress={() => onPress(value)}
      {...props}
    >
      <Ionicons
        name={iconName}
        size={24}
        color={isSelected ? '#ffffff' : '#808080'}
      />
      <Text
        style={[styles.label, { color: isSelected ? '#ffffff' : '#242424' }]}
      >
        {label}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 18,
    paddingHorizontal: 12,
    flexDirection: 'row',
    columnGap: 12,
    alignItems: 'center',
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
  },
  label: {
    fontSize: 15,
    lineHeight: 20,
    color: '#242424',
  },
  active: {
    backgroundColor: colors.brand,
  },
  inactive: {
    backgroundColor: colors.background,
  },
})
