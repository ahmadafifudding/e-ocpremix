import { View, StyleSheet, ViewProps } from 'react-native'

interface AuthFooterProps extends ViewProps {}
export function AuthFooter({ style, ...props }: AuthFooterProps) {
  return <View style={[styles.footerContainer, style]} {...props} />
}

const styles = StyleSheet.create({
  footerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
})
