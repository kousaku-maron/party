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

export const showEntryPartyAlreadyApplied = () => {
  showMessage({
    message: '既にパーティーの参加を申請しています',
    type: 'info',
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

const styles = {
  flashCardMessage: {
    fontSize: 14
  }
}
