import { useEffect, useState, useCallback } from 'react'
import { InteractionManager } from 'react-native'
import { User, CreateUser, Group, buildGroup, UpdateGroup, CreateGroup } from '../entities'
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

export const useGroup = (partyID: string, groupID: string) => {
  const [group, setGroup] = useState<Group>()
  const auth = useAuthState()
  const { user } = auth

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      const groupsRef = partiesRef.doc(partyID).collection('groups')
      if (!user) return
      const unsubscribe = groupsRef.doc(groupID).onSnapshot((doc: firebase.firestore.DocumentSnapshot) => {
        const newGroup = buildGroup(doc.id, doc.data())
        setGroup(newGroup)
      })
      return () => {
        unsubscribe()
      }
    })
  }, [groupID, partyID, user])

  return group
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
      const { organizerUID, organizer, thumbnailURL } = group
      const pickedGroup = { organizerUID, organizer, thumbnailURL }

      const _updateGroup: UpdateGroup = {
        ...pickedGroup,
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
    const setMembers: CreateUser[] = members.map(member => {
      const { id, ...others } = member// eslint-disable-line
      const omittedMember = { ...others }
      const setMember: CreateUser = {
        ...omittedMember
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
