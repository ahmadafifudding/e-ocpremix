import { colors } from '@/constants/colors'
import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native'

interface Props extends TextInputProps {
  placeholder?: string
  value?: string
  onChangeText?: (text: string) => void
}
export function TextInput({ style, secureTextEntry, ...props }: Props) {
  return (
    <RNTextInput
      cursorColor={colors.brand}
      style={[styles.input, style]}
      secureTextEntry={secureTextEntry}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderColor: '#D1D1D1',
    paddingVertical: 12,
    fontSize: 17,
    lineHeight: 22,
    marginHorizontal: 16,
    backgroundColor: colors.background,
  },
})
