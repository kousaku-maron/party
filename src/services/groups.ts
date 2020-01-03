import { useEffect, useState } from 'react'
import { User, Group, Member, buildGroup, UpdateGroup } from '../entities'
import { useAuthState } from '../store/hooks'
import firebase from '../repositories/firebase'
import { updateGroup, createGroup, createGroupMembers } from '../repositories/groups'
import {
  showEntryPartyApplySunccessMessage,
  showEntryPartyApplyFailurMessage,
  showEntryPartyAlreadyApplied
} from '../services/flashCard'
import _ from 'lodash'

const db = firebase.firestore()
const partiesRef = db.collection('parties')

//MEMO: userGroupsだけど，groupIDsも返すのは例外じゃないか相談
export const useGroups = (partyID: string) => {
  const [groups, setGroups] = useState<Group[]>()
  const [groupIDs, setgroupIDs] = useState<string[]>()
  const auth = useAuthState()
  const { user } = auth

  useEffect(() => {
    const groupsRef = partiesRef.doc(partyID).collection('groups')
    if (!user) return
    const unsubscribe = groupsRef.where('enabled', '==', true).onSnapshot(snapShot => {
      const newGroups: Group[] = snapShot.docs.map(doc => {
        return buildGroup(doc.data())
      })
      const newGroupIDs: string[] = snapShot.docs.map(doc => {
        return doc.id
      })

      setGroups(newGroups)
      setgroupIDs(newGroupIDs)
    })

    return () => {
      unsubscribe()
    }
  }, [partyID, user])

  return { groupIDs, groups }
}

export const onApplyGroup = async (uid: string, partyID: string, groupID: string, group: Group) => {
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
    appliedUIDs: _.uniq([...group.appliedUIDs, uid])
  }
  try {
    await updateGroup(partyID, groupID, _updateGroup)
    showEntryPartyApplySunccessMessage()
  } catch (e) {
    showEntryPartyApplyFailurMessage()
    console.warn(e)
  }
}

export const entryGroupMembers = async (partyID: string, organizer: User, members: Member[]) => {
  if (!members || !partyID) return
  //TODO: 関数作ったほうが良いのか？
  const group: Group = {
    organizerUID: organizer.uid,
    organizerName: organizer.name,
    organizerGender: organizer.gender,
    thumbnailURL: organizer.thumbnailURL,
    enabled: organizer.enabled,
    appliedUIDs: []
  }

  try {
    const { result, groupID } = await createGroup(partyID, group)
    if (result === false && !groupID) {
      showEntryPartyApplyFailurMessage()
      return
    }
    await createGroupMembers(partyID, groupID, members)
    showEntryPartyApplySunccessMessage()
  } catch (e) {
    showEntryPartyApplyFailurMessage()
    console.warn(e)
  }
}
