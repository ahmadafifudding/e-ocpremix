import { colors } from '@/constants/colors'
import {
  Pressable,
  PressableProps,
  Text,
  StyleSheet,
  ViewProps,
} from 'react-native'

interface ButtonProps extends PressableProps {
  label: string
  style?: ViewProps['style']
}

export function SecondaryButton({ label, style, ...props }: ButtonProps) {
  return (
    <Pressable style={[styles.button, style]} {...props}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderColor: colors.brand,
    borderWidth: 1,
    marginHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: colors.brand,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
  },
})
