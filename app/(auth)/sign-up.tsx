import { SignUpForm } from '@/components/SignUpForm'
import { colors } from '@/constants/colors'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

export default function SignUpScreen() {
  return (
    <ScrollView style={styles.container}>
      <SignUpForm />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
})
