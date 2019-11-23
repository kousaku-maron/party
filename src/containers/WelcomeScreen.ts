import { Action, AnyAction } from 'typescript-fsa'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { AppState } from '../reducers/configureStore'
import { Auth } from '../reducers/auth'
import { authActions, Fetch } from '../actions'
import { WelcomeScreen } from '../screens'

export interface WelcomeScreenState {
  auth: Auth
}

export interface WelcomeScreenActions {
  signInFacebook: (fetch: Fetch) => Action<Fetch>
  signInAnonymously: (fetch: Fetch) => Action<Fetch>
}

const mapStateToProps = (appState: AppState) => ({
  auth: appState.auth
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  signInFacebook: (fetch: Fetch) => {
    dispatch(authActions.signInFacebook(fetch))
  },
  signInAnonymously: (fetch: Fetch) => {
    dispatch(authActions.signInAnonymously(fetch))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomeScreen)
