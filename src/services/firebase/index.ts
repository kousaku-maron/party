import firebase from 'firebase/app'
import 'firebase/auth'
import config from './config'

firebase.initializeApp(config)

export default firebase
