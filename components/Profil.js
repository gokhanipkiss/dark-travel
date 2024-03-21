import { StackActions } from '@react-navigation/native';
import React from 'react';
import { Text, StyleSheet, View, SafeAreaView, Image, Touchable, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { currentUser } from '../App';
import { personaMap } from '../utils/ShortNameMaps';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';


const Profil = ({navigation}) => {

    function goToSettings(){
        navigation.push('Ayarlar');
    }

    const {container, text, topBar, centerSection, userInfoCard, avatarImage, userInfo, usernameText, badgesSection, badgesTitle,
    badgesContainer, badge, favoritesSection, favoritesCard, favoritesImage, favoritesText} = styles;

    return (
      <View style={container}>
        <View style={topBar}>
          <Icon.Button
            name="settings"
            size={28}
            backgroundColor="black"
            color="ivory"
            onPress={goToSettings}
          />
        </View>
        <View style={centerSection}>
          <View style={userInfoCard}>
            <Image style={avatarImage} source={require('../assets/images/splash.jpg')} />
            <View style={userInfo}>
                <Text style={usernameText} > {currentUser.value.name}  </Text>
                <Text style={text}> {personaMap[currentUser.value.persona]} </Text>
                <Text style={{...text, fontSize:16}}> {currentUser.value.friendCount} arkadaş </Text>
            </View>                        
          </View>
          <View style={badgesSection} >
            <View style={badgesTitle}> 
                <Text style={{...text, fontSize:20}}>
                    Başarımlarım
                </Text>
                <Icon name="chevron-right" color='ivory' size={26} />
            </View>            
            <ScrollView horizontal /*showsHorizontalScrollIndicator çalışmadı*/ style={badgesContainer}>
                {currentUser.value.badges.map((item,index) => {
                    return (
                    <Image key={index} style={badge} source={require('../assets/images/splash.jpg')} />
                    )
                    })
                }                
            </ScrollView>
          </View>

          <View style={favoritesSection}>
            <TouchableOpacity style={favoritesCard}>
                <Image style={favoritesImage} source={require('../assets/images/splash.jpg')} />
                <View style={{flex:1}}>
                    <Text style={favoritesText}>
                        <Text style={{fontWeight:'bold'}}>
                            Favorilerim {'\n'}
                        </Text>
                        Beğendiğin mekanları bu dosyaya ekleyebilirsin
                    </Text>
                </View>
            </TouchableOpacity>
          </View>

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
  text: {
    color: 'ivory',
    fontSize: 18
  },
  centerSection: {
    flex:1
  },

  topBar: {
    padding:15,
    paddingBottom: 0,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },

  userInfoCard: {
    paddingHorizontal: 20,
    flexDirection:'row'
  },
  userInfo:{
    paddingTop: 15,
    paddingLeft: 15
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  usernameText: {
    fontSize: 26,
    fontWeight: 'bold', 
    color:'ivory'
  },

  badgesSection:{
    paddingTop:20
  },
  badgesTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:20
  },
  badgesContainer: {
    paddingHorizontal:10,
    width:'90%'
  },
  badge: {
    width:60,
    height:60,
    borderRadius:30,
    borderColor: 'firebrick',
    borderWidth: 2,
    margin:5
  },

  favoritesSection: {
    paddingTop:20,
    paddingHorizontal:10,
    height:'22%'
  },
  favoritesCard: {
    height:'100%',
    backgroundColor: 'ivory',
    borderRadius:5,
    flexDirection: 'row',
    padding: 10
  },
  favoritesImage: {
    width: '35%',
    height: '100%',
    borderRadius: 5
  },
  favoritesText: {
    color: 'black',
    fontSize: 16,
    paddingLeft: 10 
  }


});

export default Profil;