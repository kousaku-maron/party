import { User } from './User'

export type Party = {
  id: string
  type: string
  name: string
  thumbnailURL?: string
  enabled: boolean
  date: Date
  entryUIDs?: string[]
  tags?: string[]
  users?: User[]
}

export const buildParty = (id: string, data: firebase.firestore.DocumentData) => {
  const newParty = {
    id,
    type: data.type,
    name: data.name,
    ...(data.thumbnailURL && { thumbnailURL: data.thumbnailURL }),
    enabled: data.enabled,
    date: data.date.toDate(),
    ...(data.entryUIDs && { entryUIDs: data.entryUIDs }),
    ...(data.tags && { tags: data.tags }),
    ...(data.users && { users: data.users })
  }
  return newParty
}
