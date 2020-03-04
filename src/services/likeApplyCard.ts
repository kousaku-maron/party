import { functions } from '../repositories/firebase'
import { ApplyCard } from '../entities'
import { useAuthState } from '../store/hooks'
import {
  showLikeApplyCardSunccessMessage,
  showLikeApplyCardAlreadyLikedMessage,
  showLikeApplyCardAlreadyMatchedMessage,
  showLikeApplyCardFailurMessage
} from './flashCard'

export const useLikeApplyCard = () => {
  const { user } = useAuthState()

  const likeApplyCard = async (applyCard: ApplyCard) => {
    const applyCardID = applyCard.groupID

    try {
      if (user.likedGroupIDs && user.likedGroupIDs.includes(applyCardID)) {
        showLikeApplyCardAlreadyLikedMessage()
        return
      }
      if (user.matchGroupsIDs && user.matchGroupsIDs.includes(applyCardID)) {
        showLikeApplyCardAlreadyMatchedMessage()
        return
      }

      //MEMO: blockUser, applyUser, acceptUser, refuseUserではfunctionsに投げているのはidだが，
      //オブジェクトを投げた方がfirebseからデータを引っ張ってくる工数は減るが，セキュリティの問題が出てくると言う部分要議論
      await functions.httpsCallable('likeApplyCard')({ applyCardID })
      showLikeApplyCardSunccessMessage()
    } catch (e) {
      console.warn(e)
      showLikeApplyCardFailurMessage()
    }
  }
  return { likeApplyCard }
}
