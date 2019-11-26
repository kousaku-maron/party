import { useEffect, useState, useMemo, useCallback } from 'react'
import firebase from '../repositories/firebase'
import { buildMessage, Message, CreateMessage } from '../entities'
import { getUser } from '../repositories/user'
import { createMessage } from '../repositories/message'
import { User } from '../entities'
import { IMessage } from 'react-native-gifted-chat'
import { useAuthState } from '../store/auth'
import _ from 'lodash'

const db = firebase.firestore()
const partiesRef = db.collection('parties')
const getMessagesRef = (partyID: string) => {
  return partiesRef.doc(partyID).collection('messages')
}

export const useMessages = (partyID: string) => {
  const [messages, setMessages] = useState<Message[]>()

  useEffect(() => {
    const messagesRef = getMessagesRef(partyID).orderBy('createdAt', 'desc')

    const unsubscribe = messagesRef.onSnapshot({
      next: (snapshot: firebase.firestore.QuerySnapshot) => {
        const messages = snapshot.docs
          .filter(doc => doc.data().createdAt) // message送信後、一瞬createdAtがnullになるのでフィルタで弾く。
          .map(doc => {
            const message = buildMessage(doc.id, doc.data())
            return message
          })
        setMessages(messages)
      },
      error: (error: Error) => {
        console.warn(error)
      },
      complete: () => {
        console.info('complete messages onSnaoshot.')
      }
    })

    return () => {
      unsubscribe()
    }
  }, [partyID])

  return messages
}

export const useGiftedhatTools = (partyID: string, roomUserUIDs: string[]) => {
  const messages = useMessages(partyID)
  const { uid } = useAuthState()

  const userDic: { [uid: string]: User } = useMemo(() => {
    const domain = {}
    roomUserUIDs.map(uid => {
      const user = getUser(uid)
      domain[uid] = user
    })

    return domain
  }, [roomUserUIDs])

  const iMessages: IMessage[] = useMemo(() => {
    if (_.isEmpty(messages)) return []
    return messages.map(message => {
      const user = userDic[message.writerUID]

      const iMessage: IMessage = {
        _id: message.id,
        text: message.text,
        createdAt: message.createdAt,
        user: {
          _id: user.uid,
          name: user.name,
          avatar: user.thumbnailURL
        },
        image: message.imageURL,
        video: message.videoURL
      }
      return iMessage
    })
  }, [messages, userDic])

  const onSend = useCallback(
    (iMessages: IMessage[]) => {
      const iMessage = iMessages.slice(-1)[0]
      const newMessage: CreateMessage = {
        text: iMessage.text,
        writerUID: uid
      }

      createMessage(partyID, newMessage)
    },
    [partyID, uid]
  )

  return { messages: iMessages, onSend }
}
