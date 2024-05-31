import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { colors } from '@/constants/colors'

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={colors.brand} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
  },
})
