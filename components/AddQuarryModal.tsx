import { colors } from '@/constants/colors'
import { Modal, StyleSheet, Text, View } from 'react-native'
import { SecondaryButton } from './ui/SecondaryButton'

interface ModalProps {
  children: React.ReactNode
  isVisible: boolean
  onClose: () => void
}
export function AddQuarryModal({ children, isVisible, onClose }: ModalProps) {
  return (
    <Modal animationType='fade' transparent visible={isVisible}>
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Modal</Text>
          </View>
          {children}
          <SecondaryButton label='Close' onPress={onClose} />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    height: '50%',
    width: '100%',
    backgroundColor: colors.background,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    position: 'absolute',
    bottom: 0,
    elevation: 4,
    paddingBottom: 32,
  },
  headerContainer: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#242424',
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
  },
})
