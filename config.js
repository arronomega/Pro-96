import firebase from 'firebase';
require('@firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyDVCDRbwwtdL0YMy6eQ2FlvDEDIzeq89Uc",
  authDomain: "storyapp-a6177.firebaseapp.com",
  databaseURL: "https://storyapp-a6177-default-rtdb.firebaseio.com",
  projectId: "storyapp-a6177",
  storageBucket: "storyapp-a6177.appspot.com",
  messagingSenderId: "934955587784",
  appId: "1:934955587784:web:9dfcfd4f3773d256f66dfd"
};
  // Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase.firestore();
