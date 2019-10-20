type Config = {
  apiKey: string
  authDomain: string
  databaseURL: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
}

const config: Config = {
  apiKey: '<-- firebase api key -->',
  authDomain: '<-- firebase auth domain -->',
  databaseURL: '<-- firebase database url -->',
  projectId: '<-- firebase project id -->',
  storageBucket: '<-- firebase storage bucket -->',
  messagingSenderId: '<-- firebase messaging sender id -->'
}

export default config
