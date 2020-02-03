import { useSelector } from 'react-redux'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { uiActions } from './actions'
import { AppState } from '../configureStore'
import { ColorSchemeName } from 'react-native-appearance'

export interface UI {
  showLoadingModal: boolean
  theme: ColorSchemeName
  tabState: 'home' | 'chat' | 'user'
}

const initialState: UI = {
  showLoadingModal: false,
  theme: 'dark',
  tabState: 'home'
}

export const uiReducer = reducerWithInitialState(initialState)
  .case(uiActions.openLoadingModal, state => {
    return { ...state, showLoadingModal: true }
  })
  .case(uiActions.closeLoadingModal, state => {
    return { ...state, showLoadingModal: false }
  })
  .case(uiActions.setTheme, (state, theme) => {
    return { ...state, theme }
  })
  .case(uiActions.setTabState, (state, tabState) => {
    return { ...state, tabState }
  })

export const useUIState = () => {
  const ui = useSelector((state: AppState) => state.ui)

  return ui
}
