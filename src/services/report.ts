import { functions } from '../repositories/firebase'
import { User, Report } from '../entities'
import { useAppAuthState } from '../store/hooks'
import {
  showReportUserSunccessMessage,
  showReportUserFailurMessage,
  showReportUserAlreadyacceptedMessage
} from './flashCard'

export const useReportUser = () => {
  const { uid } = useAppAuthState()

  const reportUser = async (reportedUser: User, comment: string) => {
    const reportedUID = reportedUser.id
    try {
      if (reportedUser.reportUIDs && reportedUser.reportUIDs.includes(uid)) {
        showReportUserAlreadyacceptedMessage()
        return
      }

      const report: Report = {
        reportUID: uid,
        reportedUID,
        comment
      }

      await functions.httpsCallable('createReport')({ report })
      showReportUserSunccessMessage()
    } catch (e) {
      showReportUserFailurMessage()
      console.warn(e)
    }
  }
  return { reportUser }
}
