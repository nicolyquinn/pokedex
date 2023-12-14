import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjBnf83p4PPNQGgWSzTczmgliQA8XbV6E",
  authDomain: "pokedex-app-ed7cd.firebaseapp.com",
  projectId: "pokedex-app-ed7cd",
  storageBucket: "pokedex-app-ed7cd.appspot.com",
  messagingSenderId: "24205969574",
  appId: "1:24205969574:web:957168020aaccdeaf7cc67",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const usersRef = collection(firebaseDB, "users");
export const pokemonListRef = collection(firebaseDB, "pokemonList");
