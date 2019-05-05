import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAevY5_jmNdxtNKMjayZAXcWop08RZqKKA",
    authDomain: "aws-laf.firebaseapp.com",
    databaseURL: "https://aws-laf.firebaseio.com",
    projectId: "aws-laf",
    storageBucket: "aws-laf.appspot.com",
    messagingSenderId: "497812657390",
    appId: "1:497812657390:web:479b8c775152dd8a"
};

firebase.initializeApp(config);

export default firebase;