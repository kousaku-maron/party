import { useEffect, useState } from 'react'
import { User, Group, buildGroup, UpdateGroup } from '../entities'
import { useAuthState } from '../store/hooks'
import firebase from '../repositories/firebase'
import { updateGroup, createGroup, createGroupMembers } from '../repositories/groups'
import {
  showEntryPartyApplySunccessMessage,
  showEntryPartyApplyFailurMessage,
  showEntryPartyAlreadyApplied
} from '../services/flashCard'
import { getRandomID } from '../services/util'

const db = firebase.firestore()
const partiesRef = db.collection('parties')

export const useGroups = (partyID: string) => {
  const [groups, setGroups] = useState<Group[]>()
  const auth = useAuthState()
  const { user } = auth

  useEffect(() => {
    const groupsRef = partiesRef.doc(partyID).collection('groups')
    if (!user) return
    const unsubscribe = groupsRef.where('enabled', '==', true).onSnapshot(snapShot => {
      const newGroups: Group[] = snapShot.docs.map(doc => {
        return buildGroup(doc.id, doc.data())
      })
      setGroups(newGroups)
    })

    return () => {
      unsubscribe()
    }
  }, [partyID, user])

  return groups
}

export const onApplyGroup = async (partyID: string, groupID: string, group: Group, uid: string) => {
  //MEMO: OrganizerをUserとしている
  const goupAppliedUIDs = group.appliedUIDs
  const isAppliedGroup = goupAppliedUIDs.includes(uid)
  if (isAppliedGroup === true) {
    showEntryPartyAlreadyApplied()
    return
  }

  group.appliedUIDs.push(uid)
  const _updateGroup: UpdateGroup = {
    organizerUID: group.organizerUID,
    organizerName: group.organizerName,
    thumbnailURL: group.thumbnailURL,
    appliedUIDs: group.appliedUIDs
  }
  try {
    await updateGroup(partyID, groupID, _updateGroup)
    showEntryPartyApplySunccessMessage()
  } catch (e) {
    showEntryPartyApplyFailurMessage()
    console.warn(e)
  }
}

export const entryGroupMembers = async (organizer: User, members: User[], partyID: string) => {
  if (!members || !partyID) return
  const groupID = getRandomID()

  try {
    await createGroup(organizer, partyID, groupID)
    await createGroupMembers(members, partyID, groupID)
    showEntryPartyApplySunccessMessage()
  } catch (e) {
    showEntryPartyApplyFailurMessage()
    console.warn(e)
  }
}
