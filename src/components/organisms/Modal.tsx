import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useStyles, MakeStyles, useColors } from '../../services/design'
import { RoundedButton } from '../atoms'
import Modal from 'react-native-modal'

type Props = {
  isVisible: boolean
  title?: string
  desc?: string
  negative?: string
  positive?: string
  onNegative: () => void
  onPositive: () => void
}

const CustomModal = ({
  isVisible,
  title,
  desc,
  positive = 'OK',
  negative = 'キャンセル',
  onPositive,
  onNegative
}: Props) => {
  const styles = useStyles(makeStyles)
  const colors = useColors()

  return (
    <View>
      <Modal isVisible={isVisible} animationIn="bounceIn" animationOut="fadeOut">
        <View style={styles.inner}>
          <View style={styles.contentsArea}>
            {title && (
              <View style={styles.titleTextWrapper}>
                <Text style={styles.titleText}>{title}</Text>
              </View>
            )}

            {desc && (
              <View style={styles.descTextWrapper}>
                <Text style={styles.descText}>{desc}</Text>
              </View>
            )}
          </View>

          <View style={styles.actionArea}>
            <View>
              <RoundedButton width={150} height={45} outlined={true} color={colors.system.gray} onPress={onNegative}>
                <Text style={styles.negativeButtonText}>{negative}</Text>
              </RoundedButton>
            </View>
            <View>
              <RoundedButton width={150} height={45} onPress={onPositive}>
                <Text style={styles.positiveButtonText}>{positive}</Text>
              </RoundedButton>
            </View>
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
      borderRadius: 10,
      minHeight: 260,
      padding: 20
    },
    contentsArea: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    actionArea: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    titleTextWrapper: {
      paddingBottom: 16
    },
    titleText: {
      fontWeight: 'bold',
      fontSize: 20,
      color: colors.foregrounds.primary,
      textAlign: 'center'
    },
    descText: {
      fontSize: 15,
      color: colors.foregrounds.secondary,
      textAlign: 'center'
    },
    positiveButtonText: {
      fontSize: 15,
      color: colors.foregrounds.onTintPrimary
    },
    negativeButtonText: {
      fontSize: 15,
      color: colors.system.gray
    }
  })

export default CustomModal
