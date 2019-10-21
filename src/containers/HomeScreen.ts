import { connect } from 'react-redux'
import { AppState } from '../reducers/configureStore'
import { Auth } from '../reducers/auth'
import { HomeScreen } from '../screens'

export interface HomeScreenState {
  auth: Auth
}

const mapStateToProps = (appState: AppState) => ({
  auth: appState.auth
})

export default connect(mapStateToProps)(HomeScreen)
