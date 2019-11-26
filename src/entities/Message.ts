import { QuickReplies } from 'react-native-gifted-chat'

// same User type
export type MessageUser = {
  enabled: boolean
  isAccepted: boolean
  isAnonymous: boolean
  uid: string
  userID: string
  name: string
  thumbnailURL?: string
  gender?: string
}

export type Message = {
  id: string
  text: string
  createdAt: Date
  imageURL?: string
  videoURL?: string
  user?: MessageUser
  system: boolean
  quickReplies?: QuickReplies
}

export const buildMessage = (id: string, data: firebase.firestore.DocumentData) => {
  const newMessage = {
    id,
    text: data.text,
    createdAt: data.createdAt.toDate(),
    imageURL: data.imageURL,
    videoURL: data.videoURL,
    user: data.user,
    system: data.system,
    quickReplies: data.quickReplies
  }
  return newMessage
}

export type CreateMessage = Pick<Message, 'text' | 'user' | 'system' | 'quickReplies' | 'imageURL' | 'videoURL'>

export type UpdateMessage = Pick<Message, 'user'>

export const systemUser: MessageUser = {
  enabled: true,
  isAccepted: true,
  isAnonymous: false,
  uid: 'admin',
  userID: 'admin',
  name: 'マスター',
  thumbnailURL:
    'https://firebasestorage.googleapis.com/v0/b/insta-693eb.appspot.com/o/users%2Fadmin%2Ftotoro.jpeg?alt=media&token=4b228602-74cb-40fa-90c2-ad0a8c32c671',
  gender: 'male'
}
