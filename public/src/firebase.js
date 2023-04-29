// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQCVHbvCItN-eTskd56uGP2WKHAC-TGpI",
    authDomain: "pawpatrol-260c4.firebaseapp.com",
    projectId: "pawpatrol-260c4",
    storageBucket: "pawpatrol-260c4.appspot.com",
    messagingSenderId: "623741098273",
    appId: "1:623741098273:web:710f4a61009dd9be09c660"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app