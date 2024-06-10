import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, ImageBackground, Button, Linking, Alert, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CustomButton from '../custom-components/CustomButton';
import { Card, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { _screen, _window } from '../utils/Urls';
import { HeaderSection } from './Home';
import { darkTheme } from '../utils/Theme';
import { categoryMap } from '../utils/ShortNameMaps';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, getUser } from '../firebase';

const detailContainerPadding = 10;

const LocationDetail = ({navigation, route}) => {
    const place = route.params.place;
    const [recommendations, setRecommendations ] = useState([]);
    const [detailPage, setDetailPage ] = useState(0);

    useEffect(() => {
      const q = query(collection(db, 'recommendations'), where('locationId', '==', place.id))
      getDocs(q).then(snapshot => {
        let arr = []
        snapshot.forEach(s => 
          {
            let obj = {...s.data()}            
            getUser(s.data().authorId).then(res => {
              obj.photoURL = res.photoURL
              obj.userName = res.displayName
              arr.push(obj)
              setRecommendations(arr)
              })
          })
      }
      )
    }, []);
    
    const handleOpenMaps = () => {
      let scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
      let label = ''
      let latLong = place.coordinates
      let url = Platform.select({
        ios: `${scheme}${label}@${latLong}`,
        android: `${scheme}${latLong}(${label})`
      });
      if (place.coordinates)
        Linking.openURL(url)
      else
        Alert.alert('Hata','Konumun koordinat bilgisi bulunamadı.')
    }
    
    return (
      <View style={styles.main}>
        <ScrollView>
          <ImageBackground style={styles.titleImageContainer} imageStyle={styles.titleImage} source={place.picUrl ? {uri: place.picUrl} : require('../assets/images/image-not-found.png')}>
            <Text style={[styles.text, styles.heading]}>
              {place.name}
            </Text>
          </ImageBackground>
          <CustomButton style={styles.button} title='Plana Ekle' backgroundColor={darkTheme.primary} fontSize={20}/>
          <View style={styles.chipAndMap}>
            <View style={styles.chipsContainer}>
            {place.categories.map((category,index) => { return (
                <Chip key={index} style={styles.chip}>
                    <Text style={[styles.text, {fontSize:10}]}>{categoryMap[category]}</Text>
                </Chip>                
                )}
            )
            }
            </View>
            <TouchableOpacity style={{flexDirection: 'row', alignItems:'center'}} onPress={handleOpenMaps} >
                <Icon name="location-on" color='white' size={18} />
                <Text style={[styles.text, {textDecorationLine:'underline', marginLeft:2}]} >Haritada Göster</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.bodyText]}>
            <Text style={[styles.text, {fontSize:14}]}>
                {place.body}
            </Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={[styles.text, {fontSize:20}]}>Hikayenin Detaylarına Göz At</Text>
            <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} 
                        onMomentumScrollEnd={(event)=>(
                           setDetailPage( Math.floor(event.nativeEvent.contentOffset.x / (_window.width-detailContainerPadding*2 - 0.001)) )
                           ) } >
                <View style={{flexDirection:'row', paddingVertical:10}}>
                    <Image source={{uri: place.detail1Url}} width={_screen.width * 0.35} style={{borderRadius:10}} />
                    <Text style={[styles.text, styles.bodyText, {width: _screen.width * 0.57}]}>{place.detail1}</Text>
                </View>

                {place.detail2 !== '' && (
                <View style={{flexDirection:'row', paddingVertical:10}}>
                    {place.detail1Url !== '' && <Image source={{uri: place.detail1Url}} width={_screen.width * 0.35} style={{borderRadius:10}} />}
                    <Text style={[styles.text, styles.bodyText, {width: _screen.width * 0.57}]}>{place.detail2}</Text>
                </View>)}
                {place.detail3 !== '' && (
                <View style={{flexDirection:'row', paddingVertical:10}}>
                    {place.detail3Url !== '' && <Image source={{uri: place.detail1Url}} width={_screen.width * 0.35} style={{borderRadius:10}} />}
                    <Text style={[styles.text, styles.bodyText, {width: _screen.width * 0.57}]}>{place.detail3}</Text>
                </View>)}
            </ScrollView>
            <View style={{flexDirection:'row', justifyContent:'center'}}>
                        <Icon name='circle' color={detailPage === 0 ? 'white' : 'dimgray'} />
                        {place.detail2 && (place.detail2 !== '') && (<Icon name='circle' color={detailPage === 1 ? 'white' : 'dimgray'} />)}
                        {place.detail3 && (place.detail3 !== '') && (<Icon name='circle' color={detailPage === 2 ? 'white' : 'dimgray'} />)}
            </View>
          </View>
          <View style={styles.recommContainer}>
            <HeaderSection titleText='Yararlı Bulunan Tavsiyeler' />            
              {recommendations.length > 0 && recommendations.map((recomm, index) => { return (
              <View key={index} style={styles.recommCard}>                    
                <View>
                  <Image style={styles.recommAvatar} source={recomm.photoURL ? {uri: recomm.photoURL} : require('../assets/images/user.jpg')} />
                </View>
                <View style={{width:'85%', paddingRight:5}}>
                  <Text style={[styles.recommText, {fontWeight:'bold'}]}>{recomm.userName}</Text>
                  <Text style={styles.recommText} >{recomm.body}</Text>
                </View>
              </View>
              )})}            
          </View>  
          



        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex:1,
        backgroundColor: darkTheme.backgroundColor,
        justifyContent:'flex-start'
    },
    titleImageContainer: {
        height:300,
    },
    titleImage: {
        width:'100%',
        height: 300,
        opacity: 0.7
    },
    heading:{
        fontSize:24,
        margin:20,
        textAlign:'center',
        fontFamily: 'Lexend-SemiBold'
    },
    text: {
        color: darkTheme.textColor,
        textShadowColor: 'black',
        textShadowRadius: 5,
        fontFamily: 'Lexend-Light'
    },
    button: {
        marginVertical: 15,
        width: _screen.width -24,
        height: 50,
        alignSelf:'center'

    },
    chipAndMap: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:'20',
        marginHorizontal:12,
        width: '90%',
        flex: 1
    },
    chipsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      flexShrink: 1
    },
    chip: {
        backgroundColor: 'teal',
        borderRadius:16,
        marginRight:5
    },
    bodyText: {
        margin:12
    },
    detailsContainer: {
        height: 'auto',
        backgroundColor: 'rgb(40, 40, 40)',
        padding: detailContainerPadding,
        width:'100%'
      },
    recommContainer: {
      padding: 10,
      height: 'auto'
    },
    recommCard: {
      backgroundColor:'white',
      borderRadius:10,
      width:'100%',
      flexDirection:'row',
      padding: 5,
      justifyContent:'flex-start',
      alignItems: 'center'
    },
    recommText: {
      fontFamily: 'Lexend-Regular',
      color: 'black',
      lineHeight:20,
    },
    recommAvatar: {
      width:48,
      height:48,
      borderRadius:24,
      marginRight:10
    }
})

export default LocationDetail;