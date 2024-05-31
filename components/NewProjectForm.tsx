import { useRouter } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { branches, districts } from '@/data'
import { Controller, useForm } from 'react-hook-form'
import { Picker } from '@react-native-picker/picker'
import { zodResolver } from '@hookform/resolvers/zod'
import { LocationSchema, locationSchema } from '@/validations'
import { useFormStore } from '@/store'
import { Button } from './ui/Button'
import { Label } from './ui/Label'
import { Message } from './ui/Message'

export function NewProjectForm() {
  const router = useRouter()
  const { setFormData, formData } = useFormStore()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LocationSchema>({
    defaultValues: {
      branch: formData.branch,
      district: formData.district,
    },
    resolver: zodResolver(locationSchema),
  })

  function onSubmit(formData: LocationSchema) {
    setFormData(formData)
    router.push('/new/step2')
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Label>Branch</Label>
        <Controller
          name='branch'
          control={control}
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={value => onChange(value)}
            >
              {branches.map(branch => (
                <Picker.Item key={branch} label={branch} value={branch} />
              ))}
            </Picker>
          )}
        />
        {errors.branch && <Message>{errors.branch.message}</Message>}
        <Label>District</Label>
        <Controller
          name='district'
          control={control}
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={value => onChange(value)}
            >
              {districts.map(district => (
                <Picker.Item key={district} label={district} value={district} />
              ))}
            </Picker>
          )}
        />
        {errors.district && <Message>{errors.district.message}</Message>}
      </View>
      <View style={styles.footerContainer}>
        <Button onPress={handleSubmit(onSubmit)} label='Continue' />
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
