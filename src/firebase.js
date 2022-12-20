import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA4QPT8XlIwBKIe6dixZST1gayc_tMsHQY",
    authDomain: "fir-c1640.firebaseapp.com",
    projectId: "fir-c1640",
    storageBucket: "fir-c1640.appspot.com",
    messagingSenderId: "243093809693",
    appId: "1:243093809693:web:94b54e7b9b073bc513b4f4",
    measurementId: "G-CXJ0ECKTDS"
};

const firebaseapp = firebase.initializeApp(firebaseConfig)

const db = firebaseapp.firestore()

const auth = firebaseapp.auth()

export {db, auth}
