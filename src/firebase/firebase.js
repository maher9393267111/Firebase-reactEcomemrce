
import firebase from 'firebase'

const firebaseConfig =  firebase.initializeApp({
  apiKey: "AIzaSyBeuDqtel2Vhwn0oGphyuFYbgvrE6FJQgQ",
  authDomain: "mern-projec.firebaseapp.com",
  projectId: "mern-projec",
  storageBucket: "mern-projec.appspot.com",
  messagingSenderId: "760297962433",
  appId: "1:760297962433:web:80adf7f5d905f76ace8d40"
});

// Initialize Firebase
const db = firebaseConfig.firestore()

const auth = firebase.auth()

const storage = firebase.storage();
export { db, auth,storage }