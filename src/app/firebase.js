import firebase from 'firebase';





const firebaseConfig = {
    apiKey: "AIzaSyDDlW60JOY2ZKbmlZCN132FsxvbH5M6XXQ",
    authDomain: "snapchat-clone-f9496.firebaseapp.com",
    projectId: "snapchat-clone-f9496",
    storageBucket: "snapchat-clone-f9496.appspot.com",
    messagingSenderId: "69962979993",
    appId: "1:69962979993:web:0ab482b151b3d60eecb608"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();  
  const provider = new firebase.auth.GoogleAuthProvider();

  export {db,auth,storage,provider}