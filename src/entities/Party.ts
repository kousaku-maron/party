// TODO: uid -> partyIDに変更する。
export type Party = {
  id: string
  name: string
  thumbnailURL?: string
  enabled: boolean
  date: Date
}

export const buildParty = (id: string, data: firebase.firestore.DocumentData) => {
  const newParty = {
    id,
    name: data.name,
    thumbnailURL: data.thumbnailURL,
    enabled: data.enabled,
    date: data.date
  }
  return newParty
}

export type EntryParty = Pick<Party, 'uid'> & {
  userUIDs: string[]
  organizerUID: string
}
