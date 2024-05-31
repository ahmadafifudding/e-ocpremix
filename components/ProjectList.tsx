import { useState, useEffect } from 'react'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native'
import { Tables } from '@/types/database.types'
import { supabase } from '@/lib/supabase'
import { colors } from '@/constants/colors'
import { useAuth } from '@/providers/AuthProvider'
import { ProjectItem } from './ProjectItem'
import { Separator } from './ui/Separator'

export function ProjectList() {
  const { session } = useAuth()

  const [projects, setProjects] = useState<Tables<'projects'>[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    if (session) fetchProjects()
  }, [session])

  const refresh = () => {
    setRefreshing(true)
    fetchProjects()
    setRefreshing(false)
  }

  async function fetchProjects() {
    try {
      setIsLoading(true)
      if (!session?.user) throw new Error('No user on the session')

      const { data, error, status } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', session?.user.id)
        .order('date', { ascending: false })

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setProjects(data)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error fetching projects', error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size='large' color={colors.brand} />
      </View>
    )

  return (
    <FlatList
      data={projects}
      renderItem={({ item }) => <ProjectItem project={item} />}
      keyExtractor={item => item.id.toString()}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refresh}
          colors={[colors.brand]}
        />
      }
      style={styles.container}
      ItemSeparatorComponent={() => <Separator />}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
})
