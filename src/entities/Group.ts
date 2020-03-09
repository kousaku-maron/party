import { User } from './User'

export type Group = {
  id: string
  organizerUID: string
  organizer: User
  thumbnailURL?: string
  enabled: boolean
  appliedUIDs: string[]
}

export const buildGroup = (id: string, data: firebase.firestore.DocumentData) => {
  const newGroup = {
    id,
    organizerUID: data.organizerUID,
    organizer: data.organizer,
    ...(data.thumbnailURL && { thumbnailURL: data.thumbnailURL }),
    enabled: data.enabled,
    appliedUIDs: data.appliedUIDs
  }
  return newGroup
}

export type UpdateGroup = Pick<Group, 'organizerUID' | 'organizer' | 'thumbnailURL' | 'appliedUIDs'>
export type CreateGroup = Omit<Group, 'id'>
