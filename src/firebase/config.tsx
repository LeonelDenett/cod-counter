
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5spo9jw0XuJqIIfMEaYdH7TmXc_8Ylmc",
  authDomain: "cod-counter-6832c.firebaseapp.com",
  projectId: "cod-counter-6832c",
  storageBucket: "cod-counter-6832c.appspot.com",
  messagingSenderId: "616722496689",
  appId: "1:616722496689:web:73723275ebf6d1e345f690"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);