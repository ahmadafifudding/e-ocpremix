import { View, StyleSheet } from 'react-native'
import { NewProjectForm } from '@/components/NewProjectForm'
import { colors } from '@/constants/colors'

export default function NewProjectScreen() {
  return (
    <View style={styles.container}>
      <NewProjectForm />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
})
