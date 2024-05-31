import { Redirect, Stack } from 'expo-router'

import { Loading } from '@/components/Loading'
import { LogoutButton } from '@/components/LogoutButton'
import { useAuth } from '@/providers/AuthProvider'
import { ProjectProvider } from '@/providers/ProjectProvider'

export default function AppLayout() {
  const { session, isLoading } = useAuth()

  if (isLoading) return <Loading />

  if (!session) {
    return <Redirect href='/(auth)/sign-in' />
  }

  return (
    <ProjectProvider>
      <Stack screenOptions={{ statusBarStyle: 'dark' }}>
        <Stack.Screen
          name='index'
          options={{ title: 'Home', headerRight: () => <LogoutButton /> }}
        />
        <Stack.Screen name='projects' options={{ headerShown: false }} />
        <Stack.Screen name='new' options={{ headerShown: false }} />
      </Stack>
    </ProjectProvider>
  )
}
