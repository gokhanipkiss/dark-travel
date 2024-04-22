import React, {useState, useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Intro from './components/Intro';
import SplashScreen from './components/SplashScreen';
import { signal } from '@preact/signals-react';
import StackMain from './StackMain';
// import db from './fake-db/db';

export const isLoggedIn = signal(false);
export const currentUser = signal({});

function App(){

    const [splashTimedOut, setSplashTimedOut] = useState(false);
    const [firstRun, setFirstRun] = useState(false);    

    useEffect(()=>{
      showSplash();
      checkFirstRun();
  }, [])
    
    const showSplash = () => {
      setTimeout(
        ()=>{setSplashTimedOut(true)},
        1000
      )
    }
    const checkFirstRun = async () => {        
            try {
              const result = await AsyncStorage.getItem('previouslyLaunched');
              if (result === undefined || result === null){
                setFirstRun(true)
                const res = await AsyncStorage.setItem('previouslyLaunched', 'previouslyLaunched', ()=>{
                  // console.log("previouslyLaunched set")
                });
              }
            } catch(e) {
              console.log("getItem error")
            }                   
    }

    const closeIntro = () => {
      setFirstRun(false)
    }


  return (
    !splashTimedOut ?
      <SplashScreen />
      :      
      (
        firstRun ?
          <Intro closeIntro={closeIntro}/>          
          :
          (  
            <View style={styles.main}>
            {                    
              <StackMain />
            }
            </View>
          )
      )
  );
}

const styles = StyleSheet.create({
    main:{
      flex:1
    },
    text: {
      color: 'white'
    }
  });

export default App;