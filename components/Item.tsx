import { View, StyleSheet, Text } from 'react-native'

interface ItemProps {
  label: string
  data: string | number
}

export function Item({ label, data }: ItemProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: '#242424' }]}>{label}</Text>
      <Text style={[styles.text, { color: '#616161' }]}>{data}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 13,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 17,
    lineHeight: 22,
  },
})
