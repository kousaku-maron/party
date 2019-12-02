import { useEffect, useState, useMemo, useCallback } from 'react'
import firebase from '../repositories/firebase'
import { buildMessage, Message, CreateMessage, systemUser } from '../entities'
import { setMessage } from '../repositories/message'
import { IMessage, Reply } from 'react-native-gifted-chat'
import { useAuthState } from '../store/auth'
import _ from 'lodash'

const db = firebase.firestore()

// MEMO: messagesの保存場所を一時的にparty直下にしている。
const roomsRef = db.collection('parties')
const getMessagesRef = (roomID: string) => {
  return roomsRef.doc(roomID).collection('messages')
}

export const useMessages = (roomID: string) => {
  const [messages, setMessages] = useState<Message[]>()

  useEffect(() => {
    const messagesRef = getMessagesRef(roomID).orderBy('createdAt', 'desc')

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
      },
      error: (error: Error) => {
        console.warn(error)
      },
      complete: () => {
        // console.info('complete messages onSnaoshot.')
      }
    })

    return () => {
      unsubscribe()
    }
  }, [roomID])

  return messages
}

export const useGiftedChatTools = (roomID: string) => {
  const messages = useMessages(roomID)
  const { user } = useAuthState()
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const defaultAvatar = require('../../assets/images/no_user.png')

  const iMessages: IMessage[] = useMemo(() => {
    if (_.isEmpty(messages)) return []
    return messages.map(message => {
      const user = message.user

      const iMessage: IMessage = {
        _id: message.id,
        text: message.text,
        createdAt: message.createdAt,
        system: message.user ? false : message.system, // systemがtrueだとアバター表示が面倒なため、userデータがあるメッセージはfalseにしている。
        user: {
          _id: user.uid,
          name: user.name,
          avatar: user.thumbnailURL || defaultAvatar
        },
        quickReplies: message.quickReplies,
        image: message.imageURL,
        video: message.videoURL
      }
      return iMessage
    })
  }, [defaultAvatar, messages])

  const onSend = useCallback(
    (iMessages: IMessage[]) => {
      const iMessage = iMessages.slice(-1)[0]

      const newMessage: CreateMessage = {
        text: iMessage.text,
        user,
        writerUID: user.uid,
        system: false
      }

      setMessage(roomID, newMessage)
    },
    [roomID, user]
  )

  const onSystemSend = useCallback(
    (iMessages: IMessage[]) => {
      const iMessage = iMessages.slice(-1)[0]

      const newMessage: CreateMessage = {
        text: iMessage.text,
        user: systemUser,
        writerUID: systemUser.uid,
        system: true
      }

      setMessage(roomID, newMessage)
    },
    [roomID]
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onQuickReply = useCallback((replies: Reply[]) => {
    // reply process
    console.info(replies)
  }, [])

  const onPressActionButton = useCallback(() => {
    // select image and video process
    console.info('onPressActionButton')
  }, [])

  return { messages: iMessages, onSend, onSystemSend, onQuickReply, onPressActionButton }
}
