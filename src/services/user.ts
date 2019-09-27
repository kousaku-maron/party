import { useEffect, useState } from 'react'
import firebase from '../repositories/firebase'
import { buildUser, User } from '../entities'

const db = firebase.firestore()
const usersRef = db.collection('users')

export const useUser = (uid: string) => {
  const [user, setUser] = useState<User>(null)

  useEffect(() => {
    const userRef = usersRef.doc(uid)
    const unsubscribe = userRef.onSnapshot((doc: firebase.firestore.DocumentSnapshot) => {
      const user = buildUser(doc.data())
      setUser(user)
    })
    return () => {
      unsubscribe()
    }
  }, [uid])

  return user
}
