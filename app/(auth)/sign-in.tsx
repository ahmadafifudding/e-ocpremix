import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from 'react-native'
import { AuthFooter } from '@/components/AuthFooter'
import { SignInForm } from '@/components/SignInForm'
import { Link } from '@/components/ui/Link'
import { colors } from '@/constants/colors'
import React from 'react'

export default function SignInScreen() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <SignInForm />
          <AuthFooter>
            <Text style={styles.text}>Don't have an account?</Text>
            <Link href='/(auth)/sign-up'>Sign up</Link>
          </AuthFooter>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-around',
    paddingVertical: 24,
  },
  text: {
    fontSize: 15,
    lineHeight: 20,
    color: '#616161',
    marginTop: 4,
  },
})
