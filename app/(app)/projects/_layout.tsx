import { Stack } from 'expo-router'

export default function ProjectsLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ title: 'Project List' }} />
      <Stack.Screen
        name='data-analysis/[id]'
        options={{ title: 'Data Analysis' }}
      />
      <Stack.Screen name='premix/[id]' options={{ title: 'Premix' }} />
      <Stack.Screen
        name='record-work/[id]'
        options={{ title: 'Progress/Record Work' }}
      />
    </Stack>
  )
}
