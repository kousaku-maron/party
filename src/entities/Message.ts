export type Message = {
  id: string
  text: string
  createdAt: Date
  writerUID: string
  imageURL?: string
  videoURL?: string
}

export const buildMessage = (id: string, data: firebase.firestore.DocumentData) => {
  const newMessage = {
    id,
    text: data.text,
    createdAt: data.createdAt.toDate(),
    writerUID: data.writerUID,
    imageURL: data.imageURL,
    videoURL: data.videoURL
  }
  return newMessage
}

export type CreateMessage = Pick<Message, 'text' | 'writerUID' | 'imageURL' | 'videoURL'>
