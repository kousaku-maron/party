import { connect } from 'react-redux'
import { AppState } from '../reducers/configureStore'
import { Auth } from '../reducers/auth'
import { PartyDetailScreen } from '../screens'

export interface PartyDetailScreenState {
  auth: Auth
}

const mapStateToProps = (appState: AppState) => ({
  auth: appState.auth
})

export default connect(mapStateToProps)(PartyDetailScreen)
