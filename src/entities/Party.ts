// TODO: uid -> partyIDに変更する。
export type Party = {
  uid: string
  name: string
  thumbnailURL?: string
}

export const buildParty = (data: firebase.firestore.DocumentData) => {
  const newParty = {
    uid: data.uid,
    name: data.name,
    thumbnailURL: data.thumbnailURL
  }
  return newParty
}

export type EntryParty = Pick<Party, 'uid'> & {
  userUIDs: string[]
  organizerUID: string
}
