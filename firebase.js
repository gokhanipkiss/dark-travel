// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore, getDocs } from 'firebase/firestore' 
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQyZ56O65s3QfKoCdDDMam7uQF2jFwuOE",
  authDomain: "odisea-deneme1.firebaseapp.com",
  projectId: "odisea-deneme1",
  storageBucket: "odisea-deneme1.appspot.com",
  messagingSenderId: "534610444803",
  appId: "1:534610444803:web:59ab6b2634a9975f338436"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init services
const db = getFirestore()

// collection ref
const placesRef = collection(db, 'places')
const toursRef = collection(db, 'tours')


// get collection data
export const getLocations = () => {
    // const _auth = getAuth();
    // const user = _auth.currentUser;
    // if (user !== null) {
    //     user.providerData.forEach((profile) => {
    //       console.log("Sign-in provider: " + profile.providerId);
    //       console.log("  Provider-specific UID: " + profile.uid);
    //       console.log("  Name: " + profile.displayName);
    //       console.log("  Email: " + profile.email);
    //       console.log("  Photo URL: " + profile.photoURL);
    //     });
    //   }
    return getDocs(placesRef)
}

export const getTours = () => {
    return getDocs(toursRef)
}


// auth
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});