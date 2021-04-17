import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCzxZaYYURUW8hpXGCEN87t8lhsUvar4NU",
    authDomain: "todoapp1107.firebaseapp.com",
    projectId: "todoapp1107",
    storageBucket: "todoapp1107.appspot.com",
    messagingSenderId: "911806648348",
    appId: "1:911806648348:web:3f91e5a6628a8f62110fd9",
    measurementId: "G-7TDFBW9G08"
  });

const db = firebaseApp.firestore();

export default db;