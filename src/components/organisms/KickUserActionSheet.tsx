import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useStyles, MakeStyles } from '../../services/design'

type Props = {
  actionItems: { key: string; isShow: boolean; onPress: () => void; actionTitle: string }[]
  onAnimationEnd?: () => void
}

const KickUserActionSheet: React.FC<Props> = ({ actionItems }) => {
  const styles = useStyles(makeStyles)

  return (
    <View style={styles.kickUserActionContainer}>
      <View style={styles.kickUserActionContentsArea}>
        {actionItems.map(
          actionItem =>
            actionItem.isShow && (
              <TouchableOpacity
                key={actionItem.key}
                style={styles.kickUserActionTextWrapper}
                onPress={actionItem.onPress}
              >
                <Text style={styles.kickUserActionText}>{actionItem.actionTitle}</Text>
              </TouchableOpacity>
            )
        )}
      </View>
    </View>
  )
}
const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    kickUserActionContainer: {
      display: 'flex',
      alignItems: 'center'
    },
    kickUserActionContentsArea: {
      width: '100%'
    },
    kickUserActionTextWrapper: {
      paddingHorizontal: 48,
      paddingVertical: 12,
      display: 'flex',
      width: '100%'
    },
    kickUserActionText: {
      fontSize: 20,
      color: colors.foregrounds.primary
    }
  })

export default KickUserActionSheet
