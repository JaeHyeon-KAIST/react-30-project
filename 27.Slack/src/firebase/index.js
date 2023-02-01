// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_Firebase_apiKey,
  authDomain: "slack-clone-538d7.firebaseapp.com",
  databaseURL: "https://slack-clone-538d7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "slack-clone-538d7",
  storageBucket: "slack-clone-538d7.appspot.com",
  messagingSenderId: "3970317945",
  appId: "1:3970317945:web:78acb8b51eb5195fe8dea8"
};

// Initialize Firebase
initializeApp(firebaseConfig);