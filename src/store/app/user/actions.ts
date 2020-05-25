import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import actionCreateFactory from 'typescript-fsa'

const actionCreator = actionCreateFactory()

type UserNodeProps = {
  fromUID: string
  toUID: string
}

type ReportNodeProps = {
  fromUID: string
  toUID: string
  comment: string
}

export const appUserActions = {
  addFetchingApplyFriendship: actionCreator<UserNodeProps>('ADD_FETCHING_APPLY_FRIENDSHIP'),
  removeFetchingApplyFriendship: actionCreator<UserNodeProps>('REMOVE_FETCHING_APPLY_FRIENDSHIP'),
  addFetchingAcceptFriendship: actionCreator<UserNodeProps>('ADD_FETCHING_ACCEPT_FRIENDSHIP'),
  removeFetchingAcceptFriendship: actionCreator<UserNodeProps>('REMOVE_FETCHING_ACCEPT_FRIENDSHIP'),
  addFetchingRefuseFriendship: actionCreator<UserNodeProps>('ADD_FETCHING_REFUSE_FRIENDSHIP'),
  removeFetchingRefuseFriendship: actionCreator<UserNodeProps>('REMOVE_FETCHING_REFUSE_FRIENDSHIP'),
  addFetchingReportUserRelationship: actionCreator<ReportNodeProps>('ADD_FETCHING_REPORT_USER'),
  removeFetchingReportUserRelationship: actionCreator<ReportNodeProps>('REMOVE_FETCHING_REPORT_USER'),
  addFetchingBlockUserRelationship: actionCreator<UserNodeProps>('ADD_FETCHING_BLOCK_USER'),
  removeFetchingBlockUserRelationship: actionCreator<UserNodeProps>('REMOVE_FETCHING_BLOCK_USER')
}

export const useAppUserActions = () => {
  const dispatch = useDispatch()

  const addFetchingApplyFriendship = useCallback(
    (node: UserNodeProps) => {
      dispatch(appUserActions.addFetchingApplyFriendship(node))
    },
    [dispatch]
  )

  const removeFetchingApplyFriendship = useCallback(
    (node: UserNodeProps) => {
      dispatch(appUserActions.removeFetchingApplyFriendship(node))
    },
    [dispatch]
  )

  const addFetchingAcceptFriendship = useCallback(
    (node: UserNodeProps) => {
      dispatch(appUserActions.addFetchingAcceptFriendship(node))
    },
    [dispatch]
  )

  const removeFetchingAcceptFriendship = useCallback(
    (node: UserNodeProps) => {
      dispatch(appUserActions.removeFetchingAcceptFriendship(node))
    },
    [dispatch]
  )

  const addFetchingRefuseFriendship = useCallback(
    (node: UserNodeProps) => {
      dispatch(appUserActions.addFetchingRefuseFriendship(node))
    },
    [dispatch]
  )

  const removeFetchingRefuseFriendship = useCallback(
    (node: UserNodeProps) => {
      dispatch(appUserActions.removeFetchingRefuseFriendship(node))
    },
    [dispatch]
  )

  const addFetchingReportUserRelationship = useCallback(
    (node: ReportNodeProps) => {
      dispatch(appUserActions.addFetchingReportUserRelationship(node))
    },
    [dispatch]
  )

  const removeFetchingReportUserRelationship = useCallback(
    (node: ReportNodeProps) => {
      dispatch(appUserActions.removeFetchingRefuseFriendship(node))
    },
    [dispatch]
  )

  const addFetchingBlockUserRelationship = useCallback(
    (node: UserNodeProps) => {
      dispatch(appUserActions.addFetchingBlockUserRelationship(node))
    },
    [dispatch]
  )

  const removeFetchingBlockUserRelationship = useCallback(
    (node: UserNodeProps) => {
      dispatch(appUserActions.removeFetchingBlockUserRelationship(node))
    },
    [dispatch]
  )

  return {
    addFetchingApplyFriendship,
    removeFetchingApplyFriendship,
    addFetchingAcceptFriendship,
    removeFetchingAcceptFriendship,
    addFetchingRefuseFriendship,
    removeFetchingRefuseFriendship,
    addFetchingReportUserRelationship,
    removeFetchingReportUserRelationship,
    addFetchingBlockUserRelationship,
    removeFetchingBlockUserRelationship
  }
}
