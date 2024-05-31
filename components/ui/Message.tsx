import { StyleSheet, Text, TextProps } from 'react-native'

interface MessageProps extends TextProps {}

export function Message({ style, ...props }: MessageProps) {
  return <Text style={[styles.message, style]} {...props} />
}

const styles = StyleSheet.create({
  message: {
    fontSize: 12,
    lineHeight: 16,
    color: '#C50F1F',
    marginHorizontal: 16,
    paddingVertical: 4,
  },
})
