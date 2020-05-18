import Constants from 'expo-constants'

type Result = {
  success?: boolean
  cancelled?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any
}

let signInGoogle: () => Promise<Result>

if (Constants.appOwnership === 'expo') {
  signInGoogle = require('./google.expo').signInGoogle
}

if (Constants.appOwnership !== 'expo') {
  signInGoogle = require('./google').signInGoogle
}

export default signInGoogle
