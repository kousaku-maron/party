import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { uiActions } from '../actions'

export interface UI {
  showLoadingModal: boolean
}

const initialState: UI = {
  showLoadingModal: false
}

export const uiReducer = reducerWithInitialState(initialState)
  .case(uiActions.openLoadingModal, state => {
    return { ...state, showLoadingModal: true }
  })
  .case(uiActions.closeLoadingModal, state => {
    return { ...state, showLoadingModal: false }
  })
