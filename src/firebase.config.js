import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyC4cTP8oM8wyoYlyAsQBSMKmOlbQZy_6fg",
   authDomain: "movie-database-edb0f.firebaseapp.com",
   projectId: "movie-database-edb0f",
   storageBucket: "movie-database-edb0f.appspot.com",
   messagingSenderId: "430039750071",
   appId: "1:430039750071:web:de9cec7deea999e2b74432",
}

// Initialize Firebase
initializeApp(firebaseConfig)

export const db = getFirestore
