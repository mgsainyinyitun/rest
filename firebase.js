import { initializeApp } from 'firebase/app';

import dotenv from 'dotenv';
dotenv.config();

console.log('apikey=',process.env.APIKEY)
console.log('authDomain=',process.env.AUTHDOMAIN)
console.log('projectId=',process.env.PROJECTID)
console.log('storageBucket=',process.env.STORAGEBUCKET)
console.log('messagingSenderId=',process.env.MESSAGINGSENDID)
console.log('appId=',process.env.APPID)

const firebaseConfig = {
  apiKey:process.env.APIKEY,
  authDomain:process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId:process.env.MESSAGINGSENDID,
  appId:process.env.APPID
};

const firebase = initializeApp(firebaseConfig);
export default firebase;