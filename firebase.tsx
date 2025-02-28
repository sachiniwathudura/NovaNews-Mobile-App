
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, indexedDBLocalPersistence } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBWNEdtso0TcvBA4V68VOZFnLCOJwqwg_s",
    authDomain: "world-news-app-react-native.firebaseapp.com",
    projectId: "world-news-app-react-native",
    storageBucket: "world-news-app-react-native.appspot.com",
    messagingSenderId: "22990234272",
    appId: "1:22990234272:web:f2842d0cfdd788d87e5fc5",
    measurementId: "G-S71JGZ0DEF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Use indexedDBLocalPersistence for web
const auth = initializeAuth(app, {
    persistence: indexedDBLocalPersistence
});

export { app, auth };

