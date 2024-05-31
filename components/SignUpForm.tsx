import { supabase } from '@/lib/supabase'
import { SignUpSchema } from '@/validations'
import { router } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { Alert, View } from 'react-native'
import { Button } from './ui/Button'
import { Label } from './ui/Label'
import { Message } from './ui/Message'
import { TextInput } from './ui/TextInput'

export function SignUpForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<SignUpSchema>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      position: '',
    },
  })
  async function onSubmit(data: SignUpSchema) {
    const { name, email, password, position } = data
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          position,
        },
      },
    })

    if (error) {
      Alert.alert('Error signing up', error.message)
      return
    }
    if (!session) {
      Alert.alert('Please check your email for the confirmation link')
      return
    }
    router.replace('/')
  }

  return (
    <View>
      <Controller
        name='name'
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Label>Name</Label>
            <TextInput
              placeholder='Athirah Umairah'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </>
        )}
      />
      {errors.name && <Message>{errors.name.message}</Message>}
      <Controller
        name='email'
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Label>Email address</Label>
            <TextInput
              placeholder='athirah@example.com'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </>
        )}
      />
      {errors.email && <Message>{errors.email.message}</Message>}
      <Controller
        name='password'
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Label>Password</Label>
            <TextInput
              placeholder='Enter a strong password'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
          </>
        )}
      />
      {errors.password && <Message>{errors.password.message}</Message>}
      <Controller
        name='position'
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Label>Position</Label>
            <TextInput
              placeholder='State Manager'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </>
        )}
      />
      {errors.position && <Message>{errors.position.message}</Message>}
      <Button
        label='Sign Up'
        disabled={isLoading}
        isLoading={isLoading}
        onPress={handleSubmit(onSubmit)}
        style={{ marginTop: 32 }}
      />
    </View>
  )
}
