import { StyleSheet } from 'react-native'
import { Link as RNLink } from 'expo-router'
import { colors } from '@/constants/colors'

interface NavLinkProps extends React.ComponentProps<typeof RNLink> {}

export function Link({ style, ...props }: NavLinkProps) {
  return <RNLink style={[styles.link, style]} {...props} />
}

const styles = StyleSheet.create({
  link: {
    color: colors.brand,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: 'semibold',
  },
})
