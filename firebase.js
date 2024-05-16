// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore, getDocs, setDoc, doc, getDoc } from 'firebase/firestore' 
import { initializeAuth, getReactNativePersistence, getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";


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
export const db = getFirestore()

// collection ref
const placesRef = collection(db, 'places')
const toursRef = collection(db, 'tours')
const storiesRef = collection(db, 'stories')
const usersRef = collection(db, 'users')


// get collection data
export const getLocations = () => {   
    return getDocs(placesRef).catch(
        err => console.log(err.toString())
    )
}

export const getTours = () => {
    return getDocs(toursRef).catch(
        err => console.log(err.toString())
    )
}

export const getStories = () => {
    return getDocs(storiesRef).catch(
        err => console.log(err.toString())
    )
}


// auth
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});


export const signUp = (email, password, name, city) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
            (credentials) => {
             updateProfile(auth.currentUser, {
              displayName: name
            })
             setDoc(doc(db, 'users', auth.currentUser.uid), {
              location: city
            });
            
            Alert.alert("Başarı", "Kullanıcı başarıyla kaydedildi." /* , signUpSuccessButton */ )            
        }
    ).catch(err => {
        if (err.toString().includes("weak-password"))
            Alert.alert("Hata", "Şifre yeterince güçlü değil.")
        else if (err.toString().includes("already-in-use"))
            Alert.alert("Hata", "Kullanıcı zaten mevcut.")
        else if (err.toString().includes("invalid"))
            Alert.alert("Hata", "E-posta adres biçimi geçersiz.")
        else
            console.log(err)
        }
    )
  }

  export const signIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password).then(
        (result) => {
            // console.log("Logged In")
        }
    ).catch(err => {
        if (err.toString().includes("invalid-credential"))
            Alert.alert("Hata", "Kullanıcı adı veya şifre hatalı.")
        else if (err.toString().includes("invalid"))
            Alert.alert("Hata", "E-posta adres biçimi geçersiz.")
        else
            console.log(err)
    })
  }

  export const getUser = id => {
    return getDoc(doc(db, 'users', id))
      .then(snapshot => {
        return snapshot.data();
      })
      .catch(err => {return err});
  };


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
