// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { GoogleAuthProvider } from "firebase/auth";

console.log(process.env.REACT_APP_FIREBASE_API_KEY);

const firebaseConfig = {

  apiKey: process.env.REACT_APP_FIREBASE_KEY,

  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,

  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,

  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,

  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,

  appId: process.env.REACT_APP_FIREBASE_APP_ID,

  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID

};


// Initialize Firebase

const FirebaseApp = initializeApp(firebaseConfig);

const GoogleProvider = new GoogleAuthProvider();

export { FirebaseApp, GoogleProvider };