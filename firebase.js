// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore, getDocs, setDoc, doc, getDoc, addDoc } from 'firebase/firestore' 
import { initializeAuth, getReactNativePersistence, getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";
import { decode } from 'base-64';


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
export const placesRef = collection(db, 'places')
export const toursRef = collection(db, 'tours')
export const storiesRef = collection(db, 'stories')
const usersRef = collection(db, 'users')


// auth
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});


export const signUp = (email, password, name, city, clearFields, navigation) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
            (credentials) => {
             updateProfile(auth.currentUser, {
              displayName: name
            }).catch(err => console.log("Hata: " + err));

             setDoc(doc(db, 'users', auth.currentUser.uid), {
              location: city,
              friendCount: 0,
              badges: [],
              // notifications: [
              //   {   
              //       title: "Odisea'ya hoşgeldiniz!",
              //       body: "Ekibimiz size iyi eğlenceler diler.",
              //       unread: true,
              //       date: new Date()
              //   }
              // ]
            }).then(() =>
              addDoc(collection(db, 'users/' + auth.currentUser.uid + '/notifications'),
                {
                  title: "Merhaba!",
                  body: "Odisea'ya hoşgeldiniz. Ekibimiz size iyi seyahatler diler.",
                  unread: true,
                  date: new Date()
                }
              )
              ).catch(err => console.log("Hata: " + err) );
            
            clearFields();
            navigation.navigate('CharSelection')
            Alert.alert("Başarı", "Kullanıcı başarıyla kaydedildi.", [{text:'Tamam', onPress:() => {}}] )
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

  export const signIn = (email, password, navigation) => {
    return signInWithEmailAndPassword(auth, email, password).then(
        (result) => {
            // console.log("Logged In")
            navigation.navigate('TabMain')
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


// Storage

if(typeof atob === 'undefined') {
  global.atob = decode;
}

export const storage = getStorage();

