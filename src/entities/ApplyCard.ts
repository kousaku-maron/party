import { User, buildUser } from './User'
import { Party, buildParty } from './Party'

export type ApplyCard = {
  id: string
  type: string
  partyID: string
  groupID: string
  organizerUID: string
  members: User[]
  party: Party
}

export const buildApplyCard = (id: string, data: firebase.firestore.DocumentData) => {
  const newApplyCard: ApplyCard = {
    id,
    type: data.type,
    partyID: data.partyID,
    groupID: data.groupID,
    organizerUID: data.organizerUID,
    members: data.members.map(member => buildUser(member.id, member)),
    party: buildParty(data.party.id, data.party)
  }

  return newApplyCard
}
