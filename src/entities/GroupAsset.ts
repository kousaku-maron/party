import { Group, buildGroup } from './Group'

export type GroupAsset = {
  id: string
  groupID: string
  group: Group
}

export const buildGroupAsset = (id: string, data: firebase.firestore.DocumentData) => {
  const newGroupAsset: GroupAsset = {
    id,
    groupID: data.groupID,
    group: buildGroup(data.group.id, data.group)
  }

  return newGroupAsset
}

export type CreateGroupAsset = Omit<GroupAsset, 'id'>
