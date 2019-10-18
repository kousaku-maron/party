import { connect } from 'react-redux'
import { AppState } from '../reducers/configureStore'
import { Auth } from '../reducers/auth'
import { PartyEntryScreen } from '../screens'

export interface PartyEntryScreenState {
  auth: Auth
}

const mapStateToProps = (appState: AppState) => ({
  auth: appState.auth
})

export default connect(mapStateToProps)(PartyEntryScreen)
