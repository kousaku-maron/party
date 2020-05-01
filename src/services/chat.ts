import { useEffect, useCallback, useState } from 'react'
import { InteractionManager } from 'react-native'
import firebase from '../repositories/firebase'
import { buildMessage, Message, CreateMessage } from '../entities'
import { setMessage } from '../repositories/message'
import { useAuthState } from '../store/hooks'

const db = firebase.firestore()

const roomsRef = db.collection('rooms')
const getMessagesRef = (roomID: string) => {
  return roomsRef.doc(roomID).collection('messages')
}

export const useSendMessage = (roomID: string) => {
  const { user, uid } = useAuthState()

  const onSend = useCallback(
    (text: string) => {
      const newMessage: CreateMessage = {
        text,
        user,
        writerUID: uid,
        system: false,
        notified: false
      }

      setMessage(roomID, newMessage)
    },
    [roomID, uid, user]
  )

  return { onSend }
}

export const useMessages = (roomID: string) => {
  const [fetching, setFetching] = useState<boolean>(true)
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      const messagesRef = getMessagesRef(roomID).orderBy('createdAt', 'asc')

      // MEMO: DEMO時に暴れて、アクセス制限かけられるほど投稿されると困るので、最新の30メッセージのみ取得する仕様にしている。
      const unsubscribe = messagesRef.limit(30).onSnapshot({
        next: (snapshot: firebase.firestore.QuerySnapshot) => {
          const messages = snapshot.docs
            .filter(doc => doc.data().createdAt) // message送信後、一瞬createdAtがnullになるのでフィルタで弾く。
            .filter(doc => doc.data().enabled ?? true) // enabledの項目がない場合も考慮して、フィルタリングさせている。
            .map(doc => {
              const message = buildMessage(doc.id, doc.data())
              return message
            })
          setMessages(messages)
          setFetching(false)
        },
        error: (error: Error) => {
          console.info('catch useMessages error', error)
        },
        complete: () => {
          // console.info('complete messages onSnaoshot.')
        }
      })

      return () => {
        unsubscribe()
      }
    })
  }, [roomID])

  return { fetching, messages }
}
