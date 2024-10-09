// firebase.js
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD6hwiBySuFVvcuefZRFYKym9hv1gp96qA",
  authDomain: "rishijobchat.firebaseapp.com",
  projectId: "rishijobchat",
  storageBucket: "rishijobchat.appspot.com",
  messagingSenderId: "797178926607",
  appId: "1:797178926607:web:be1ee81a8c5c87e938757a",
  measurementId: "G-LFH5GDDFCY"
};

// Check if Firebase is already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firestore };
