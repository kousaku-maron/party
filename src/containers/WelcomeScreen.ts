import { Action, AnyAction } from 'typescript-fsa'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { AppState } from '../reducers/configureStore'
import { Auth } from '../reducers/auth'
import { authActions } from '../actions'
import { WelcomeScreen } from '../screens'
import { User } from '../entities'

export interface WelcomeScreenState {
  auth: Auth
}

export interface WelcomeScreenActions {
  setAuth: (user: User) => Action<User>
}

const mapStateToProps = (appState: AppState) => ({
  auth: appState.auth
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  setAuth: (user: User) => dispatch(authActions.setAuth(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomeScreen)
