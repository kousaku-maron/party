import { connect } from 'react-redux'
import { AppState } from '../reducers/configureStore'
import { Auth } from '../reducers/auth'
import { UserEditScreen } from '../screens'

export interface UserEditScreenState {
  auth: Auth
}

const mapStateToProps = (appState: AppState) => ({
  auth: appState.auth
})

export default connect(mapStateToProps)(UserEditScreen)
