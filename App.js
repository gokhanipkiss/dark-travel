import React, {useState, useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Intro from './components/Intro';
import Login from './components/Login';
import SplashScreen from './components/SplashScreen';

function App(){

    const [splashTimedOut, setSplashTimedOut] = useState(false);
    const [firstRun, setFirstRun] = useState(false);
    
    const showSplash = () => {
      setTimeout(
        ()=>{setSplashTimedOut(true)},
        5000
      )
    }
    const checkFirstRun = async () => {        
            try {
              const result = await AsyncStorage.getItem('previouslyLaunched');
              if (result === undefined || result === null){
                setFirstRun(true)
                const res = await AsyncStorage.setItem('previouslyLaunched', 'previouslyLaunched', ()=>{
                  console.log("previouslyLaunched set")
                });
              }
            } catch(e) {
              console.log("getItem error")
            }                   
    }

    const closeIntro = () => {
      setFirstRun(false)
    }

    useEffect(()=>{
        showSplash();
        checkFirstRun();
    }, [])


  return (
    !splashTimedOut ?
      <SplashScreen />
      :
      
      (
        firstRun ?
          <Intro closeIntro={closeIntro}/>          
          
          :
          (  
            <SafeAreaView style={styles.main}   /* TODO: Let's use React.Lazy here */ >
              <StatusBar  /* gerekli mi? */  />              
              <View >
                <Login />
              </View>
            </SafeAreaView >
          )
      )
  );
}

const styles = StyleSheet.create({
    main:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      color:'white'
    },
    text: {
      color: 'white'
    }
  });

export default App;