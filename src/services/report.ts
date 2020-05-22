import { functions } from '../repositories/firebase'
import { User, Report } from '../entities'
import { useAppAuthState, useAppUserActions, useDomainUserActions } from '../store/hooks'
import { showReportUserSunccessMessage, showReportUserFailurMessage } from './flashCard'

export const useReportUser = () => {
  const { uid } = useAppAuthState()
  const { addFetchingReportUser, removeFetchingReportUser } = useAppUserActions()
  const { reportUser } = useDomainUserActions()

  const onReportUser = async (user: User, comment: string) => {
    const node = { fromUID: uid, toUID: user.uid }
    const report: Report = {
      reportUID: node.fromUID,
      reportedUID: node.toUID,
      comment
    }

    try {
      showReportUserSunccessMessage()
      addFetchingReportUser(node)
      await functions.httpsCallable('createReport')({ report }) // TODO: nodeを引数にそして保存するようにする
      reportUser(node)
      removeFetchingReportUser(node)
    } catch (e) {
      showReportUserFailurMessage()
      removeFetchingReportUser(node)
      console.warn(e)
    }
  }
  return { onReportUser }
}
