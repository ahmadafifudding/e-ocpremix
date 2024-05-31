import { View, Image, StyleSheet } from 'react-native'

export function AuthHeader() {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('@/assets/images/e-ocpremix.jpeg')}
        style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 32,
  },
  image: {
    height: 54,
    resizeMode: 'contain',
  },
})
