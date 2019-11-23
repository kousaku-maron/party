import actionCreateFactory from 'typescript-fsa'

const actionCreator = actionCreateFactory()

export const uiActions = {
  openLoadingModal: actionCreator<void>('OPEN_LOADING_MODAL'),
  closeLoadingModal: actionCreator<void>('CLOSE_LOADING_MODAL')
}
