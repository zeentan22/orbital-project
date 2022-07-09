// Import the functions you need from the SDKs you need
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {getFirestore, collection, setDoc, doc} from "firebase/firestore"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFFrk9JumeXiF6cxtBqaKuOmAKQQIwQeQ",
  authDomain: "procrastinate-d2b5a.firebaseapp.com",
  projectId: "procrastinate-d2b5a",
  storageBucket: "procrastinate-d2b5a.appspot.com",
  messagingSenderId: "909968004529",
  appId: "1:909968004529:web:98af0fdd21044c69475990",
  measurementId: "G-9FT1K3W9FW",
};

// const analytics = getAnalytics(app);

const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}
export function resetPasswordEmail(email){
  return sendPasswordResetEmail(auth,email);
}

// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
    if (user) {setCurrentUser(true)} else{setCurrentUser(false)}});
    return unsub;
  }, []);

  return currentUser;
}
export const dbInit = getFirestore(app);




