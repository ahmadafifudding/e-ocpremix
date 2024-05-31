import { View, StyleSheet, Alert } from 'react-native'
import { useRouter } from 'expo-router'
import { SecondaryButton } from './ui/SecondaryButton'
import { Button } from './ui/Button'
import { supabase } from '@/lib/supabase'
import { useFormStore } from '@/store'
import { useAuth } from '@/providers/AuthProvider'
import { useState } from 'react'
import { calculateArea, calculateTonnage } from '@/lib'

export function DataAnalysis() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { formData } = useFormStore()
  const { session } = useAuth()

  const save = async () => {
    setIsLoading(true)
    const area = calculateArea(formData.length, formData.width)
    const tonnage = calculateTonnage(area, formData.depth, formData.density)

    const { error } = await supabase.from('projects').insert([
      {
        area,
        branch: formData.branch,
        date: formData.date.toISOString(),
        density: formData.density,
        depth: formData.depth,
        description: formData.description,
        district: formData.district,
        lane: formData.lane,
        length: formData.length,
        quarry: formData.quarry,
        route: formData.route,
        section: formData.section,
        tonnage,
        type_of_treatment: formData.typeOfTreatment,
        width: formData.width,
        user_id: session?.user.id,
      },
    ])
    setIsLoading(false)

    if (error) {
      Alert.alert('Error', error.message)
    } else {
      router.replace('/')
    }
  }

  return (
    <View style={styles.container}>
      <SecondaryButton
        label='View Premix'
        onPress={() => router.push('/view-premix')}
      />
      <SecondaryButton
        label='View Progress/Record Work'
        onPress={() => router.push('/record-work')}
      />
      <Button label='Save' onPress={save} isLoading={isLoading} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    rowGap: 20,
  },
})
