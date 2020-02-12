import { showMessage } from 'react-native-flash-message'

export const showUserEditSuccessMessage = () => {
  showMessage({
    message: 'ユーザー情報を更新しました',
    type: 'success',
    titleStyle: styles.flashCardMessage
  })
}

export const showUserEditFailurMessage = () => {
  showMessage({
    message: 'ユーザー情報の更新に失敗しました',
    type: 'danger',
    titleStyle: styles.flashCardMessage
  })
}

export const showEntryPartyApplySunccessMessage = () => {
  showMessage({
    message: 'パーティーに参加申請しました',
    type: 'success',
    titleStyle: styles.flashCardMessage
  })
}

export const showEntryPartyApplyFailurMessage = () => {
  showMessage({
    message: 'パーティーの参加申請に失敗しました',
    type: 'danger',
    titleStyle: styles.flashCardMessage
  })
}

export const showEntryPartyAlreadyAppliedMessage = () => {
  showMessage({
    message: '既にパーティーの参加を申請しています',
    type: 'danger',
    titleStyle: styles.flashCardMessage
  })
}

export const showEntryPartyAcceptedSuccessMessage = () => {
  showMessage({
    message: 'パーティー参加を承諾しました',
    type: 'success',
    titleStyle: styles.flashCardMessage
  })
}

export const showEntryPartyAcceptedFailurMessage = () => {
  showMessage({
    message: 'パーティー参加の承諾に失敗しました',
    type: 'danger',
    titleStyle: styles.flashCardMessage
  })
}

export const showEntryPartyRejectSuccessMessage = () => {
  showMessage({
    message: 'パーティー参加を拒否しました',
    type: 'success',
    titleStyle: styles.flashCardMessage
  })
}

export const showEntryPartyRejectFailurMessage = () => {
  showMessage({
    message: 'パーティー参加の拒否に失敗しました',
    type: 'danger',
    titleStyle: styles.flashCardMessage
  })
}

export const showQuickRepliedSuccessMessage = () => {
  showMessage({
    message: '回答を送信しました。',
    type: 'success',
    titleStyle: styles.flashCardMessage
  })
}

export const showCreatePartyGroupSunccessMessage = () => {
  showMessage({
    message: 'パーティーを作成しました',
    type: 'success',
    titleStyle: styles.flashCardMessage
  })
}

export const showCreatePartyGroupFailurMessage = () => {
  showMessage({
    message: 'パーティーの作成に失敗しました',
    type: 'danger',
    titleStyle: styles.flashCardMessage
  })
}

export const showCreatePartyGroupAlreadyCreatedMessage = () => {
  showMessage({
    message: 'パーティーはすでに作成済みです',
    type: 'danger',
    titleStyle: styles.flashCardMessage
  })
}

export const showCreateBlockUserSunccessMessage = () => {
  showMessage({
    message: 'ユーザーをブロックしました',
    type: 'success',
    titleStyle: styles.flashCardMessage
  })
}

export const showCreateBlockUserFailurMessage = () => {
  showMessage({
    message: 'ユーザーのブロックに失敗しました',
    type: 'danger',
    titleStyle: styles.flashCardMessage
  })
}

export const showCreateBlockUserAlreadyBlockedMessage = () => {
  showMessage({
    message: 'このユーザーはすでにブロック済みです',
    type: 'danger',
    titleStyle: styles.flashCardMessage
  })
}

export const showApplyFriendSunccessMessage = () => {
  showMessage({
    message: '友達申請しました',
    type: 'success',
    titleStyle: styles.flashCardMessage
  })
}

export const showApplyFriendFailurMessage = () => {
  showMessage({
    message: '友達申請しましたに失敗しました',
    type: 'danger',
    titleStyle: styles.flashCardMessage
  })
}

export const showApplyFriendAlreadyappliedMessage = () => {
  showMessage({
    message: 'このユーザーはすでに友達申請済みです',
    type: 'danger',
    titleStyle: styles.flashCardMessage
  })
}

const styles = {
  flashCardMessage: {
    fontSize: 14
  }
}
