import React, { useMemo } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useAppAuthState } from '../../store/hooks'
import { useStyles, MakeStyles } from '../../services/design'
import { useUser } from '../../services/user'
import { useBlockUser } from '../../services/block'
import { useRefuseFriend } from '../../services/friend'
import { useModal } from '../../services/modal'
import { useReportUser } from '../../services/report'
import { RoundedButton } from '../atoms'
import Modal from 'react-native-modal'
import { Modal as CustomModal } from '../moleculers'
import ReportModal from './ReportModal'

type Props = {
  isVisible: boolean
  title?: string
  desc?: string
  negative?: string
  positive?: string
  onNegative: () => void
  onPositive: () => void
  targetUID: string
}

const KickUserModal: React.FC<Props> = ({ isVisible, negative = 'キャンセル', onNegative, targetUID, children }) => {
  const styles = useStyles(makeStyles)

  const { uid, user } = useAppAuthState()
  const { user: targetUser } = useUser(targetUID)

  const reportModalTools = useModal()
  const blockModalTools = useModal()
  const refuseFriendshipTools = useModal()

  const { onReportUser } = useReportUser()
  const { onBlockUser } = useBlockUser()
  const { onRefuseFriend } = useRefuseFriend()

  const isApplyFriendship = useMemo(() => {
    return targetUser?.applyFriendUIDs.includes(uid)
  }, [targetUser, uid])

  //MEMO: 便宜上KickUserModalとしてModal画面にしている
  return (
    <Modal isVisible={isVisible} animationIn="bounceIn" animationOut="fadeOut">
      <View style={styles.inner}>
        <View style={styles.contentsArea}>
          <TouchableOpacity style={styles.titleTextWrapper} onPress={reportModalTools.onOpen}>
            <Text style={styles.titleText}>{'通報'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.titleTextWrapper} onPress={blockModalTools.onOpen}>
            <Text style={styles.titleText}>{'ブロック'}</Text>
          </TouchableOpacity>
          {isApplyFriendship && (
            <TouchableOpacity style={styles.titleTextWrapper} onPress={refuseFriendshipTools.onOpen}>
              <Text style={styles.titleText}>{'友達申請拒否'}</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.childrenWrapper}>{children}</View>

        <View style={styles.actionArea}>
          <View>
            <RoundedButton width={150} height={45} onPress={onNegative}>
              <Text style={styles.negativeButtonText}>{negative}</Text>
            </RoundedButton>
          </View>
        </View>
      </View>
      {targetUser && (
        <ReportModal
          isVisible={reportModalTools.isVisible}
          title={'確認'}
          desc={`「${targetUser.name}」を本当に通報しますか？`}
          negative="戻る"
          positive="通報する"
          onPositive={(reportDetail: string) => {
            onReportUser(user, reportDetail)
            reportModalTools.onClose()
          }}
          onNegative={reportModalTools.onClose}
        />
      )}
      {targetUser && (
        <CustomModal
          isVisible={blockModalTools.isVisible}
          title={'確認'}
          desc={`「${targetUser.name}」を本当にブロックしますか？`}
          negative="戻る"
          positive="ブロックする"
          onPositive={() => {
            onBlockUser(targetUser)
            blockModalTools.onClose()
          }}
          onNegative={blockModalTools.onClose}
        />
      )}
      {isApplyFriendship && (
        <CustomModal
          isVisible={refuseFriendshipTools.isVisible}
          title={'確認'}
          desc={`「${targetUser.name}」からの友達申請を拒否しますか？`}
          negative="戻る"
          positive="拒否する"
          onPositive={() => {
            onRefuseFriend(targetUser)
            refuseFriendshipTools.onClose()
          }}
          onNegative={refuseFriendshipTools.onClose}
        />
      )}
    </Modal>
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
      alignItems: 'center'
    },
    actionArea: {
      alignItems: 'center'
    },
    childrenWrapper: {
      width: '100%'
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
      color: colors.foregrounds.onTintPrimary
    }
  })

export default KickUserModal
