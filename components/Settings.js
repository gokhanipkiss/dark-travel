import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { isLoggedIn } from '../App';

const Settings = () => {

    const settingsList = [
        {
            name : 'Profil Bilgileri',
            icon: 'circle-user'
        },
        {
            name: 'Karakter Değişimi',
            icon: 'user-gear'
        },
        {
            name: 'Hesap & Güvenlik',
            icon: 'user-shield'
        },
        {
            name: 'Destek',
            icon: 'circle-question'
        },
        {
            name: 'Gizlilik Politikası',
            icon: 'user-secret'
        },
        {
            name: 'Kullanım Koşulları',
            icon: 'drivers-license'
        },
        {
            name: 'Hakkımızda',
            icon: 'info'
        },
        {
            name: 'Çıkış Yap',
            icon: 'door-open',
            onPress: handleExit
        }    
    ]

    function handleExit() {
        isLoggedIn.value = false;
    }
   

    return (
        <View style={styles.main}>
            <FlatList data={settingsList} renderItem={({item})=> {                
                return (
                  <Card style={styles.menuCard}>
                    <TouchableOpacity onPress={item.onPress}>
                      <Text style={styles.menuItemText}>
                        <Icon name={item.icon} color="ivory" size={24} />{' '}
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  </Card>
                );
                }
            }    
            >

            </FlatList>
        </View>
    
    );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'black'
  },
  menuCard: {
    flexDirection: 'row',
    height: 70,
    padding:20,
    backgroundColor: 'black'
  },
  menuItemText:{
    color:'ivory',
    fontSize: 20
  }
});

export default Settings;