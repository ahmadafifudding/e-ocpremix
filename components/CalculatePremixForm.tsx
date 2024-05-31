import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Label } from './ui/Label'
import { useRouter } from 'expo-router'
import { TextInput } from './ui/TextInput'
import { useFormStore } from '@/store'
import { Message } from './ui/Message'
import { Button } from './ui/Button'
import { CalculatePremixSchema } from '@/validations'
import { SecondaryButton } from './ui/SecondaryButton'

export function CalculatePremixForm() {
  const router = useRouter()
  const [isDatePickerVisible, setDatePickerVisible] = useState(false)
  const { setFormData, formData } = useFormStore()
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CalculatePremixSchema>({
    defaultValues: {
      date: formData.date,
      length: formData.length,
      width: formData.width,
      depth: formData.depth,
      density: formData.density,
    },
  })

  const showDatePicker = () => {
    setDatePickerVisible(true)
  }

  const handleDateChange = (selectedDate: Date) => {
    setDatePickerVisible(false)
    setValue('date', selectedDate)
  }

  function onSubmit(data: CalculatePremixSchema) {
    setFormData(data)
    router.back()
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Label style={{ marginBottom: 6 }}>Date</Label>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <SecondaryButton label='Select a Date' onPress={showDatePicker} />
              {isDatePickerVisible && (
                <DateTimePicker
                  value={new Date(value)}
                  mode='date'
                  display='default'
                  onChange={(_, selectedDate: Date | undefined) => {
                    selectedDate = selectedDate || value
                    onChange(selectedDate)
                    handleDateChange(selectedDate)
                  }}
                />
              )}
            </>
          )}
          name='date'
        />
        {errors.date && <Message>{errors.date.message}</Message>}
        <Label>Length (m)</Label>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              keyboardType='numeric'
              value={value.toString()}
              placeholder='825'
            />
          )}
          name='length'
        />
        {errors.length && <Message>{errors.length.message}</Message>}
        <Label>Width (m)</Label>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              keyboardType='numeric'
              value={value.toString()}
              placeholder='4.0'
            />
          )}
          name='width'
        />
        {errors.width && <Message>{errors.width.message}</Message>}
        <Label>Depth (m)</Label>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              keyboardType='numeric'
              value={value.toString()}
              placeholder='0.05'
            />
          )}
          name='depth'
        />
        {errors.depth && <Message>{errors.depth.message}</Message>}
        <Label>Density</Label>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              keyboardType='numeric'
              value={value.toString()}
              placeholder='2.33'
            />
          )}
          name='density'
        />
      </View>
      {errors.density && <Message>{errors.density.message}</Message>}
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
