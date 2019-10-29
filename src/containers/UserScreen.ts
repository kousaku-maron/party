import { Action, AnyAction } from 'typescript-fsa'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { AppState } from '../reducers/configureStore'
import { Auth } from '../reducers/auth'
import { authActions, Fetch } from '../actions'
import { UserScreen } from '../screens'

export interface UserScreenState {
  auth: Auth
}

export interface UserScreenActions {
  signOut: (fetch: Fetch) => Action<void>
}

const mapStateToProps = (appState: AppState) => ({
  auth: appState.auth
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  signOut: (fetch: Fetch) => {
    dispatch(authActions.signOut(fetch))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserScreen)
