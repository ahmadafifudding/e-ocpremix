import { Step2Form } from '@/components/Step2Form'
import { colors } from '@/constants/colors'
import { StyleSheet, View } from 'react-native'

export default function Step2() {
  return (
    <View style={styles.container}>
      <Step2Form />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
})
