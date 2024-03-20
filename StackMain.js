import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from './components/Settings';
import TabMain from './TabMain';


const StackMain = () => {   

    const Stack = createStackNavigator();

    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="TabMain"
            component={TabMain}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Ayarlar"
            component={Settings}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default StackMain;