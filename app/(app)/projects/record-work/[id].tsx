import { useState, useEffect } from 'react'
import { Alert, ScrollView, StyleSheet } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { supabase } from '@/lib/supabase'
import { Tables } from '@/types/database.types'
import { Loading } from '@/components/Loading'
import { EmptyPlaceholder } from '@/components/EmptyPlaceholder'
import { RecordWorkDetails } from '@/components/RecordWorkDetails'
import { colors } from '@/constants/colors'

export default function RecordWork() {
  const { id } = useLocalSearchParams()
  const [project, setProject] = useState<Tables<'projects'> | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProject()
  }, [id])

  const fetchProject = async () => {
    try {
      setIsLoading(true)
      const { error, status, data } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id as string)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setProject(data)
      }
    } catch (error) {
      if (error instanceof Error) {
        throw Alert.alert('Error', error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <Loading />
  if (!project) return <EmptyPlaceholder />

  return (
    <ScrollView style={styles.container}>
      <RecordWorkDetails project={project} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
})
