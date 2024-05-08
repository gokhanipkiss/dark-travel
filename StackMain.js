import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from './components/Settings';
import TabMain from './TabMain';
import SignUp from './components/SignUp';
import Login from './components/Login';
import UserInfo from './components/UserInfo';
import { isLoggedIn } from './App';
import Account from './components/Account';


const StackMain = () => {
    
    const Stack = createStackNavigator();
    
    return (
      <NavigationContainer>        
          <Stack.Navigator initialRouteName= {isLoggedIn.value ? 'TabMain' : 'Login'}>
          {isLoggedIn.value ? (
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
              <Stack.Screen
                name="TabMain"
                component={TabMain}
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