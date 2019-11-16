import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBIbNKbPgEhAiJvWJTSn_scgxSyfqWGkG4",
    authDomain: "foodbuff-9f6a1.firebaseapp.com",
    databaseURL: "https://foodbuff-9f6a1.firebaseio.com",
    projectId: "foodbuff-9f6a1",
    storageBucket: "foodbuff-9f6a1.appspot.com",
    messagingSenderId: "538905388278",
    appId: "1:538905388278:web:07488319ef4a5652ca38d7"
};

firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;