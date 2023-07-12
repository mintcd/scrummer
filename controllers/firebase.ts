// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYVl49vyR0C0NelA-V5hhGAjCNquOz2aQ",
  authDomain: "beehexa-functions.firebaseapp.com",
  projectId: "beehexa-functions",
  storageBucket: "beehexa-functions.appspot.com",
  messagingSenderId: "317540966232",
  appId: "1:317540966232:web:04345a3a8513da01748f2d",
  measurementId: "G-YCVDKFK0V2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);