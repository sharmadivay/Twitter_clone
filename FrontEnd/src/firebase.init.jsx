// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkPdbx2I5Z5z6jBhVmdi9es4qwPhZPXXg",
  authDomain: "twitter-clone-b248d.firebaseapp.com",
  projectId: "twitter-clone-b248d",
  storageBucket: "twitter-clone-b248d.appspot.com",
  messagingSenderId: "447618905427",
  appId: "1:447618905427:web:5ee4d38af15de5487adda6",
  measurementId: "G-V4RGLVXK29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export default auth ;