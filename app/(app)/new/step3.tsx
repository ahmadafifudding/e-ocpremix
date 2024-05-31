import { Step3Form } from '@/components/Step3Form'
import { colors } from '@/constants/colors'
import { StyleSheet, View } from 'react-native'

export default function Step3() {
  return (
    <View style={styles.container}>
      <Step3Form />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
})
