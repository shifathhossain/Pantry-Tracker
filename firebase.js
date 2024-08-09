// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5jA1DZHHnRowMbiiNg5TFwEMP7G5M2wk",
  authDomain: "pantry-tracker-f7b49.firebaseapp.com",
  projectId: "pantry-tracker-f7b49",
  storageBucket: "pantry-tracker-f7b49.appspot.com",
  messagingSenderId: "989377227126",
  appId: "1:989377227126:web:79a5103de704f74cc07257"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
export {firestore}