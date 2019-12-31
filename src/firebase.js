import firebase from 'firebase'

const firebaseConfig = {

};

firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const database = firebase.database();

export default firebase;
