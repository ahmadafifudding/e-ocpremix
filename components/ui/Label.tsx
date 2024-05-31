import { StyleSheet, Text, TextProps } from 'react-native'

interface Props extends TextProps {}

export function Label({ style, ...props }: Props) {
  return <Text style={[styles.label, style]} {...props} />
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    lineHeight: 16,
    color: '#616161',
    marginHorizontal: 16,
    marginTop: 12,
  },
})
