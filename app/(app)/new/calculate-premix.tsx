import { CalculatePremixForm } from '@/components/CalculatePremixForm'
import { colors } from '@/constants/colors'
import { StyleSheet, View } from 'react-native'

export default function CalculatePremixScreen() {
  return (
    <View style={styles.container}>
      <CalculatePremixForm />
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
})
