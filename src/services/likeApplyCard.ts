import { functions } from '../repositories/firebase'
import { ApplyCard } from '../entities'
import { useAppAuthState } from '../store/hooks'
import {
  showLikeApplyCardSunccessMessage,
  showLikeApplyCardAlreadyLikedMessage,
  showLikeApplyCardAlreadyMatchMessage,
  showLikeApplyCardFailurMessage
} from './flashCard'

export const useLikeApplyCard = () => {
  const { user } = useAppAuthState()

  const likeApplyCard = async (applyCard: ApplyCard) => {
    const applyCardID = applyCard.groupID

    try {
      if (user.likedGroupAssetIDs && user.likedGroupAssetIDs.includes(applyCardID)) {
        showLikeApplyCardAlreadyLikedMessage()
        return
      }
      if (user.matchGroupAssetIDs && user.matchGroupAssetIDs.includes(applyCardID)) {
        showLikeApplyCardAlreadyMatchMessage()
        return
      }

      await functions.httpsCallable('likeApplyCard')({ applyCard })
      showLikeApplyCardSunccessMessage()
    } catch (e) {
      console.warn(e)
      showLikeApplyCardFailurMessage()
    }
  }
  return { likeApplyCard }
}
