import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCyoj3O4NY4xuAE76bZLvOCQuhIuFmcPv4",
    authDomain: "smarted-db.firebaseapp.com",
    databaseURL: "https://smarted-db.firebaseio.com",
    projectId: "smarted-db",
    storageBucket: "smarted-db.appspot.com",
    messagingSenderId: "307834846762",
    appId: "1:307834846762:web:11a23c956e587b73f98d53"
  };

  firebase.initializeApp(config);

  


export default firebase;









/*import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";


var firebaseConfig = {
    apiKey: "AIzaSyDjPbUehYbcgDAyyycElq9ckclEtk0P7dw",
    authDomain: "react-slack-clone-f774f.firebaseapp.com",
    databaseURL: "https://react-slack-clone-f774f.firebaseio.com",
    projectId: "react-slack-clone-f774f",
    storageBucket: "react-slack-clone-f774f.appspot.com",
    messagingSenderId: "277538191583",
    appId: "1:277538191583:web:6a347d5187f68c89"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  export default firebase;*/