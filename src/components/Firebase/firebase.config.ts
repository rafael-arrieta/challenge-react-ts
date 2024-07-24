// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxT2FA9Pzuy9pAwW8ycY8uABrc5Jle8SY",
  authDomain: "react-f8615.firebaseapp.com",
  projectId: "react-f8615",
  storageBucket: "react-f8615.appspot.com",
  messagingSenderId: "348458072747",
  appId: "1:348458072747:web:ae2f1780036a315f4b15ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore }	