import { colors } from '@/constants/colors'
import { supabase } from '@/lib/supabase'
import { useFormStore } from '@/store'
import { Tables } from '@/types/database.types'
import { Step2Schema, step2Schema } from '@/validations'
import { Ionicons } from '@expo/vector-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { Picker } from '@react-native-picker/picker'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { AddQuarryModal } from './AddQuarryModal'
import { AddQuarryForm } from './AddQuaryForm'
import { Button } from './ui/Button'
import { Label } from './ui/Label'
import { Message } from './ui/Message'
import { RadioButton } from './RadioButton'

export function Step2Form() {
  const router = useRouter()
  const { setFormData, formData } = useFormStore()
  const [quarries, setQuarries] = useState<Tables<'quarries'>[]>([])
  const [isModalVissible, setIsModalVisible] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Step2Schema>({
    defaultValues: {
      lane: formData.lane,
      quarry: formData.quarry,
    },
    resolver: zodResolver(step2Schema),
  })

  useEffect(() => {
    fetchQuarries()
  }, [])

  async function fetchQuarries() {
    const { data } = await supabase.from('quarries').select('*')
    if (data) {
      setQuarries(data)
    }
  }

  async function onFinish() {
    setIsModalVisible(false)
  }

  function onSubmit(formData: Step2Schema) {
    setFormData(formData)
    router.push('/new/step3')
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Label>Choose a lane</Label>
        <Controller
          name='lane'
          control={control}
          render={({ field: { onChange, value } }) => (
            <View style={styles.radioGroup}>
              <RadioButton
                label='Fast Lane'
                iconName='rocket-outline'
                value='fast-lane'
                isSelected={value === 'fast-lane'}
                onPress={onChange}
              />
              <RadioButton
                label='Slow Lane'
                iconName='footsteps-outline'
                value='slow-lane'
                isSelected={value === 'slow-lane'}
                onPress={onChange}
              />
            </View>
          )}
        />
        {errors.lane && <Message>{errors.lane.message}</Message>}
        <Label>Choose a quarry</Label>
        <Controller
          name='quarry'
          control={control}
          render={({ field: { onChange, value } }) => (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={value}
                onValueChange={value => onChange(value)}
                style={{ flex: 1 }}
              >
                {quarries.map(quarry => (
                  <Picker.Item
                    key={quarry.id}
                    label={quarry.name}
                    value={quarry.name}
                  />
                ))}
              </Picker>
              <Ionicons
                name='add-circle'
                size={24}
                color={colors.brand}
                style={{ marginRight: 16 }}
                onPress={() => setIsModalVisible(true)}
              />
            </View>
          )}
        />
        {errors.quarry && <Message>{errors.quarry.message}</Message>}
        <AddQuarryModal
          isVisible={isModalVissible}
          onClose={() => setIsModalVisible(false)}
        >
          <AddQuarryForm onFinish={onFinish} setData={setQuarries} />
        </AddQuarryModal>
      </View>
      <View style={styles.footerContainer}>
        <Button label='Continue' onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  radioGroup: {
    rowGap: 12,
    marginTop: 8,
  },
  innerContainer: {
    flex: 1,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerContainer: {
    paddingVertical: 16,
  },
  button: {
    marginTop: 16,
  },
})
