import React from 'react'
import { View, ActivityIndicator, Platform, Dimensions, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import { useStyles, useColors, MakeStyles } from '../../services/design'

type Props = {
  isVisible: boolean
}

const LoadingModal: React.FC<Props> = props => {
  const styles = useStyles(makeStyles)
  const colors = useColors()

  return (
    <View>
      <Modal style={styles.container} isVisible={props.isVisible} animationIn="bounceIn" animationOut="fadeOut">
        <View style={styles.inner}>
          <ActivityIndicator style={styles.indicator} size="large" color={colors.system.gray} />
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
