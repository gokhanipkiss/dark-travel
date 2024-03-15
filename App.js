import React, {useState, useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Intro from './components/Intro';
import Login from './components/Login';
import SplashScreen from './components/SplashScreen';
import Home from './components/Home';
import Profil from './components/Profil';
import Komunite from './components/Komunite';
import Planlar from './components/Planlar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyTabBar from './custom-components/MyTabBar';


function App(){

    const Tab = createBottomTabNavigator();

    const [splashTimedOut, setSplashTimedOut] = useState(false);
    const [firstRun, setFirstRun] = useState(false);
    
    //TODO : Implement Authentication
    const isLoggedIn = true;

    useEffect(()=>{
      showSplash();
      checkFirstRun();
  }, [])
    
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
            !isLoggedIn ? 
              <Login />
              :            
              <NavigationContainer>                    
                <Tab.Navigator
                  initialRouteName="Home"
                  screenOptions = { ({}) =>  ({
                    headerShown: false
                  }) }
                  tabBar = {(props) => {return <MyTabBar {...props}  />}}
                >
                  <Tab.Screen name="Keşfet" component={Home} />
                  <Tab.Screen name="Komünite" component={Komunite} />
                  <Tab.Screen name="Planlar" component={Planlar} />
                  <Tab.Screen name="Profil" component={Profil} />
                </Tab.Navigator>                  
              </NavigationContainer>
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