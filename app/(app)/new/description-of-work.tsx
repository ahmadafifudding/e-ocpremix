import { DescriptionOfWorkForm } from '@/components/DescriptionOfWork'
import { colors } from '@/constants/colors'
import { StyleSheet, View } from 'react-native'

export default function DescriptionOfWorkScreen() {
  return (
    <View style={styles.container}>
      <DescriptionOfWorkForm />
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
})
