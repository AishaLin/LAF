import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyARPRDmL9If51EIVYKeeaWSjpD9KKJMSo8",
    authDomain: "omwh-73168.firebaseapp.com",
    databaseURL: "https://omwh-73168.firebaseio.com",
    projectId: "omwh-73168",
    storageBucket: "omwh-73168.appspot.com",
    messagingSenderId: "946734734853"
};

firebase.initializeApp(config);

export default firebase;