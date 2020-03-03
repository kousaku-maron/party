import { QuickReplies } from 'react-native-gifted-chat'
import { User, buildUser } from './User'

export type Message = {
  id: string
  text: string
  createdAt: Date
  imageURL?: string
  videoURL?: string
  user?: User
  writerUID?: string
  system: boolean
  quickReplies?: QuickReplies
  notified: boolean
}

export const buildMessage = (id: string, data: firebase.firestore.DocumentData) => {
  const newMessage = {
    id,
    text: data.text,
    createdAt: data.createdAt.toDate(),
    imageURL: data.imageURL,
    videoURL: data.videoURL,
    user: buildUser(data.user.id, data.user),
    writerUID: data.writerUID,
    system: data.system,
    quickReplies: data.quickReplies,
    notified: data.notified
  }
  return newMessage
}

export type CreateMessage = Pick<
  Message,
  'text' | 'user' | 'writerUID' | 'system' | 'quickReplies' | 'imageURL' | 'videoURL' | 'notified'
>

export type UpdateMessage = Pick<Message, 'user'>

// MEMO:　そろそろコレ消し去りたい...
export const systemUser: User = {
  id: 'admin', // 一時的
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
