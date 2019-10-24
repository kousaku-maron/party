import { connect } from 'react-redux'
import { AppState } from '../../../reducers/configureStore'
import { LoadingModal } from '../../../components/organisms'

export interface LoadingModalState {
  isVisible: boolean
}

const mapStateToProps = (appState: AppState) => ({
  isVisible: appState.ui.showLoadingModal
})

export default connect(mapStateToProps)(LoadingModal)
