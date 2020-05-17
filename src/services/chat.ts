import { useEffect, useCallback, useState, useRef } from 'react'
import { InteractionManager } from 'react-native'
import firebase from '../repositories/firebase'
import { buildMessage, Message, CreateMessage } from '../entities'
import { setMessage } from '../repositories/message'
import { useAppAuthState } from '../store/hooks'
import moment from 'moment'

const db = firebase.firestore()

const roomsRef = db.collection('rooms')
const getMessagesRef = (roomID: string) => {
  return roomsRef.doc(roomID).collection('messages')
}

export const useSendMessage = (roomID: string) => {
  const { user, uid } = useAppAuthState()

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

const per = 10

export const useMessages = (roomID: string) => {
  const [fetching, setFetching] = useState<boolean>(true)
  const [messages, setMessages] = useState<Message[]>([])
  const lastVisible = useRef<firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>>(null)

  const setLastVisible = useCallback(
    (snapshot: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>) => {
      lastVisible.current = snapshot
    },
    []
  )

  // MEMO: 初期の読み込みで表示させるメッセージの取得と、新しいメッセージを受け取った時の処理をさせている。
  useEffect(() => {
    const messagesRef = getMessagesRef(roomID).orderBy('createdAt', 'desc')

    InteractionManager.runAfterInteractions(() => {
      const unsubscribe = messagesRef.limit(per).onSnapshot({
        next: (snapshot: firebase.firestore.QuerySnapshot) => {
          const newMessages = snapshot
            .docChanges()
            .filter(change => change.type === 'added')
            .map(change => {
              // MEMO: レイテンシ補正により、createdAtが保存されるより前にデータをリッスンすることがあるため、map内で変換している。
              if (!change.doc.data().createdAt) {
                return {
                  id: change.doc.id,
                  data: {
                    ...change.doc.data(),
                    createdAt: moment()
                  }
                }
              }

              return { id: change.doc.id, data: { ...change.doc.data() } }
            })
            .map(({ id, data }) => {
              const message = buildMessage(id, data)
              return message
            })

          setMessages(prev => [...newMessages, ...prev])

          if (!lastVisible.current) {
            const newlastVisible = snapshot.docs[snapshot.docs.length - 1]
            setLastVisible(newlastVisible)
          }

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
  }, [roomID, setLastVisible])

  const onNext = useCallback(async () => {
    if (!lastVisible.current) return

    const messagesRef = getMessagesRef(roomID)
      .orderBy('createdAt', 'desc')
      .startAfter(lastVisible.current)

    const snapshot = await messagesRef.limit(per).get()
    const newMessages = snapshot.docs.map(doc => buildMessage(doc.id, doc.data()))

    setMessages(prev => [...prev, ...newMessages])

    const newlastVisible = snapshot.docs[snapshot.docs.length - 1]
    setLastVisible(newlastVisible)
  }, [roomID, setLastVisible])

  return { fetching, messages, onNext }
}
