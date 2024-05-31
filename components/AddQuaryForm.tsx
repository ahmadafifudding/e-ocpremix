import { supabase } from '@/lib/supabase'
import { Tables } from '@/types/database.types'
import { AddQuarrySchema, addQuarrySchema } from '@/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Alert, StyleSheet, View } from 'react-native'
import { Button } from './ui/Button'
import { Label } from './ui/Label'
import { Message } from './ui/Message'
import { TextInput } from './ui/TextInput'

export function AddQuarryForm({
  onFinish,
  setData,
}: {
  onFinish: () => void
  setData: React.Dispatch<React.SetStateAction<Tables<'quarries'>[]>>
}) {
  const {
    control,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<AddQuarrySchema>({
    defaultValues: {
      quarry: '',
    },
    resolver: zodResolver(addQuarrySchema),
  })

  async function onSubmit(data: AddQuarrySchema) {
    const { error } = await supabase.from('quarries').insert({
      name: data.quarry,
    })
    if (error) {
      Alert.alert('Error', error.message)
    }
    if (!error) {
      onFinish()
      const { data } = await supabase.from('quarries').select('*')
      if (data) {
        setData(data)
      }
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Label>Quarry</Label>
        <Controller
          name='quarry'
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder='Enter quarry name'
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.quarry && <Message>{errors.quarry.message}</Message>}
      </View>
      <View style={styles.footerContainer}>
        <Button
          label='Add quarry'
          isLoading={isLoading}
          onPress={handleSubmit(onSubmit)}
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
