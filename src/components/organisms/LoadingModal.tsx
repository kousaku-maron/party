import React from 'react'
import { View, Platform, Dimensions, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import { useStyles, MakeStyles } from '../../services/design'
import { useUIState } from '../../store/hooks'
import { Indicator } from '../../@assets/lottie'

const LoadingModal: React.FC = () => {
  const styles = useStyles(makeStyles)
  const { showLoadingModal, theme } = useUIState()

  return (
    <View>
      <Modal style={styles.container} isVisible={showLoadingModal} animationIn="bounceIn" animationOut="fadeOut">
        <View style={styles.inner}>
          <Indicator theme={theme} size={150} />
        </View>
      </Modal>
    </View>
  )
}

const width = Dimensions.get('window').width

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    inner: {
      display: 'flex',
      backgroundColor: colors.backgrounds.tertiary,
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
