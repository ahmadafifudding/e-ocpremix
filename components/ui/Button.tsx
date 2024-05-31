import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TextProps,
  ViewProps,
} from 'react-native'
import { colors } from '@/constants/colors'

interface ButtonProps extends PressableProps {
  label?: string
  children?: TextProps['children']
  style?: ViewProps['style']
  isLoading?: boolean
}

export function Button({
  label,
  children,
  disabled,
  isLoading,
  style,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      style={[
        styles.buttonContainer,
        { backgroundColor: disabled ? '#F0F0F0' : colors.brand },
        style,
      ]}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color='white' style={{ marginRight: 6 }} />
      ) : (
        children
      )}
      {!isLoading && (
        <Text
          style={[styles.label, { color: disabled ? '#BDBDBD' : '#FFFFFF' }]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 52,
    marginHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
  },
})
