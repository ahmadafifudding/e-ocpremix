import { DataAnalysis } from '@/components/DataAnalysis'
import { colors } from '@/constants/colors'
import { StyleSheet, View } from 'react-native'

export default function DataAnalysisScreen() {
  return (
    <View style={styles.container}>
      <DataAnalysis />
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
})
