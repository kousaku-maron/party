import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import { useStyles, MakeStyles } from '../../services/design'

type Props = {
  isVisible: boolean
  title: string
  desc?: string
  negative?: string
  positive?: string
  onNegative: () => void
  onPositive: () => void
}

const MaterialDesignModal: React.FC<Props> = props => {
  const styles = useStyles(makeStyles)

  return (
    <View>
      <Modal isVisible={props.isVisible} animationIn="bounceIn" animationOut="fadeOut">
        <View style={styles.inner}>
          <View style={styles.contentsArea}>
            {/* Title and Description */}
            {props.title && props.desc && (
              <View style={styles.contentsWrapper}>
                <View style={styles.titleWrapper}>
                  <Text style={styles.titleText}>{props.title}</Text>
                </View>

                <Text style={styles.descText}>{props.desc}</Text>
              </View>
            )}

            {props.title && !props.desc && (
              <View style={styles.contentsWrapper}>
                <Text style={styles.titleText}>{props.title}</Text>
              </View>
            )}

            {/* Children */}
            {props.children}
          </View>

          <View style={styles.actionArea}>
            <TouchableOpacity style={[styles.button, styles.buttonLeft]} onPress={props.onNegative}>
              <Text style={styles.buttonText}>{props.negative ? props.negative : 'キャンセル'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={props.onPositive}>
              <Text style={styles.buttonText}>{props.positive ? props.positive : 'OK'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    inner: {
      display: 'flex',
      backgroundColor: colors.backgrounds.tertiary,
      borderRadius: 3,
      padding: 16
    },
    contentsArea: {
      display: 'flex'
    },
    actionArea: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: '100%'
    },
    contentsWrapper: {
      paddingBottom: 32
    },
    titleWrapper: {
      paddingBottom: 16
    },
    button: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonLeft: {
      paddingRight: 16
    },
    titleText: {
      fontWeight: 'bold',
      fontSize: 18,
      color: colors.foregrounds.primary
    },
    descText: {
      fontSize: 16,
      color: colors.foregrounds.secondary
    },
    buttonText: {
      fontWeight: 'bold',
      fontSize: 18,
      color: colors.tints.primary.main
    }
  })

export default MaterialDesignModal
