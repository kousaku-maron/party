import React, { useEffect } from 'react'
import { useAuthState, useAuthActions } from './hooks'
import { db } from '../repositories/firebase'
import { buildUser } from '../entities'

const usersRef = db.collection('users')

const AuthRequiredEffectProvider: React.FC<{}> = ({ children }) => {
  const { uid } = useAuthState()
  const { setUser } = useAuthActions()

  // MEMO: ログイン中のユーザーデータ取得
  useEffect(() => {
    if (!uid) return
    const unsubscribe = usersRef.doc(uid).onSnapshot(
      (doc: firebase.firestore.DocumentSnapshot) => {
        if (!doc.exists) return null
        const user = buildUser(doc.id, doc.data())
        setUser(user)
      },
      (e: Error) => {
        console.warn(e)
      }
    )

    return () => {
      unsubscribe()
    }
  }, [setUser, uid])

  return <React.Fragment>{children}</React.Fragment>
}

export default AuthRequiredEffectProvider
