
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
apiKey: "AIzaSyBs0CwiQgNtLApTyu66ChV_EM-CLPelAxU",
  authDomain: "convene-9c056.firebaseapp.com",
  projectId: "convene-9c056",
  storageBucket: "convene-9c056.appspot.com",
  messagingSenderId: "92942534987",
  appId: "1:92942534987:web:5dbb733667a5990d6fc0ce"
};
const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);




