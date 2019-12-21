type Config = {
  apiKey: string
  authDomain: string
  databaseURL: string
  projectID: string
  storageBucket: string
  messagingSenderId: string
}

const config: Config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectID: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID
}

export default config
