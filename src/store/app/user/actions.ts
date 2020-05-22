import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import actionCreateFactory from 'typescript-fsa'

const actionCreator = actionCreateFactory()

type UserNodeProps = {
  fromUID: string
  toUID: string
}

export const appUserActions = {
  addFetchingApplyFriendship: actionCreator<UserNodeProps>('ADD_FETCHING_APPLY_FRIENDSHIP'),
  removeFetchingApplyFriendship: actionCreator<UserNodeProps>('REMOVE_FETCHING_APPLY_FRIENDSHIP'),
  addFetchingAcceptFriendship: actionCreator<UserNodeProps>('ADD_FETCHING_ACCEPT_FRIENDSHIP'),
  removeFetchingAcceptFriendship: actionCreator<UserNodeProps>('REMOVE_FETCHING_ACCEPT_FRIENDSHIP'),
  addFetchingRefuseFriendship: actionCreator<UserNodeProps>('ADD_FETCHING_REFUSE_FRIENDSHIP'),
  removeFetchingRefuseFriendship: actionCreator<UserNodeProps>('REMOVE_FETCHING_REFUSE_FRIENDSHIP'),
  addFetchingReportUser: actionCreator<UserNodeProps>('ADD_FETCHING_REPORT_USER'),
  removeFetchingReportUser: actionCreator<UserNodeProps>('REMOVE_FETCHING_REPORT_USER'),
  addFetchingBlockUser: actionCreator<UserNodeProps>('ADD_FETCHING_BLOCK_USER'),
  removeFetchingBlockUser: actionCreator<UserNodeProps>('REMOVE_FETCHING_BLOCK_USER')
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

  const addFetchingReportUser = useCallback(
    (node: UserNodeProps) => {
      dispatch(appUserActions.addFetchingReportUser(node))
    },
    [dispatch]
  )

  const removeFetchingReportUser = useCallback(
    (node: UserNodeProps) => {
      dispatch(appUserActions.removeFetchingRefuseFriendship(node))
    },
    [dispatch]
  )

  const addFetchingBlockUser = useCallback(
    (node: UserNodeProps) => {
      dispatch(appUserActions.addFetchingBlockUser(node))
    },
    [dispatch]
  )

  const removeFetchingBlockUser = useCallback(
    (node: UserNodeProps) => {
      dispatch(appUserActions.removeFetchingBlockUser(node))
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
    addFetchingReportUser,
    removeFetchingReportUser,
    addFetchingBlockUser,
    removeFetchingBlockUser
  }
}
