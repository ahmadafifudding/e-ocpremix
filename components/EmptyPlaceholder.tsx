import { View, StyleSheet, Text } from 'react-native'
import { colors } from '@/constants/colors'

export function EmptyPlaceholder() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No data available</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  text: {
    fontSize: 17,
    lineHeight: 22,
  },
})
