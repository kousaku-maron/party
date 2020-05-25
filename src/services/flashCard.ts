import { showMessage } from 'react-native-flash-message'

type Props = {
  message: string
  type?: 'success' | 'danger'
}

const showMessageBase = ({ message, type = 'success' }: Props) => {
  showMessage({
    message,
    type,
    titleStyle: styles.flashCardMessage
  })
}

const styles = {
  flashCardMessage: {
    fontSize: 14
  }
}

export const showUserEditSuccessMessage = () => {
  showMessageBase({ message: 'ユーザー情報を更新しました' })
}

export const showUserEditFailurMessage = () => {
  showMessageBase({ message: 'ユーザー情報の更新に失敗しました', type: 'danger' })
}

export const showEntryPartyApplySunccessMessage = () => {
  showMessageBase({ message: 'パーティーに参加申請しました' })
}

export const showEntryPartyApplyFailurMessage = () => {
  showMessageBase({ message: 'パーティーの参加申請に失敗しました', type: 'danger' })
}

export const showEntryPartyAlreadyAppliedMessage = () => {
  showMessageBase({ message: '既にパーティーの参加を申請しています', type: 'danger' })
}

export const showEntryPartyAcceptedSuccessMessage = () => {
  showMessageBase({ message: 'パーティー参加を承諾しました' })
}

export const showEntryPartyAcceptedFailurMessage = () => {
  showMessageBase({ message: 'パーティー参加の承諾に失敗しました', type: 'danger' })
}

export const showEntryPartyRejectSuccessMessage = () => {
  showMessageBase({ message: 'パーティー参加を拒否しました' })
}

export const showEntryPartyRejectFailurMessage = () => {
  showMessage({ message: 'パーティー参加の拒否に失敗しました', type: 'danger' })
}

export const showQuickRepliedSuccessMessage = () => {
  showMessage({ message: '回答を送信しました。' })
}

export const showCreatePartyGroupSunccessMessage = () => {
  showMessage({ message: 'パーティーを作成しました' })
}

export const showCreatePartyGroupFailurMessage = () => {
  showMessageBase({ message: 'パーティーの作成に失敗しました', type: 'danger' })
}

export const showCreatePartyGroupAlreadyCreatedMessage = () => {
  showMessageBase({ message: 'パーティーはすでに作成済みです', type: 'danger' })
}

export const showBlockUserSunccessMessage = () => {
  showMessageBase({ message: 'ユーザーをブロックしました' })
}

export const showBlockUserFailurMessage = () => {
  showMessage({ message: 'ユーザーのブロックに失敗しました', type: 'danger' })
}

export const showBlockUserAlreadyBlockedMessage = () => {
  showMessage({ message: 'このユーザーはすでにブロック済みです', type: 'danger' })
}

export const showApplyFriendRequestMessage = () => {
  showMessage({ message: 'ともだち申請しました' })
}

export const showApplyFriendFailureMessage = () => {
  showMessage({ message: 'ともだち申請できませんでした', type: 'danger' })
}

export const showAcceptFriendRequestMessage = () => {
  showMessage({ message: 'ともだちになりました' })
}

export const showAcceptFriendFailureMessage = () => {
  showMessage({ message: 'ともだち申請を許可できませんでした', type: 'danger' })
}

export const showRefuseFriendRequestMessage = () => {
  showMessage({ message: 'ともだち申請を断りました', type: 'success' })
}

export const showRefuseFriendFailureMessage = () => {
  showMessage({ message: 'ともだち申請の拒否できませんでした', type: 'danger' })
}

export const showReportUserSunccessMessage = () => {
  showMessage({ message: 'ユーザーを通報しました' })
}

export const showReportUserAlreadyacceptedMessage = () => {
  showMessage({ message: 'このユーザーはすでに通報済みです', type: 'danger' })
}

export const showReportUserFailurMessage = () => {
  showMessage({ message: 'ユーザーの通報に失敗しました', type: 'danger' })
}

export const showLikeApplyCardSunccessMessage = () => {
  showMessage({ message: 'いいねしました' })
}

export const showLikeApplyCardAlreadyLikedMessage = () => {
  showMessage({ message: 'このユーザーはすでにいいね済みです', type: 'danger' })
}

export const showLikeApplyCardAlreadyMatchMessage = () => {
  showMessage({ message: 'このユーザーはすでにマッチング済みです', type: 'danger' })
}

export const showLikeApplyCardFailurMessage = () => {
  showMessage({ message: 'いいねに失敗しました', type: 'danger' })
}

export const showCreateRoomFailureMessage = () => {
  showMessage({ message: 'ルーム作成に失敗しました', type: 'danger' })
}
