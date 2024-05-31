import { Text, View, StyleSheet, Pressable } from 'react-native'
import { router } from 'expo-router'
import dayjs from 'dayjs'
import { Tables } from '@/types/database.types'

interface ProjectItemProps {
  project: Tables<'projects'>
}

export function ProjectItem({ project }: ProjectItemProps) {
  const onPress = () => {
    router.push(`/projects/data-analysis/${project.id}`)
  }

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>
          {project.district} - {project.route}
        </Text>
        <Text style={styles.caption}>
          {dayjs(project.date).format('DD MMM YYYY')}
        </Text>
      </View>
      <Text style={styles.caption}>{project.section}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 17,
    lineHeight: 22,
  },
  date: {
    fontSize: 13,
    lineHeight: 18,
    color: '#616161',
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
    color: '#616161',
  },
})
