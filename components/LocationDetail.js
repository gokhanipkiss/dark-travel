import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, ImageBackground, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CustomButton from '../custom-components/CustomButton';
import { Card, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { _screen } from '../utils/Urls';
import { HeaderSection } from './Home';
import { darkTheme } from '../utils/Theme';
import { categoryMap } from '../utils/ShortNameMaps';


const LocationDetail = ({navigation, route}) => {
    const place = route.params.place;
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
            <View style={{flexDirection: 'row', alignItems:'center'}} >
                <Icon name="location-on" color='white' size={18} />
                <Text style={[styles.text, {textDecorationLine:'underline'}]}> Haritada Göster</Text>
            </View>
          </View>
          <View style={[styles.bodyText]}>
            <Text style={[styles.text, {fontSize:14}]}>
                {place.body}
            </Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={[styles.text, {fontSize:20}]}>Hikayenin Detaylarına Göz At</Text>
            <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
                <View style={{flexDirection:'row', paddingVertical:10}}>
                    <Image source={{uri: place.detail1Url}} width={_screen.width * 0.35} style={{borderRadius:10}} />
                    <Text style={[styles.text, styles.bodyText, {width: _screen.width * 0.57}]}>{place.detail1}</Text>
                    
                </View>
                             
                {place.detail2 !== '' && (
                <View style={{flexDirection:'row', paddingVertical:10}}>
                    {place.detail2Url !== '' && <Image source={{uri: place.detail2Url}} width={_screen.width * 0.35} style={{borderRadius:10}} />}
                    <Text style={[styles.text, styles.bodyText, {width: _screen.width * 0.57}]}>{place.detail2}</Text>
                </View>)}
                {place.detail3 !== '' && (
                <View style={{flexDirection:'row', paddingVertical:10}}>
                    {place.detail3Url !== '' && <Image source={{uri: place.detail3Url}} width={_screen.width * 0.35} style={{borderRadius:10}} />}
                    <Text style={[styles.text, styles.bodyText, {width: _screen.width * 0.57}]}>{place.detail3}</Text>
                </View>)}
            </ScrollView>
            <View style={{flexDirection:'row', justifyContent:'center'}}>
                        <Icon name='circle' color='white'/>
                        {place.detail2 && (place.detail2 !== '') && (<Icon name='circle' color='dimgray' />)}
                        {place.detail3 && (place.detail3 !== '') && (<Icon name='circle' color='dimgray' />)}
            </View>
          </View>
          <View style={styles.recommContainer}>
            <HeaderSection titleText='Yararlı Bulunan Tavsiyeler' />
            <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
                {place.recomm && place.recomm.map((recomm, index) => { return (
                <Card key={index} style={styles.recommCard}>
                    <Text>{recomm.author}</Text>    
                    <Text>{recomm.text}</Text>
                </Card>
                )})}
            </ScrollView>
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
        textShadowRadius: 10,
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
        padding: 10,
      },
    recommContainer: {
      padding: 10,
      height: 'auto'
    },
    recommCard: {
      padding: 5
    }
})

export default LocationDetail;