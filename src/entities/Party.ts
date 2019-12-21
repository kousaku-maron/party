export type Party = {
  id: string
  name: string
  thumbnailURL?: string
  enabled: boolean
  date: Date
  entryUIDs?: string[] // 一時的にパラメーター設置。
}

export const buildParty = (id: string, data: firebase.firestore.DocumentData) => {
  const newParty = {
    id,
    name: data.name,
    thumbnailURL: data.thumbnailURL,
    enabled: data.enabled,
    date: data.date.toDate(),
    entryUIDs: data.entryUIDs
  }
  return newParty
}

export type EntryParty = Pick<Party, 'id'> & {
  userUIDs: string[]
  organizerUID: string
}

export type UpdateParty = Pick<Party, 'name' | 'thumbnailURL'> & { partyID?: string }
