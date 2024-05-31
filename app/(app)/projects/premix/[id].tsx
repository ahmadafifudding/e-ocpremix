import { useEffect, useState } from 'react'
import { Alert, StyleSheet, ScrollView } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { EmptyPlaceholder } from '@/components/EmptyPlaceholder'
import { Loading } from '@/components/Loading'
import { PremixDetails } from '@/components/PremixDetails'
import { colors } from '@/constants/colors'
import { supabase } from '@/lib/supabase'
import { Tables } from '@/types/database.types'

export default function Premix() {
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
      <PremixDetails project={project} />
    </ScrollView>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
})
