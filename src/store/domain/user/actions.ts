import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import actionCreateFactory from 'typescript-fsa'
import { User } from '../../../entities'

const actionCreator = actionCreateFactory()

// type UserNodeProps = {
//   fromUID: string
//   toUID: string
// }

export const domainUserActions = {
  setUser: actionCreator<User>('SET_USER'),
  setUsers: actionCreator<User[]>('SET_USERS')
  // applyFriend: actionCreator<UserNodeProps>('APPLY_FRIEND'),
  // cancelApplyFriend: actionCreator<UserNodeProps>('CANCEL_APPLY_FRIEND'),
  // acceptFriend: actionCreator<UserNodeProps>('ACCEPT_FRIEND'),
  // cancelAcceptFriend: actionCreator<UserNodeProps>('CANCEL_ACCEPT_FRIEND'),
  // refuseFriend: actionCreator<UserNodeProps>('REFUSE_FRIEND'),
  // cancelRefuseFriend: actionCreator<UserNodeProps>('CANCEL_REFUSE_FRIEND')
}

export const useDomainUserActions = () => {
  const dispatch = useDispatch()

  const setUser = useCallback(
    (user: User) => {
      dispatch(domainUserActions.setUser(user))
    },
    [dispatch]
  )

  const setUsers = useCallback(
    (users: User[]) => {
      dispatch(domainUserActions.setUsers(users))
    },
    [dispatch]
  )

  // const applyFriend = useCallback(
  //   (node: UserNodeProps) => {
  //     dispatch(domainUserActions.applyFriend(node))
  //   },
  //   [dispatch]
  // )

  // const cancelApplyFriend = useCallback(
  //   (node: UserNodeProps) => {
  //     dispatch(domainUserActions.cancelApplyFriend(node))
  //   },
  //   [dispatch]
  // )

  // const acceptFriend = useCallback(
  //   (node: UserNodeProps) => {
  //     dispatch(domainUserActions.acceptFriend(node))
  //   },
  //   [dispatch]
  // )

  // const cancelAcceptFriend = useCallback(
  //   (node: UserNodeProps) => {
  //     dispatch(domainUserActions.cancelAcceptFriend(node))
  //   },
  //   [dispatch]
  // )

  // const refuseFriend = useCallback(
  //   (node: UserNodeProps) => {
  //     dispatch(userRecordActions.refuseFriend(node))
  //   },
  //   [dispatch]
  // )

  // const cancelRefuseFriend = useCallback(
  //   (node: UserNodeProps) => {
  //     dispatch(userRecordActions.cancelRefuseFriend(node))
  //   },
  //   [dispatch]
  // )

  return {
    setUser,
    setUsers
  }
}
