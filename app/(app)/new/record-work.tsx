// import { RecordWork } from '@/components/RecordWork'
import { colors } from '@/constants/colors'
import { StyleSheet, ScrollView } from 'react-native'

export default function RecordWorkScreen() {
  return (
    <ScrollView style={styles.container}>{/* <RecordWork /> */}</ScrollView>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
})
