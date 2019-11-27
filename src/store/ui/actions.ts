import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import actionCreateFactory from 'typescript-fsa'

const actionCreator = actionCreateFactory()

export const uiActions = {
  openLoadingModal: actionCreator<void>('OPEN_LOADING_MODAL'),
  closeLoadingModal: actionCreator<void>('CLOSE_LOADING_MODAL'),
  setTheme: actionCreator<'dark' | 'light'>('SET_THEME')
}

export const useUIActions = () => {
  const dispatch = useDispatch()

  const openLoadingModal = useCallback(() => {
    dispatch(uiActions.openLoadingModal())
  }, [dispatch])

  const closeLoadingModal = useCallback(() => {
    dispatch(uiActions.closeLoadingModal())
  }, [dispatch])

  return {
    openLoadingModal,
    closeLoadingModal
  }
}
