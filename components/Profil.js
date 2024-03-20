import { StackActions } from '@react-navigation/native';
import React from 'react';
import { Text, StyleSheet, View, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Profil = ({navigation}) => {

    function goToSettings(){
        navigation.push('Ayarlar');
    }

    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Icon.Button
            name="settings"
            size={28}
            backgroundColor="black"
            color="ivory"
            onPress={goToSettings}
          />
        </View>
        <View style={styles.centerSection}>
          <Text style={styles.titleText}>Profil</Text>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'black',
  },
  titleText: {
    textAlign: 'center',
    fontSize: 24,
    color: 'ivory',
  },
  text: {
    color: 'ivory',
  },
  centerSection: {
    flex:1, 
    justifyContent: 'center',
  },
  topBar: {
    padding:30,
    justifyContent: 'center',
    alignItems: 'flex-end'
  }
});

export default Profil;