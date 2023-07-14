import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage'




const firebaseConfig = {
  apiKey: "AIzaSyAZY1kF-BY04oe-rF8vQlXEc9IUg_XZXKM",
  authDomain: "insta-clone-2c5ec.firebaseapp.com",
  databaseURL: "https://insta-clone-2c5ec-default-rtdb.firebaseio.com",
  projectId: "insta-clone-2c5ec",
  storageBucket: "insta-clone-2c5ec.appspot.com",
  messagingSenderId: "191248193294",
  appId: "1:191248193294:web:f3fc04e63d42e69f89295f",
  measurementId: "G-EL3J7RFCW2"
};







// initializing the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// creating db , storage & auth

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export {db , auth , storage};
























// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAZY1kF-BY04oe-rF8vQlXEc9IUg_XZXKM",
//   authDomain: "insta-clone-2c5ec.firebaseapp.com",
//   databaseURL: "https://insta-clone-2c5ec-default-rtdb.firebaseio.com",
//   projectId: "insta-clone-2c5ec",
//   storageBucket: "insta-clone-2c5ec.appspot.com",
//   messagingSenderId: "191248193294",
//   appId: "1:191248193294:web:f3fc04e63d42e69f89295f",
//   measurementId: "G-EL3J7RFCW2"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = app.firestore();
// const auth = app.auth();

// export {db , auth};