import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; //사용자 인증용
import { getFirestore } from 'firebase/firestore'; //트윗용 database
// Cloud Firestore의 databse는 NoSQL기반 database. 유연하고 사용하기 쉬움. 적은 규칙. 상대적으로 낮은 자유도
//  다른 형태의 database로는 SQL database가 있음. 많은 규칙과 많은 관습이 존재. 높은 자유도
//  NoSQL의 특징 : 1. Collection(folder의 개념)과 Document(doc. 문서의 개념)가 존재
//                   하나의 database는 collection들을 가지고 있고 각 collection은 document들을 가지고 있음

import { getStorage } from 'firebase/storage';

// ----------------------------------------------------------------------------

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUR_ID,
};

// Initialize Firebase/ firebase project 만들어줌
const app = initializeApp(firebaseConfig);
// getAuth() authService -> 사용자 인증에 관한 서비스 . App.js/ Auth.js 로 연결 됨
export const authService = getAuth(app);
export const dbService = getFirestore(app);
export const storageService = getStorage(app);

export default firebaseConfig;
