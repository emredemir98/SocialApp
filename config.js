import * as firebase from "firebase";
let config = {
    apiKey: "AIzaSyBgb22s_uKDhI_yy8Rcqbom2tx34SIoJUc",
    authDomain: "socialapp-1dd81.firebaseapp.com",
    databaseURL: "https://socialapp-1dd81-default-rtdb.firebaseio.com",
    projectId: "socialapp-1dd81",
    storageBucket: "socialapp-1dd81.appspot.com",
    messagingSenderId: "466183973203",
    appId: "1:466183973203:web:942b1bb77a13322ae319a6",
    measurementId: "G-3L31X4M9BG"
}
if(!firebase.apps.length){
firebase.initializeApp(config);
}
export default firebase;
