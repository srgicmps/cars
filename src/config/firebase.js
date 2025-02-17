// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCfbQ8ZSLTZYinGS-lUJeVBVYss8YAuvlk",
	authDomain: "react-project-cars.firebaseapp.com",
	projectId: "react-project-cars",
	storageBucket: "react-project-cars.firebasestorage.app",
	messagingSenderId: "928993894577",
	appId: "1:928993894577:web:a07148d4c635966a4d8290",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
