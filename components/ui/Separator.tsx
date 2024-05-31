import { View, StyleSheet } from 'react-native'

export function Separator() {
  return <View style={styles.separator} />
}

const styles = StyleSheet.create({
  separator: {
    borderColor: '#E2E2E2',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 16,
  },
})
