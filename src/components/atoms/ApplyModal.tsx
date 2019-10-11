import React, { useState, useCallback } from 'react'
import { Button, Text, View, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import { NavigationStackProp } from 'react-navigation-stack'

type Props = {
  title?: string
  navigation: NavigationStackProp
}

const APplyModal: React.FC<Props> = ({ title, navigation }) => {
  const [isModal, setIsModal] = useState<boolean>(false)
  const openModal = useCallback(() => {
    setIsModal(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModal(false)
  }, [])
  return (
    <View style={{ flex: 1 }}>
      <Button title={String(title)} color="#FF9999" onPress={openModal} />

      <Modal isVisible={isModal}>
        <View style={styles.inner}>
          <Text>本当に申請しても大丈夫ですか？</Text>
          <View style={styles.buttonContainer}>
            <Button
              title={'はい'}
              color="#FFFFFF"
              onPress={() => {
                closeModal()
                navigation.navigate('PartyApplied', {})
              }}
            />
          </View>
          <Button title={'戻る'} onPress={closeModal} />
        </View>
      </Modal>
    </View>
  )
}

export default APplyModal

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  inner: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white'
  },
  buttonContainer: {
    height: 30,
    width: 80,
    backgroundColor: '#FF9999',
    margin: 3,
    borderRadius: 10
  }
})
