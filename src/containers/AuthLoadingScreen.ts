import { connect } from 'react-redux'
import { AppState } from '../reducers/configureStore'
import { Auth } from '../reducers/auth'
import { AuthLoadingScreen } from '../screens'

export interface AuthLoadingScreenState {
  auth: Auth
}

const mapStateToProps = (appState: AppState) => ({
  auth: appState.auth
})

export default connect(mapStateToProps)(AuthLoadingScreen)
