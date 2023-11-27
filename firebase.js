import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: "AIzaSyDCscseo9IwLvc_Fm_kBOwXsDpXdORgoSA",
  authDomain: "sai-rest-api.firebaseapp.com",
  projectId: "sai-rest-api",
  storageBucket: "sai-rest-api.appspot.com",
  messagingSenderId: "66401358249",
  appId: "1:66401358249:web:0f5d6e6a956279678934b8"
};



const firebase = initializeApp(firebaseConfig);

export default firebase;