import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore, } from 'firebase/firestore';

const firebaseConfig = {
    // apiKey: process.env.APP_KEY,
    // authDomain: process.env.AUTH_DOMAIN,
    // projectId: process.env.PROJECT_ID,
    // storageBucket: process.env.STORAGE_BUCKET,
    // messagingSenderId: process.env.MESSAGING_SENDER_ID,
    // appId: process.env.APP_ID,
    // databaseURL: process.env.DATABASE_URL,
    // measurementId: process.env.MEASUREMENT_ID,
    apiKey: "AIzaSyClxrx1JHZKzdnoQpeGU0xdhSe4Szn9LX0",
    authDomain: "busyan-capstone-3430e.firebaseapp.com",
    databaseURL: "https://busyan-capstone-3430e-default-rtdb.firebaseio.com",
    projectId: "busyan-capstone-3430e",
    storageBucket: "busyan-capstone-3430e.appspot.com",
    messagingSenderId: "513683055597",
    appId: "1:513683055597:web:4c580bbe387be9dfb07de4",
    measurementId: "G-WZLTJHGWXR"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const firestoreDb = getFirestore();
const db = getDatabase();
const auth = getAuth();

export { app, firestoreDb, auth, db }
