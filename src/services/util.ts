import firebase from '../repositories/firebase'

// MEMO: https://qiita.com/hiko1129/items/9de868bec465d725f90b
export const getRandomID = () => {
  const db = firebase.firestore()
  return db.collection('hoge').doc().id
}
