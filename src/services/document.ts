import firebase from '../repositories/firebase'

export const createDocument = <T>(document: T) => {
  return {
    ...document,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  }
}

export const updateDocument = <T>(document: T) => {
  return {
    ...document,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  }
}
