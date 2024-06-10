import React, {useEffect, useState} from 'react';
import { Text, StyleSheet, View, SafeAreaView, Image, Touchable, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { userAddnlInfo } from '../App';
import { personaMap } from '../utils/ShortNameMaps';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { auth } from '../firebase';
import { _screen } from '../utils/Urls';
import { darkTheme } from '../utils/Theme';
import { useFocusEffect } from '@react-navigation/native';
import { isNullOrEmpty } from '../utils/Methods';


const Profil = ({navigation, route}) => {

    function goToSettings(){
        navigation.push('Ayarlar');
    }

    useFocusEffect(   // Fotoğraf değiştiğinde re-render yapmak için gerekti
      React.useCallback(() => {
        setPhotoURL(userAddnlInfo.value.photoURL)
      }, [userAddnlInfo.value.photoURL])
    );

    const [photoURL, setPhotoURL ] = useState(userAddnlInfo.value.photoURL || auth.currentUser.photoURL);

    const {container, text, topBar, centerSection, userInfoCard, avatarImage, userInfo, usernameText, badgesSection, badgesTitle,
        badgesContainer, badge, favoritesSection, favoritesCard, favoritesImage, favoritesText, memoriesSection, memoriesCard,
        memoriesImage, memoriesText, memoriesTitle, scrollView} = styles;

    return (
    <SafeAreaView style={container} >
      <ScrollView style={scrollView} >
        <View style={topBar}>
          <Icon.Button
            name="settings"
            size={26}
            backgroundColor="black"
            color="white"
            onPress={goToSettings}
          />
        </View>

        <View style={centerSection}>
          <View style={userInfoCard}>
            <View style={styles.avatarImageContainer}>
            <Image style={avatarImage} source={!isNullOrEmpty(photoURL) ? {uri: photoURL} : require('../assets/images/user.jpg')} />
            </View>
            <View style={userInfo}>
                <Text style={usernameText} > {auth.currentUser.displayName}  </Text>
                <Text style={text}> {userAddnlInfo ? personaMap[userAddnlInfo.value.persona] : ''} </Text>
                <Text style={{...text, fontSize:16}}> {userAddnlInfo ? userAddnlInfo.value.friendCount : 0} arkadaş </Text>
            </View>                        
          </View>
          <View style={badgesSection} >
            <TouchableOpacity style={badgesTitle}> 
                <Text style={{...text, fontSize:20}}>
                    Başarımlarım
                </Text>
                <Icon name="chevron-right" color='white' size={26} />
            </TouchableOpacity>            
            <ScrollView horizontal /*showsHorizontalScrollIndicator çalışmadı*/ style={badgesContainer}>
                {[].map((item, index) => {
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

          <View style={memoriesSection}>
          <TouchableOpacity style={memoriesTitle}> 
                <Text style={{...text, fontSize:20}}>
                    Anılarım
                </Text>
                <Icon name="chevron-right" color='white' size={26} />
            </TouchableOpacity>
            {[].map((item, index) => {
                return(
                <TouchableOpacity key={index} style={memoriesCard}>
                    <Image style={memoriesImage} source={require('../assets/images/splash.jpg')} />
                    <View style={{flex:1}}>
                        <Text style={memoriesText}>
                            <Text style={{fontWeight:'bold'}}>
                                {item} {'\n'}
                            </Text>
                            Lorem ipsum
                        </Text>
                    </View>
                </TouchableOpacity>
            )})}
          </View>

        </View>

      </ScrollView>
      </SafeAreaView>
    
    );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignContent: 'center',
    justifyContent: 'flex-start',
    backgroundColor: darkTheme.backgroundColor
  },
  scrollView: {
   
  },
  text: {
    color: darkTheme.textColor,
    fontSize: 16,
    fontFamily: 'Lexend-Light'
  },
  centerSection: {
    
  },

  topBar: {
    padding:12,
    paddingBottom: 0,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },

  userInfoCard: {
    marginTop:-5,
    paddingHorizontal: 20,
    flexDirection:'row'
  },
  userInfo:{
    paddingTop: 15,
    paddingLeft: 15
  },
  avatarImageContainer: {width:100, height:100, borderRadius:50, elevation:10},
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  usernameText: {
    fontSize: 24,
    fontFamily: 'Lexend-SemiBold',
    color:'white'
  },

  badgesSection:{
    paddingTop:10
  },
  badgesTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:20,
    paddingBottom:3
  },
  badgesContainer: {
    paddingHorizontal:10,
    width:'95%'
  },
  badge: {
    width:54,
    height:54,
    borderRadius:27,
    borderColor: darkTheme.primary,
    borderWidth: 2,
    margin:5
  },

  favoritesSection: {
    paddingTop:20,
    paddingHorizontal:10,
    height: _screen.height * 0.22
  },
  favoritesCard: {
    height:'100%',
    backgroundColor: 'white',
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
    fontSize: 14,
    fontFamily: 'Lexend-Light',
    paddingLeft: 10 
  },

  memoriesSection: {
    paddingTop:20,
    paddingHorizontal:10
  },
  memoriesTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:10,
    paddingTop:0
  },
  memoriesCard: {
    height:100,
    backgroundColor: 'white',
    borderRadius:5,
    flexDirection: 'row',
    padding: 10,
    marginBottom:10
  },
  memoriesImage: {
    width: '35%',
    height: '100%',
    borderRadius: 5
  },
  memoriesText: {
    color: 'black',
    fontSize: 16,
    paddingLeft: 10 
  },



});

export default Profil;