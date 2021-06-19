
  import firebase from "firebase";
  import "firebase/firestore";
  
  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDsKHLvPNaYf3-TR1i5ij9kBXbe15JXvv0",
    authDomain: "todo-app-4dff3.firebaseapp.com",
    projectId: "todo-app-4dff3",
    storageBucket: "todo-app-4dff3.appspot.com",
    messagingSenderId: "926890465474",
    appId: "1:926890465474:web:4eb8489e080f41c962835b",
    measurementId: "G-GQQ9WF752E"
  });

  const db = firebaseApp.firestore();

  
  export default db;