import React, { useMemo, useCallback } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { User } from '../../entities'
import { useStyles, MakeStyles, useColors } from '../../services/design'
import { useUserRelationship } from '../../services/user'
import { useApplyFriend, useAcceptFriend } from '../../services/friend'
import { ShadowBase, Thumbnail, Fab } from '../atoms'
import { Icons } from '../../@assets/vector-icons'

type Props = {
  user: User
  height?: number
  width?: number
  fullWidth?: boolean
  disabled?: boolean
  onPress?: (user: User) => void
}

const UserCard = ({ user, width = 300, height = 80, fullWidth = false, disabled = false, onPress }: Props) => {
  const styles = useStyles(makeStyles)
  const colors = useColors()

  const { isBlocked, isFriend, isApply, isApplied } = useUserRelationship(user.uid)
  const { onAcceptFriend } = useAcceptFriend()
  const { onApplyFriend } = useApplyFriend()

  const isShowUserPlusIcon = useMemo(() => {
    return !isBlocked && !isFriend && !isApply
  }, [isApply, isBlocked, isFriend])

  const onPressUserPlus = useCallback(() => {
    if (isApplied) {
      onAcceptFriend(user)
      return
    }

    onApplyFriend(user)
  }, [isApplied, onAcceptFriend, onApplyFriend, user])

  return (
    <TouchableOpacity
      style={[styles.card, { width: fullWidth ? '100%' : width, height }]}
      disabled={disabled}
      onPress={() => onPress(user)}
    >
      <View style={styles.cardHead}>
        <View style={styles.thumbnailWrapper}>
          <Thumbnail size={55} uri={user.thumbnailURL} />
        </View>
        <View>
          <Text style={styles.nameText}>{user.name}</Text>
          <Text style={styles.idText}>@{user.userID}</Text>
        </View>
      </View>
      <View style={styles.cardTail}>
        {isShowUserPlusIcon && (
          <ShadowBase>
            <Fab color={colors.backgrounds.tertiary} onPress={onPressUserPlus}>
              <Icons name="user-plus" color={colors.foregrounds.primary} size={24} />
            </Fab>
          </ShadowBase>
        )}
      </View>
    </TouchableOpacity>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.backgrounds.primary
    },
    searchBoxContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 12,
      paddingVertical: 6
    },
    scrollView: {
      width: '100%',
      paddingHorizontal: 12
    },
    searchBox: {
      flex: 1
    },
    cardWrapper: {
      width: '100%',
      paddingBottom: 20
    },
    headerContainer: {
      width: '100%',
      paddingHorizontal: 24
    },
    headerTopSpacer: {
      paddingBottom: 36
    },
    headerBottomSpacer: {
      paddingBottom: 20
    },
    searchBoxBottomSpacer: {
      paddingBottom: 20
    },
    card: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%',
      // height: 75,
      padding: 12,
      backgroundColor: colors.backgrounds.secondary,
      borderRadius: 10
    },
    cardHead: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    cardTail: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    thumbnailWrapper: {
      paddingRight: 12
    },
    nameText: {
      fontSize: 16,
      color: colors.foregrounds.primary
    },
    idText: {
      fontSize: 12,
      color: colors.foregrounds.secondary
    }
  })

export default UserCard
