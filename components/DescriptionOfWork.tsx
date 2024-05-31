import { View, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useFormStore } from '@/store'
import { Button } from './ui/Button'
import { Controller, useForm } from 'react-hook-form'
import { Label } from './ui/Label'
import { TextInput } from './ui/TextInput'
import { Message } from './ui/Message'
import { DescriptionOfWorkSchema, descriptionOfWorkSchema } from '@/validations'
import { zodResolver } from '@hookform/resolvers/zod'

export function DescriptionOfWorkForm() {
  const router = useRouter()
  const { setFormData, formData } = useFormStore()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DescriptionOfWorkSchema>({
    defaultValues: {
      description: formData.description,
    },
    resolver: zodResolver(descriptionOfWorkSchema),
  })

  function onSubmit(data: DescriptionOfWorkSchema) {
    setFormData(data)
    router.back()
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Label>Description</Label>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder='Description'
              numberOfLines={4}
              multiline
            />
          )}
          name='description'
        />
        {errors.description && <Message>{errors.description.message}</Message>}
      </View>
      <View style={styles.footerContainer}>
        <Button label='Save' onPress={handleSubmit(onSubmit)} />
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
