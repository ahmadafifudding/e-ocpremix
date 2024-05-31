import { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { useRouter } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { useFormStore } from '@/store'
import { supabase } from '@/lib/supabase'
import { Button } from './ui/Button'
import { Step3Schema, step3Schema } from '@/validations'
import { Label } from './ui/Label'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextInput } from './ui/TextInput'
import { SecondaryButton } from './ui/SecondaryButton'
import { Message } from './ui/Message'
import { calculateArea, calculateTonnage } from '@/lib'
import { useAuth } from '@/providers/AuthProvider'

export function Step3Form() {
  const { session } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const { formData, setFormData } = useFormStore()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Step3Schema>({
    defaultValues: {
      route: formData.route,
      section: formData.section,
      typeOfTreatment: formData.typeOfTreatment,
    },
    resolver: zodResolver(step3Schema),
  })

  async function onSubmit(data: Step3Schema) {
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
        route: data.route,
        section: data.section,
        tonnage,
        type_of_treatment: data.typeOfTreatment,
        width: formData.width,
        user_id: session?.user.id,
      },
    ])
    setFormData(data)
    setIsLoading(false)

    if (error) {
      Alert.alert('Error', error.message)
    } else {
      setFormData({
        branch: '',
        date: new Date(),
        description: '',
        district: '',
        lane: '',
        length: 0,
        width: 0,
        depth: 0,
        density: 0,
        quarry: '',
        route: '',
        section: '',
        typeOfTreatment: '',
      })
      router.replace('/')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Label>Route</Label>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder='FT0001'
            />
          )}
          name='route'
        />
        {errors.route && <Message>{errors.route.message}</Message>}
        <Label>Section</Label>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder='885.75-886.95'
            />
          )}
          name='section'
        />
        {errors.section && <Message>{errors.section.message}</Message>}
        <Label>Type of Treatment</Label>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder='Enter type of treatment'
            />
          )}
          name='typeOfTreatment'
        />
        {errors.typeOfTreatment && (
          <Message>{errors.typeOfTreatment.message}</Message>
        )}
        <SecondaryButton
          label='Calculate Premix'
          style={{ marginTop: 12 }}
          onPress={() => router.push('/new/calculate-premix')}
        />
        <SecondaryButton
          label='Progress/Record Work'
          style={{ marginTop: 12 }}
          onPress={() => router.push('/new/description-of-work')}
        />
      </View>
      <View style={styles.footerContainer}>
        <Button
          label='Save'
          onPress={handleSubmit(onSubmit)}
          disabled={
            !formData.description ||
            !formData.length ||
            !formData.width ||
            !formData.depth ||
            !formData.density ||
            !formData.date
          }
          isLoading={isLoading}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  footerContainer: {
    paddingVertical: 16,
  },
})
