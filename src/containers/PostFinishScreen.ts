import { AnyAction } from 'typescript-fsa'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { AppState } from '../reducers/configureStore'
import { Auth } from '../reducers/auth'
import { authActions, Fetch } from '../actions'
import { PostFinishScreen } from '../screens'

export interface WelcomeScreenState {
  auth: Auth
}

const mapStateToProps = (appState: AppState) => ({
  auth: appState.auth
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  signInFacebook: (fetch: Fetch) => {
    dispatch(authActions.signInFacebook(fetch))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostFinishScreen)
