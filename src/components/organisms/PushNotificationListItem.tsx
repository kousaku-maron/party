import React from 'react'
import { Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { useStyles, MakeStyles } from '../../services/design'

type Props = {
  isExist: boolean
  onAccept: () => void
  onReject: () => void
}

const PushNotificationListItem = ({ isExist, onAccept, onReject }: Props) => {
  const styles = useStyles(makeStyles)

  if (isExist) {
    return (
      <TouchableOpacity style={styles.listItem} onPress={onReject}>
        <Text style={styles.primaryText}>プッシュ通知を拒否</Text>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity style={styles.listItem} onPress={onAccept}>
      <Text style={styles.primaryText}>プッシュ通知を許可</Text>
    </TouchableOpacity>
  )
}

const hairlineWidth = StyleSheet.hairlineWidth
const width = Dimensions.get('window').width

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    listItem: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width,
      height: 50,
      borderBottomColor: colors.foregrounds.separator,
      borderBottomWidth: hairlineWidth
    },
    primaryText: {
      color: colors.foregrounds.primary
    }
  })

export default PushNotificationListItem
