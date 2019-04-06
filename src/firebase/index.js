import firebase from 'firebase/app';
import 'firebase/storage';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBFJTBYeS5yVe_qX7pXel1YR_O6rMNw-Vo",
    authDomain: "firebasics-79e59.firebaseapp.com",
    databaseURL: "https://firebasics-79e59.firebaseio.com",
    projectId: "firebasics-79e59",
    storageBucket: "firebasics-79e59.appspot.com",
    messagingSenderId: "511670353506"
  };
  firebase.initializeApp(config);

  const storage = firebase.storage();

  export {
      storage, firebase as default
  }