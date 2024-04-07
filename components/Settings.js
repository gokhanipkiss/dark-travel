import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Card, Switch } from 'react-native-paper';
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
            <View style={styles.topCard}>
                <View>
                    <Text style={styles.menuItemText}>Karanlık Tema</Text>
                </View>
                <View>
                    <Switch value={true} trackColor='white' color='dodgerblue' />
                </View>
            </View>            
            <FlatList data={settingsList} renderItem={({item})=> {                
                return (
                  <Card style={styles.menuCard}>
                    <TouchableOpacity onPress={item.onPress}>
                      <View style={styles.menuItem}>
                      <Text style={styles.icon}>
                        <Icon name={item.icon} color="white" size={24} />
                      </Text>
                      <Text style={styles.menuItemText}>                        
                        {item.name}
                      </Text>
                      </View>
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
    backgroundColor: 'black',
    paddingHorizontal: 15,
    paddingTop:15
  },
  menuCard: {    
    height: 60,
    paddingVertical:15,
    backgroundColor: 'black'
  },
  menuItem:{
    flexDirection: 'row'
  },
  icon: {
    width: 40,
    textAlign: 'center',
    marginRight: 7

  },
  menuItemText:{    
    color:'white',
    fontSize: 20
  },
  topCard: {
    flexDirection: 'row',
    justifyContent:'space-between',
    height: 70,
    paddingVertical:20,
    backgroundColor: 'black'
  }
});

export default Settings;