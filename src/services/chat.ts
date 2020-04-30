import { useEffect, useState, useMemo, useCallback } from 'react'
import { InteractionManager } from 'react-native'
import firebase, { functions } from '../repositories/firebase'
import { buildMessage, Message, CreateMessage, systemUser } from '../entities'
import { setMessage } from '../repositories/message'
import { showQuickRepliedSuccessMessage } from '../services/flashCard'
import { IMessage, Reply } from 'react-native-gifted-chat'
import { useAuthState } from '../store/hooks'
import _ from 'lodash'

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
        system: user ? false : message.system,
        user: {
          _id: user.uid,
          name: user.name,
          avatar: user.thumbnailURL ?? defaultAvatar
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
        user: {
          ...user,
          gender: user.gender ?? null,
          thumbnailURL: user.thumbnailURL ?? null
        },
        writerUID: user.uid,
        system: false,
        notified: false
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
        system: true,
        notified: false
      }

      setMessage(roomID, newMessage)
    },
    [roomID]
  )

  const onQuickReply = useCallback(
    async (replies: Reply[]) => {
      if (replies.length === 0) return
      await functions.httpsCallable('onQuickReplyEvents')({
        gender: user.gender ?? 'female', // DEMO時の保険でfemaleをデフォルト値にしている。
        roomID,
        replies,
        replyType: 'positive',
        eventType: 'nizikai'
      })
      showQuickRepliedSuccessMessage()
    },
    [roomID, user.gender]
  )

  const onPressActionButton = useCallback(() => {
    // select image and video process
    console.info('onPressActionButton')
  }, [])

  return { messages: iMessages, onSend, onSystemSend, onQuickReply, onPressActionButton }
}
