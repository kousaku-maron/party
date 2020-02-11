import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import actionCreateFactory from 'typescript-fsa'
import { ColorSchemeName } from 'react-native-appearance'

const actionCreator = actionCreateFactory()

export const uiActions = {
  openLoadingModal: actionCreator<void>('OPEN_LOADING_MODAL'),
  closeLoadingModal: actionCreator<void>('CLOSE_LOADING_MODAL'),
  setTheme: actionCreator<ColorSchemeName>('SET_THEME'),
  setTabState: actionCreator<'home' | 'chat' | 'user'>('SET_TAB_STATE')
}

export const useUIActions = () => {
  const dispatch = useDispatch()

  const openLoadingModal = useCallback(() => {
    dispatch(uiActions.openLoadingModal())
  }, [dispatch])

  const closeLoadingModal = useCallback(() => {
    dispatch(uiActions.closeLoadingModal())
  }, [dispatch])

  const setTabState = useCallback(
    (tabState: 'home' | 'chat' | 'user') => {
      dispatch(uiActions.setTabState(tabState))
    },
    [dispatch]
  )

  return {
    openLoadingModal,
    closeLoadingModal,
    setTabState
  }
}
