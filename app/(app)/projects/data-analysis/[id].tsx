import { View, StyleSheet } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { Button } from '@/components/ui/Button'
import { colors } from '@/constants/colors'

export default function DataAnalysisScreen() {
  const { id } = useLocalSearchParams()

  return (
    <View style={styles.container}>
      <Button
        label='Premix'
        onPress={() => router.push(`/projects/premix/${id}`)}
      />
      <Button
        label='Progress Record/Work'
        onPress={() => router.push(`/projects/record-work/${id}`)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    rowGap: 16,
  },
})
