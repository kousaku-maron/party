import { functions } from '../repositories/firebase'
import { User } from '../entities/User'
import { useAuthState } from '../store/hooks'
import {
  showReportUserSunccessMessage,
  showReportUserFailurMessage,
  showReportUserAlreadyacceptedMessage
} from './flashCard'

export const useReportUser = () => {
  const { uid } = useAuthState()

  const reportUser = async (reportedUser: User, comment: string) => {
    const reportedUserUID = reportedUser.id
    try {
      if (reportedUser.reportUserUIDs && reportedUser.reportUserUIDs.includes(uid)) {
        showReportUserAlreadyacceptedMessage()
        return
      }

      await functions.httpsCallable('reportUser')({ reportedUserUID, comment })
      showReportUserSunccessMessage()
    } catch (e) {
      showReportUserFailurMessage()
      console.warn(e)
    }
  }
  return { reportUser }
}
