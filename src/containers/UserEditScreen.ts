import { Action, AnyAction } from 'typescript-fsa'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { AppState } from '../reducers/configureStore'
import { Auth } from '../reducers/auth'
import { uiActions } from '../actions/ui'
import { UserEditScreen } from '../screens'

export interface UserEditScreenState {
  auth: Auth
}

export interface UserEditScreenActions {
  openLoadingModal: () => Action<void>
  closeLoadingModal: () => Action<void>
}

const mapStateToProps = (appState: AppState) => ({
  auth: appState.auth
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  openLoadingModal: () => {
    dispatch(uiActions.openLoadingModal())
  },
  closeLoadingModal: () => {
    dispatch(uiActions.closeLoadingModal())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserEditScreen)
