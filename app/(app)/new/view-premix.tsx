import { PremixDetails } from '@/components/PremixDetails'
import { colors } from '@/constants/colors'
import { calculateArea, calculateTonnage } from '@/lib'
import { useFormStore } from '@/store'
import { StyleSheet, View } from 'react-native'

export default function ViewPremixScreen() {
  const { formData } = useFormStore()
  const {
    date,
    district,
    route,
    section,
    lane,
    length,
    width,
    depth,
    density,
  } = formData
  const area = calculateArea(length, width)
  const tonnage = calculateTonnage(area, depth, density)

  return (
    <View style={styles.container}>
      <PremixDetails
        date={date.toDateString()}
        district={district}
        route={route}
        section={section}
        lane={lane}
        tonnage={tonnage}
      />
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
})
