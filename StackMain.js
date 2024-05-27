import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from './components/Settings';
import TabMain from './TabMain';
import SignUp from './components/SignUp';
import Login from './components/Login';
import UserInfo from './components/UserInfo';
import { isLoggedIn, userAddnlInfo } from './App';
import Account from './components/Account';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, getUser } from './firebase';
import CharSelection from './components/CharSelection';
import LocationDetail from './components/LocationDetail';


const StackMain = () => {
    
    const Stack = createStackNavigator();
    const navigationRef = useNavigationContainerRef();

    var firstRender = true;

    useEffect(() => {
      onAuthStateChanged(auth, user => {
      if (user) {
        isLoggedIn.value = true;
        getUser(auth.currentUser.uid).then(
            result => {
              userAddnlInfo.value = result
              //console.log("userInfo: %O", result)
              userAddnlInfo.value.photoURL = auth.currentUser.photoURL;
              //console.log("auth state changed")
            }            
        ).catch(err => console.log(err));        
        // navigationRef.navigate('TabMain')        
        
      } else {
        isLoggedIn.value = false;        
        
        // Bu check gerekli, yoksa ilk login'de kilitleniyor
        if (!firstRender){
          navigationRef.navigate('Login')
        }
        else {
        firstRender = false;
        }
      }
    });
    }, []);
    
    
    
    return (
      <NavigationContainer ref={navigationRef} >        
          <Stack.Navigator initialRouteName='TabMain'>
          {isLoggedIn.value ? (
            <>
              <Stack.Screen
                name='CharSelection'
                component={CharSelection}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="TabMain"
                component={TabMain}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name='LocationDetail'
                component={LocationDetail}
                options={{headerShown: false}}
              />
              <Stack.Screen 
                name="Ayarlar" 
                component={Settings} 
              />
              <Stack.Screen
                name="Profil Bilgileri"
                component={UserInfo}                
              />
              <Stack.Screen
                name="Hesap ve Güvenlik"
                component={Account}
              />
            </>
          
        ) : (
            <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{headerShown: false}}
            />
          </>
        )}
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default StackMain;