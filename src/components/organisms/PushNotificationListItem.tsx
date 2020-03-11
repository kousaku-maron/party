import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
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
        <Text style={styles.secondaryText}>プッシュ通知を拒否</Text>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity style={styles.listItem} onPress={onAccept}>
      <Text style={styles.secondaryText}>プッシュ通知を許可</Text>
    </TouchableOpacity>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    listItem: {
      paddingVertical: 10,
      display: 'flex',
      width: '100%'
    },
    secondaryText: {
      color: colors.foregrounds.secondary
    }
  })

export default PushNotificationListItem
