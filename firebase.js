import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAiJJdYZaEB-A19tnJqflJ7wA8fSjY-Eec",
  authDomain: "amazn-clone-d84ec.firebaseapp.com",
  projectId: "amazn-clone-d84ec",
  storageBucket: "amazn-clone-d84ec.appspot.com",
  messagingSenderId: "852366851655",
  appId: "1:852366851655:web:1371b90bbd3c2c77a97b62"
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

const db = app.firestore();

export default db;