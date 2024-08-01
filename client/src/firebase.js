// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "blogeleva-944ec.firebaseapp.com",
    projectId: "blogeleva-944ec",
    storageBucket: "blogeleva-944ec.appspot.com",
    messagingSenderId: "1095927045858",
    appId: "1:1095927045858:web:d9898c5f8c03228bbe88bb"
};

// export and initialize Firebase
export const app = initializeApp(firebaseConfig);