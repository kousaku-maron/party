import { functions } from '../repositories/firebase'
import { User, Report } from '../entities'
import { useAppAuthState, useAppUserActions, useDomainUserActions } from '../store/hooks'
import { showReportUserSunccessMessage, showReportUserFailurMessage } from './flashCard'

export const useReportUser = () => {
  const { uid } = useAppAuthState()
  const { addFetchingReportUserRelationship, removeFetchingReportUserRelationship } = useAppUserActions()
  const { reportUser } = useDomainUserActions()

  const onReportUser = async (user: User, comment: string) => {
    const node = { fromUID: uid, toUID: user.uid, comment }
    const report: Report = {
      reportUID: node.fromUID,
      reportedUID: node.toUID,
      comment
    }

    try {
      showReportUserSunccessMessage()
      addFetchingReportUserRelationship(node)
      await functions.httpsCallable('createReport')({ report }) // TODO: nodeを引数にそして保存するようにする
      reportUser(node)
      removeFetchingReportUserRelationship(node)
    } catch (e) {
      showReportUserFailurMessage()
      removeFetchingReportUserRelationship(node)
      console.warn(e)
    }
  }
  return { onReportUser }
}
