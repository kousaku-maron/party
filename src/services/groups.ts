import { useEffect, useState } from 'react'
import { InteractionManager } from 'react-native'
import { User, Group, buildGroup, UpdateGroup, CreateGroup } from '../entities'
import { useAuthState } from '../store/hooks'
import firebase from '../repositories/firebase'
import { updateGroup, createGroup, createGroupMembers } from '../repositories/groups'
import {
  showEntryPartyApplySunccessMessage,
  showEntryPartyApplyFailurMessage,
  showEntryPartyAlreadyApplied,
  showCreatePartyGroupSunccessMessage,
  showCreatePartyGroupFailurMessage
} from '../services/flashCard'
import _ from 'lodash'

const db = firebase.firestore()
const partiesRef = db.collection('parties')

export const useGroups = (partyID: string) => {
  const [groups, setGroups] = useState<Group[]>()
  const auth = useAuthState()
  const { user } = auth

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
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
    })
  }, [partyID, user])

  return groups
}

export const onApplyGroup = async (uid: string, partyID: string, groupID: string, group: Group) => {
  const goupAppliedUIDs = group.appliedUIDs
  const isAppliedGroup = goupAppliedUIDs.includes(uid)
  if (isAppliedGroup === true) {
    showEntryPartyAlreadyApplied()
    return
  }

  const _updateGroup: UpdateGroup = {
    organizerUID: group.organizerUID,
    organizerName: group.organizerName,
    thumbnailURL: group.thumbnailURL,
    appliedUIDs: _.uniq([...group.appliedUIDs, uid])
  }
  try {
    await updateGroup(partyID, groupID, _updateGroup)
  } catch (e) {
    showEntryPartyApplyFailurMessage()
    console.warn(e)
  }
  showEntryPartyApplySunccessMessage()
}

export const onCreateGroup = async (partyID: string, group: CreateGroup, members: User[]) => {
  try {
    const setMembers: User[] = members.map(member => {
      const setMember: User = {
        uid: member.uid,
        userID: member.userID,
        enabled: member.enabled,
        isAccepted: member.isAccepted,
        isAnonymous: member.isAnonymous,
        name: member.name,
        gender: member.gender,
        thumbnailURL: member.thumbnailURL ?? 'null'
      }
      return setMember
    })
    const { result: resultCreateGroup, groupID } = await createGroup(partyID, group)
    const { result: resultCreateGroupMembers } = await createGroupMembers(partyID, groupID, setMembers)

    if (!resultCreateGroupMembers && !resultCreateGroup) {
      showCreatePartyGroupFailurMessage()
      return
    }
  } catch (e) {
    showCreatePartyGroupFailurMessage()
    console.warn(e)
  }
  showCreatePartyGroupSunccessMessage()
}
