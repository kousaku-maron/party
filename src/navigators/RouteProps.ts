export type RouteParams = {
  Chat: { roomID: string }
  GroupDetail: {
    partyID: string
    groupID: string
  }
  PartyDetail: {
    partyID: string
  }
  PartyGroups: {
    partyID: string
  }
  PartyMake: {
    partyID: string
  }
  User: {
    userID?: string
  }
  SwipeCard: {
    type: string
  }
}
