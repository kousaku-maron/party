import React from 'react'
import { View, ActivityIndicator, Platform, Dimensions, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'

type Props = {
  isVisible: boolean
}

const LoadingModal: React.FC<Props> = props => {
  return (
    <View>
      <Modal style={styles.container} isVisible={props.isVisible} animationIn="bounceIn" animationOut="fadeOut">
        <View style={styles.inner}>
          <ActivityIndicator style={styles.indicator} size="large" color="gray" />
        </View>
      </Modal>
    </View>
  )
}

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inner: {
    display: 'flex',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: Platform.OS === 'ios' ? 16 : 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.6,
    height: width * 0.6
  },
  indicator: {
    transform: [{ scale: 1.5 }]
  }
})

export default LoadingModal
