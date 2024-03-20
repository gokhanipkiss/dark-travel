import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/Home';
import Profil from './components/Profil';
import Komunite from './components/Komunite';
import Planlar from './components/Planlar';
import MyTabBar from './custom-components/MyTabBar';


const TabMain = ({navigation}) => {
    
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({}) => ({
            headerShown: false,
          })}
          tabBar={props => {
            return <MyTabBar {...props} />;
          }}>
          <Tab.Screen name="Keşfet" component={Home} />
          <Tab.Screen name="Komünite" component={Komunite} />
          <Tab.Screen name="Planlar" component={Planlar} />
          <Tab.Screen name="Profil" component={Profil} />
        </Tab.Navigator>
      
    );
}

export default TabMain;
