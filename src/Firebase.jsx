


import "firebase/auth"
import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getAuth } from 'firebase/auth';
import { getFirestore} from "firebase/firestore";

const  firebaseApp = initializeApp({
    apiKey: "AIzaSyBs0CwiQgNtLApTyu66ChV_EM-CLPelAxU",
     authDomain: "convene-9c056.firebaseapp.com",
     projectId: "convene-9c056",
     storageBucket: "convene-9c056.appspot.com",
     messagingSenderId: "92942534987",
     appId: "1:92942534987:web:5dbb733667a5990d6fc0ce"
})

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export default  firebaseApp