import { showMessage } from 'react-native-flash-message'

export const userEditFlashCardTrue = () => {
  showMessage({
    message: 'ユーザー情報を更新しました',
    type: 'success',
    titleStyle: styles.flashCardMessage
  })
}

export const userEditFlashCardFalse = () => {
  showMessage({
    message: 'ユーザー情報の更新に失敗しました',
    type: 'danger',
    titleStyle: styles.flashCardMessage
  })
}

export const entryPartyFlashCardTrue = () => {
  showMessage({
    message: 'パーティーに参加申請しました',
    type: 'success',
    titleStyle: styles.flashCardMessage
  })
}

export const entryPartyFlashCardFalse = () => {
  showMessage({
    message: 'パーティーの参加申請に失敗しました',
    type: 'danger',
    titleStyle: styles.flashCardMessage
  })
}

export const entryPartyAcceptFlashCardTrue = () => {
  showMessage({
    message: 'パーティー参加を承諾しました',
    type: 'success',
    titleStyle: styles.flashCardMessage
  })
}

export const entryPartyAcceptFlashCardFalse = () => {
  showMessage({
    message: 'パーティー参加の承諾に失敗しました',
    type: 'danger',
    titleStyle: styles.flashCardMessage
  })
}

export const entryPartyRejectFlashCardTrue = () => {
  showMessage({
    message: 'パーティー参加を拒否しました',
    type: 'success',
    titleStyle: styles.flashCardMessage
  })
}

export const entryPartyRejectFlashCardFalse = () => {
  showMessage({
    message: 'パーティー参加の拒否に失敗しました',
    type: 'danger',
    titleStyle: styles.flashCardMessage
  })
}

const styles = {
  flashCardMessage: {
    fontSize: 18
  }
}
