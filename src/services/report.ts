import { functions } from '../repositories/firebase'
import { User, UpdateUser } from '../entities/User'
import { useAuthState } from '../store/hooks'
import { setUser } from '../repositories/user'
import {
  showReportUserSunccessMessage,
  showReportUserFailurMessage,
  showReportUserAlreadyacceptedMessage
} from './flashCard'
import _ from 'lodash'

export const useReportUser = () => {
  const { uid, user } = useAuthState()

  const reportUser = async (reportedUser: User, comment: string) => {
    const reportedUserUID = reportedUser.id
    try {
      if (reportedUser.reportUserUIDs && reportedUser.reportUserUIDs.includes(uid)) {
        showReportUserAlreadyacceptedMessage()
        return
      }

      const newUser: UpdateUser = {
        ..._.pick(user, 'uid', 'name', 'thumbnailURL'),
        reportedUserUIDs: _.uniq(
          user.reportedUserUIDs ? [reportedUserUID, ...user.reportedUserUIDs] : [reportedUserUID]
        )
      }

      setUser(uid, newUser)
      await functions.httpsCallable('reportUser')({ reportedUserUID, comment })
      showReportUserSunccessMessage()
    } catch (e) {
      showReportUserFailurMessage()
      console.warn(e)
    }
  }
  return { reportUser }
}
