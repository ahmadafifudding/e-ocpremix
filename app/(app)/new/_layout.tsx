import { Stack } from 'expo-router'

export default function ProjectLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ title: 'Project' }} />
      <Stack.Screen name='step2' options={{ title: 'Premix' }} />
      <Stack.Screen name='step3' options={{ title: 'Premix' }} />
      <Stack.Screen
        name='calculate-premix'
        options={{ title: 'Calculate Premix' }}
      />
      <Stack.Screen
        name='description-of-work'
        options={{ title: 'Description of Work' }}
      />
      <Stack.Screen name='data-analysis' options={{ title: 'Data Analysis' }} />
      <Stack.Screen name='view-premix' options={{ title: 'View Premix' }} />
      <Stack.Screen name='record-work' options={{ title: 'Record Work' }} />
    </Stack>
  )
}
