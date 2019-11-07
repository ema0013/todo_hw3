import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyBgcr7gUpMy8vDTmPKFsVU57RVrH6V1Ez0",
    authDomain: "todo-hw3-67bb9.firebaseapp.com",
    databaseURL: "https://todo-hw3-67bb9.firebaseio.com",
    projectId: "todo-hw3-67bb9",
    storageBucket: "todo-hw3-67bb9.appspot.com",
    messagingSenderId: "841771918967",
    appId: "1:841771918967:web:7db78b749d2c60ddef0872",
    measurementId: "G-Z4RVDQM7GJ"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;