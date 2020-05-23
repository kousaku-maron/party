import { useSelector } from 'react-redux'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { domainUserActions } from './actions'
import { User } from '../../../entities'
import { StoreState } from '../../configureStore'
import { uniq, pull } from 'lodash'

export type DomainUser = {
  [id: string]: User
}

const initialState: DomainUser = {}

export const domainUserReducer = reducerWithInitialState(initialState)
  .case(domainUserActions.setUser, (state, user) => {
    return { ...state, [user.id]: { ...user } }
  })
  .case(domainUserActions.setUsers, (state, users) => {
    return {
      ...state,
      ...(users.length > 0 && {
        ...users.map(user => ({ [user.id]: user })).reduce((prev, crt) => ({ ...prev, ...crt }))
      })
    }
  })
  .case(domainUserActions.applyFriendship, (state, node) => {
    return {
      ...state,
      [node.fromUID]: {
        ...state[node.fromUID],
        applyFriendUIDs:
          state[node.fromUID] && state[node.fromUID].applyFriendUIDs
            ? uniq([...state[node.fromUID].applyFriendUIDs, node.toUID])
            : [node.toUID]
      },
      [node.toUID]: {
        ...state[node.toUID],
        appliedFriendUIDs:
          state[node.toUID] && state[node.toUID].appliedFriendUIDs
            ? uniq([...state[node.toUID].appliedFriendUIDs, node.fromUID])
            : [node.fromUID]
      }
    }
  })
  .case(domainUserActions.acceptFriendship, (state, node) => {
    return {
      ...state,
      [node.fromUID]: {
        ...state[node.fromUID],
        appliedFriendUIDs: pull(state[node.fromUID].appliedFriendUIDs, node.toUID),
        friendUIDs:
          state[node.fromUID] && state[node.fromUID].friendUIDs
            ? uniq([...state[node.fromUID].friendUIDs, node.toUID])
            : [node.toUID]
      },
      [node.toUID]: {
        ...state[node.toUID],
        applyFriendUIDs: pull(state[node.toUID].applyFriendUIDs, node.fromUID),
        friendUIDs:
          state[node.toUID] && state[node.toUID].friendUIDs
            ? uniq([...state[node.toUID].friendUIDs, node.fromUID])
            : [node.fromUID]
      }
    }
  })
  .case(domainUserActions.refuseFriendship, (state, node) => {
    return {
      ...state,
      [node.fromUID]: {
        ...state[node.fromUID],
        appliedFriendUIDs: pull(state[node.fromUID].appliedFriendUIDs, node.toUID)
      },
      [node.toUID]: {
        ...state[node.toUID],
        applyFriendUIDs: pull(state[node.toUID].applyFriendUIDs, node.fromUID)
      }
    }
  })
  .case(domainUserActions.reportUserRelationship, (state, node) => {
    return {
      ...state,
      [node.fromUID]: {
        ...state[node.fromUID],
        reportedUIDs:
          state[node.fromUID] && state[node.fromUID].reportedUIDs
            ? uniq([...state[node.fromUID].reportedUIDs, node.toUID])
            : [node.toUID]
      },
      [node.toUID]: {
        ...state[node.toUID],
        reportUIDs:
          state[node.toUID] && state[node.toUID].reportUIDs
            ? uniq([...state[node.toUID].reportUIDs, node.fromUID])
            : [node.fromUID]
      }
    }
  })
  .case(domainUserActions.blockUserRelationship, (state, node) => {
    return {
      ...state,
      [node.fromUID]: {
        ...state[node.fromUID],
        blockedUIDs:
          state[node.fromUID] && state[node.fromUID].blockedUIDs
            ? uniq([...state[node.fromUID].blockedUIDs, node.toUID])
            : [node.toUID]
      },
      [node.toUID]: {
        ...state[node.toUID],
        blockUIDs:
          state[node.toUID] && state[node.toUID].blockUIDs
            ? uniq([...state[node.toUID].blockUIDs, node.fromUID])
            : [node.fromUID]
      }
    }
  })

export const useDomainUserState = () => {
  const domainUser = useSelector((state: StoreState) => state.domain.user)

  return domainUser
}
