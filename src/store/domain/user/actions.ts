import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import actionCreateFactory from 'typescript-fsa'
import { User } from '../../../entities'

const actionCreator = actionCreateFactory()

type UserNodeProps = {
  fromUID: string
  toUID: string
}

export const domainUserActions = {
  setUser: actionCreator<User>('SET_USER'),
  setUsers: actionCreator<User[]>('SET_USERS'),
  applyFriendship: actionCreator<UserNodeProps>('APPLY_FRIENDSHIP'),
  acceptFriendship: actionCreator<UserNodeProps>('ACCEPT_FRIENDSHIP'),
  refuseFriendship: actionCreator<UserNodeProps>('REFUSE_FRIENDSHIP')
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

  const applyFriendship = useCallback(
    (node: UserNodeProps) => {
      dispatch(domainUserActions.applyFriendship(node))
    },
    [dispatch]
  )

  const acceptFriendship = useCallback(
    (node: UserNodeProps) => {
      dispatch(domainUserActions.acceptFriendship(node))
    },
    [dispatch]
  )

  const refuseFriendship = useCallback(
    (node: UserNodeProps) => {
      dispatch(domainUserActions.refuseFriendship(node))
    },
    [dispatch]
  )

  return {
    setUser,
    setUsers,
    applyFriendship,
    acceptFriendship,
    refuseFriendship
  }
}
