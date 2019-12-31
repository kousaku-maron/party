import { db } from './firebase'
import { buildGroup, UpdateGroup, updateDocument } from '../entities'
const partiesRef = db.collection('parties')

export const getGroup = async (partyID: string, groupUID: string) => {
  try {
    const snapShot = await partiesRef
      .doc(partyID)
      .collection('groups')
      .doc(groupUID)
      .get()
    const group = buildGroup(snapShot.id, snapShot.data())
    return group
  } catch (e) {
    console.warn(e)
    return null
  }
}

export const setGroup = async (partyID: string, group: UpdateGroup) => {
  try {
    const batch = db.batch()
    batch.set(
      partiesRef
        .doc(partyID)
        .collection('groups')
        .doc(group.uid),
      updateDocument<UpdateGroup>({
        uid: group.uid,
        organizerID: group.organizerID,
        organizerName: group.organizerName,
        thumbnailURL: group.thumbnailURL,
        appliedUIDs: group.appliedUIDs
      }),
      { merge: true }
    )
    await batch.commit()
  } catch (e) {
    console.warn(e)
    return { result: false }
  }
}
