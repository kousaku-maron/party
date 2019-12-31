import { useEffect, useState } from 'react'
import { Group, buildGroup, UpdateGroup } from '../entities'
import { useAuthState } from '../store/hooks'
import firebase from '../repositories/firebase'
import { setGroup } from '../repositories/groups'
import {
  showEntryPartyApplySunccessMessage,
  showEntryPartyApplyFailurMessage,
  showEntryPartyAlreadyApplied
} from '../services/flashCard'

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

export const onApplyGroup = async (partyID: string, group: Group, userUID: string) => {
  //MEMO: OrganizerをUserとしている
  const goupAppliedUIDs = group.appliedUIDs
  const isAppliedGroup = goupAppliedUIDs.includes(userUID)
  if (isAppliedGroup === true) {
    showEntryPartyAlreadyApplied()
    return
  }

  group.appliedUIDs.push(userUID)
  const updateGroup: UpdateGroup = {
    uid: group.uid,
    organizerID: group.organizerID,
    organizerName: group.organizerName,
    thumbnailURL: group.thumbnailURL,
    appliedUIDs: group.appliedUIDs
  }

  try {
    setGroup(partyID, updateGroup)
    showEntryPartyApplySunccessMessage()
  } catch (e) {
    showEntryPartyApplyFailurMessage()
    console.warn(e)
  }
}
