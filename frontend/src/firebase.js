import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBDdoX5In7PelvC9Vn8p4p0eRr6zfPSw7U",
  authDomain: "dooq-7e291.firebaseapp.com",
  projectId: "dooq-7e291",
  storageBucket: "dooq-7e291.firebasestorage.app",
  messagingSenderId: "105904541632",
  appId: "1:105904541632:web:1697928b3a2558f0c84225",
  measurementId: "G-M6WBBGWFVG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider,signInWithPopup };