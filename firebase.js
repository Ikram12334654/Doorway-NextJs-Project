import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPvcHd829DtnwNBgI6ctZaHAQUN92BO5w",
  authDomain: "doorway-ec00f.firebaseapp.com",
  projectId: "doorway-ec00f",
  storageBucket: "doorway-ec00f.firebasestorage.app",
  messagingSenderId: "883162288049",
  appId: "1:883162288049:web:723692636831fb9c7e7790",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };
