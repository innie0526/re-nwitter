import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDIrDfwN9kI1LJMjaLDtwAKdAX4doT6UwY',
  authDomain: 'nwitter-7ce05.firebaseapp.com',
  projectId: 'nwitter-7ce05',
  storageBucket: 'nwitter-7ce05.appspot.com',
  messagingSenderId: '256377779482',
  appId: '1:256377779482:web:b7271c1c5744eb7ea5a8a3',
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = getAuth();
export const auth = initializeApp(firebaseConfig);
