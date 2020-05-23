import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { useStyles, MakeStyles, useColors } from '../../services/design'
import { TextField } from '../moleculers'
import { RoundedButton } from '../atoms'
import Modal from 'react-native-modal'

type Props = {
  isVisible: boolean
  title?: string
  desc?: string
  negative?: string
  positive?: string
  onNegative: () => void
  onPositive: (reportDetail: string) => void
}

const ReportModal: React.FC<Props> = ({
  isVisible,
  title,
  desc,
  positive = 'OK',
  negative = 'キャンセル',
  onPositive,
  onNegative,
  children
}) => {
  const styles = useStyles(makeStyles)
  const colors = useColors()

  const [reportDetail, setReportDetail] = useState<string | undefined>(undefined)

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

          <View style={styles.childrenWrapper}>{children}</View>
          <View style={styles.reportDetailWrapper}>
            <TextField
              label="追放理由"
              height={100}
              multiline={true}
              numberOfLines={4}
              value={reportDetail}
              onChangeText={setReportDetail}
              fullWidth={true}
            />
          </View>

          <View style={styles.actionArea}>
            <View>
              <RoundedButton width={150} height={45} outlined={true} color={colors.system.gray} onPress={onNegative}>
                <Text style={styles.negativeButtonText}>{negative}</Text>
              </RoundedButton>
            </View>
            <View>
              <RoundedButton
                width={150}
                height={45}
                onPress={() => {
                  onPositive(reportDetail)
                }}
              >
                <Text style={styles.positiveButtonText}>{positive}</Text>
              </RoundedButton>
            </View>
          </View>
        </View>
        <KeyboardSpacer />
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
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 12
    },
    actionArea: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    childrenWrapper: {
      width: '100%'
    },
    reportDetailWrapper: {
      paddingBottom: 24,
      paddingHorizontal: 12
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

export default ReportModal
