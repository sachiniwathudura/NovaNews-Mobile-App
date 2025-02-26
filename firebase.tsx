// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCfGKgBK0-t2kTGYBA97oR7I8I016dHyHQ",
    authDomain: "world-news-app-react-native.firebaseapp.com",
    projectId: "world-news-app-react-native",
    storageBucket: "world-news-app-react-native.firebasestorage.app",
    messagingSenderId: "22990234272",
    appId: "1:22990234272:web:f2842d0cfdd788d87e5fc5",
    measurementId: "G-S71JGZ0DEF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app,auth};