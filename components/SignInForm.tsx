import { colors } from '@/constants/colors'
import { supabase } from '@/lib/supabase'
import { SignInSchema, signInSchema } from '@/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { AuthHeader } from './AuthHeader'
import { Button } from './ui/Button'
import { Label } from './ui/Label'
import { Message } from './ui/Message'
import { TextInput } from './ui/TextInput'

export function SignInForm() {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signInSchema),
  })

  async function onSubmit(data: SignInSchema) {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      Alert.alert('Error signing in', error.message)
      return
    }
    router.push('/')
  }

  return (
    <View>
      <AuthHeader />
      <Text style={styles.signInText}>Login</Text>
      <Controller
        name='email'
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Label>Username</Label>
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
      {errors.email && <Message>{errors.email.message}</Message>}
      <Button
        onPress={handleSubmit(onSubmit)}
        style={{ marginTop: 32 }}
        label='Sign In'
        isLoading={isLoading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  signInText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.brand,
    marginVertical: 16,
    marginHorizontal: 16,
    textAlign: 'center',
  },
})
