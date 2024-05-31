import { Stack } from 'expo-router'

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ statusBarStyle: 'dark' }}>
      <Stack.Screen name='sign-in' options={{ headerShown: false }} />
      <Stack.Screen
        name='sign-up'
        options={{ title: 'Register', headerTitleAlign: 'center' }}
      />
    </Stack>
  )
}
