import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCriC9-7UBmYZdz_EY_m4xmAhb0eqyWm7w',
  authDomain: 're-nwitter.firebaseapp.com',
  projectId: 're-nwitter',
  storageBucket: 're-nwitter.appspot.com',
  messagingSenderId: '61746744850',
  appId: '1:61746744850:web:d31cad65dd9f20486412cb',
  measurementId: 'G-F26HT952VR',
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = getAuth();
export const dbService = getFirestore();
export const storageService = getStorage();

export default firebaseConfig;
