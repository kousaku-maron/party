import { useEffect, useState, useCallback } from 'react'
import { InteractionManager } from 'react-native'
import { User, Group, buildGroup, UpdateGroup, CreateGroup } from '../entities'
import { useAuthState } from '../store/hooks'
import firebase from '../repositories/firebase'
import { updateGroup, createGroup } from '../repositories/group'
import { createMembers } from '../repositories/member'
import {
  showEntryPartyApplySunccessMessage,
  showEntryPartyApplyFailurMessage,
  showEntryPartyAlreadyAppliedMessage,
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

export const useApplyGroup = () => {
  const { uid } = useAuthState()

  const onPressApplyGroup = useCallback(
    async (partyID: string, groupID: string, group: Group) => {
      const goupAppliedUIDs = group.appliedUIDs
      const isAppliedGroup = goupAppliedUIDs.includes(uid)
      if (isAppliedGroup === true) {
        showEntryPartyAlreadyAppliedMessage()
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
    },
    [uid]
  )
  return { onPressApplyGroup }
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
        thumbnailURL: member.thumbnailURL ?? null
      }
      return setMember
    })
    const { result: resultCreateGroup, groupID } = await createGroup(partyID, group)
    const { result: resultCreateGroupMembers } = await createMembers(partyID, groupID, setMembers)

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
