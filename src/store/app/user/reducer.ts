import { useSelector } from 'react-redux'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { appUserActions } from './actions'
import { StoreState } from '../../configureStore'
import { uniqBy, pullAllBy } from 'lodash'

type UserNodeProps = {
  fromUID: string
  toUID: string
}

export type AppUser = {
  fetchingApplyFriendship: UserNodeProps[]
  fetchingAcceptFriendship: UserNodeProps[]
  fetchingRefuseFriendship: UserNodeProps[]
}

const initialState: AppUser = {
  fetchingApplyFriendship: [],
  fetchingAcceptFriendship: [],
  fetchingRefuseFriendship: []
}

export const appUserReducer = reducerWithInitialState(initialState)
  .case(appUserActions.addFetchingApplyFriendship, (state, node) => {
    return {
      ...state,
      fetchingApplyFriendship: uniqBy([...state.fetchingApplyFriendship, node], 'toUID')
    }
  })
  .case(appUserActions.removeFetchingApplyFriendship, (state, node) => {
    return {
      ...state,
      fetchingApplyFriendship: pullAllBy(state.fetchingApplyFriendship, [node], 'toUID')
    }
  })
  .case(appUserActions.addFetchingAcceptFriendship, (state, node) => {
    return {
      ...state,
      fetchingAcceptFriendship: uniqBy([...state.fetchingAcceptFriendship, node], 'toUID')
    }
  })
  .case(appUserActions.removeFetchingAcceptFriendship, (state, node) => {
    return {
      ...state,
      fetchingAcceptFriendship: pullAllBy(state.fetchingAcceptFriendship, [node], 'toUID')
    }
  })
  .case(appUserActions.addFetchingRefuseFriendship, (state, node) => {
    return {
      ...state,
      fetchingRefuseFriendship: uniqBy([...state.fetchingRefuseFriendship, node], 'toUID')
    }
  })
  .case(appUserActions.removeFetchingRefuseFriendship, (state, node) => {
    return {
      ...state,
      fetchingRefuseFriendship: pullAllBy(state.fetchingRefuseFriendship, [node], 'toUID')
    }
  })

export const useAppUserState = () => {
  const appUser = useSelector((state: StoreState) => state.app.user)

  return appUser
}
