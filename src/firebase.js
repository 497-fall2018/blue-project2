import firebase from 'firebase'
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAXh8LjJ84jE_70xEXtC1xNUa7TnPmX0MA",
    authDomain: "dj-prudo.firebaseapp.com",
    databaseURL: "https://dj-prudo.firebaseio.com",
    projectId: "dj-prudo",
    storageBucket: "",
    messagingSenderId: "581616322169"
  };
  firebase.initializeApp(config);
  export default firebase;