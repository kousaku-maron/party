import { useSelector } from 'react-redux'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { domainUserActions } from './actions'
import { User } from '../../../entities'
import { StoreState } from '../../configureStore'
// import { uniq, pull } from 'lodash'

export type DomainUser = {
  [id: string]: User
}

const initialState: DomainUser = {}

export const domainUserReducer = reducerWithInitialState(initialState)
  .case(domainUserActions.setUser, (state, user) => {
    return { ...state, [user.id]: { ...user } }
  })
  .case(domainUserActions.setUsers, (state, users) => {
    return { ...state, ...users.map(user => ({ [user.id]: user })).reduce((prev, crt) => ({ ...prev, ...crt })) }
  })
// .case(domainUserActions.applyFriend, (state, node) => {
//   return {
//     ...state,
//     [node.fromUID]: {
//       ...state[node.fromUID],
//       applyFriendUIDs:
//         state[node.fromUID] && state[node.fromUID].applyFriendUIDs
//           ? uniq([...state[node.fromUID].applyFriendUIDs, node.toUID])
//           : [node.toUID]
//     },
//     [node.toUID]: {
//       ...state[node.toUID],
//       appliedFriendUIDs:
//         state[node.toUID] && state[node.toUID].appliedFriendUIDs
//           ? uniq([...state[node.toUID].appliedFriendUIDs, node.fromUID])
//           : [node.fromUID]
//     }
//   }
// })
// .case(domainUserActions.cancelApplyFriend, (state, node) => {
//   return {
//     ...state,
//     [node.fromUID]: {
//       ...state[node.fromUID],
//       applyFriendUIDs: pull(state[node.fromUID].applyFriendUIDs, node.toUID)
//     },
//     [node.toUID]: {
//       ...state[node.toUID],
//       appliedFriendUIDs: pull(state[node.toUID].appliedFriendUIDs, node.fromUID)
//     }
//   }
// })
// .case(domainUserActions.acceptFriend, (state, node) => {
//   return {
//     ...state,
//     [node.fromUID]: {
//       ...state[node.fromUID],
//       appliedFriendUIDs: pull(state[node.fromUID].appliedFriendUIDs, node.toUID),
//       friendUIDs:
//         state[node.fromUID] && state[node.fromUID].friendUIDs
//           ? uniq([...state[node.fromUID].friendUIDs, node.toUID])
//           : [node.toUID]
//     },
//     [node.toUID]: {
//       ...state[node.toUID],
//       applyFriendUIDs: pull(state[node.toUID].applyFriendUIDs, node.fromUID),
//       friendUIDs:
//         state[node.toUID] && state[node.toUID].friendUIDs
//           ? uniq([...state[node.toUID].friendUIDs, node.fromUID])
//           : [node.fromUID]
//     }
//   }
// })
// .case(domainUserActions.cancelAcceptFriend, (state, node) => {
//   return {
//     ...state,
//     [node.fromUID]: {
//       ...state[node.fromUID],
//       appliedFriendUIDs: uniq([...state[node.fromUID].appliedFriendUIDs, node.toUID]),
//       friendUIDs: pull(state[node.fromUID].friendUIDs, node.toUID)
//     },
//     [node.toUID]: {
//       ...state[node.toUID],
//       applyFriendUIDs: uniq([...state[node.toUID].applyFriendUIDs, node.fromUID]),
//       friendUIDs: pull(state[node.toUID].friendUIDs, node.fromUID)
//     }
//   }
// })
// .case(domainUserActions.refuseFriend, (state, node) => {
//   return {
//     ...state,
//     [node.fromUID]: {
//       ...state[node.fromUID],
//       appliedFriendUIDs: pull(state[node.fromUID].appliedFriendUIDs, node.toUID)
//     },
//     [node.toUID]: {
//       ...state[node.toUID],
//       applyFriendUIDs: pull(state[node.toUID].applyFriendUIDs, node.fromUID)
//     }
//   }
// })
// .case(domainUserActions.cancelRefuseFriend, (state, node) => {
//   return {
//     ...state,
//     [node.fromUID]: {
//       ...state[node.fromUID],
//       appliedFriendUIDs: uniq([...state[node.fromUID].appliedFriendUIDs, node.toUID])
//     },
//     [node.toUID]: {
//       ...state[node.toUID],
//       applyFriendUIDs: uniq([...state[node.toUID].applyFriendUIDs, node.fromUID])
//     }
//   }
// })

export const useDomainUserState = () => {
  const userRecord = useSelector((state: StoreState) => state.domain.user)

  return userRecord
}
