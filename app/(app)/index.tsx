import { router } from 'expo-router'
import { Button } from '@/components/ui/Button'
import { colors } from '@/constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, View } from 'react-native'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Button
        label='All Projects'
        onPress={() => {
          router.push('/projects')
        }}
      >
        <Ionicons
          name='list'
          size={20}
          color='white'
          style={{ marginRight: 8 }}
        />
      </Button>
      <Button
        label='New Project'
        onPress={() => {
          router.push('/new')
        }}
      >
        <Ionicons
          name='add-circle-outline'
          size={20}
          color='white'
          style={{ marginRight: 8 }}
        />
      </Button>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    rowGap: 16,
  },
})
