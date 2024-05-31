import { supabase } from '@/lib/supabase'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Alert } from 'react-native'

export function LogoutButton() {
  const router = useRouter()

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      Alert.alert('Error logging out', error.message)
    } else {
      router.push('/')
    }
  }
  return (
    <Ionicons
      name='log-out-outline'
      size={24}
      onPress={logout}
      color='#616161'
    />
  )
}
