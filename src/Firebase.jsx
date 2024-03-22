


import "firebase/auth"
import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getAuth } from 'firebase/auth';
import { getFirestore} from "firebase/firestore";

const  firebaseApp = initializeApp({
  apiKey: "AIzaSyBKDNvyHdU8ytyOfmr4SQZHPFC1jOP9dYA",
  authDomain: "myconveneapp.firebaseapp.com",
  projectId: "myconveneapp",
  storageBucket: "myconveneapp.appspot.com",
  messagingSenderId: "957357671633",
  appId: "1:957357671633:web:794cb1937b000f30aa71f0"
})

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export default  firebaseApp