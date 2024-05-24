import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ImageBackground,
  TouchableOpacity,
  Alert
} from 'react-native';
import CustomButton from '../custom-components/CustomButton';
import { _screen } from '../utils/Urls';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { userAddnlInfo } from '../App';

const CharSelection = ({navigation}) => {

  const [selectedOption, setSelectedOption] = useState('');

  const handleSubmit = () => {
    userAddnlInfo.value.persona = selectedOption, // We won't wait for getting it from Firebase because it responds slowly
    setDoc(doc(db, 'users', auth.currentUser.uid), {
        persona: selectedOption
      })
      .catch(err=>
        Alert.alert('Hata', err.toString())
      ).finally(        
        navigation.navigate('TabMain')
      );
  }

  const {image, imageSelected, text, heading, imagesContainer, background, backgroundImage, button } = styles;
  return (
    <ImageBackground
      imageStyle={backgroundImage}
      style={background}
      source={require('../assets/images/splash.jpg')}>
      <Text style={heading}>Karakterini Belirle</Text>
      <Text style={[heading, {fontSize: 15}]}>
        Seçimini yapman sana özel önerilerde bulunmamıza yardımcı olacak. Merak
        etme, daha sonra seçtiğin karakteri profilinden değiştirebilirsin.
      </Text>
      <View style={imagesContainer}>
        <ImageBackground source={require('../assets/images/persona-myst.png')} imageStyle={selectedOption === 'myst' ? imageSelected: image}>
          <TouchableOpacity onPress={()=>{setSelectedOption('myst')}} style={[selectedOption === 'myst' ? imageSelected: image, {justifyContent:'flex-end', padding:5}]}>
            <Text style={[heading, {fontSize: 15}]}>Gizemli Kaşif</Text>
            <Text style={[heading, {fontSize: 13}]}>Paranormal faaliyetler, doğaüstü efsaneler ve çözülmemiş gizemleri olan yerler ilgimi çekiyor.</Text>
          </TouchableOpacity>
        </ImageBackground>
        <ImageBackground source={require('../assets/images/persona-hist.png')} imageStyle={selectedOption === 'hist' ? imageSelected: image}>
          <TouchableOpacity onPress={()=>{setSelectedOption('hist')}} style={[selectedOption === 'hist' ? imageSelected: image, {justifyContent:'flex-end', padding:5}]}>
            <Text style={[heading, {fontSize: 15}]}>Tarih Tutkunu</Text>
            <Text style={[heading, {fontSize: 13}]}>İnsanlık tarihinin karanlık yanlarını ve bunun kültürel önemini anlama konusunda hevesliyim.</Text>
          </TouchableOpacity>
        </ImageBackground>
        <ImageBackground source={require('../assets/images/persona-adv.png')} imageStyle={selectedOption === 'adv' ? imageSelected: image}>
          <TouchableOpacity onPress={()=>{setSelectedOption('adv')}} style={[selectedOption === 'adv' ? imageSelected: image, {justifyContent:'flex-end', padding:5}]}>
            <Text style={[heading, {fontSize: 15}]}>Sıradışı Maceracı</Text>
            <Text style={[heading, {fontSize: 13}]}>Normlara meydan okuyan, yeni deneyimler ve benzersiz bakış açıları sunan yerleri merak ederim.</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <CustomButton
        title="Devam Et"
        backgroundColor={selectedOption === '' ? 'dimgray' : 'firebrick'}
        fontWeight="bold"
        fontSize={18}
        style={button}
        onPress={selectedOption === '' ? null : handleSubmit}
      />
      <Text style={[text, {fontSize: 16}]}>
        Karar veremedin mi?
        <Text style={{textDecorationLine: 'underline', fontWeight: 'bold'}}>
          Testi çöz
        </Text>
      </Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  heading: {
    color:'white',
    fontSize:22,
    textAlign:'center',
    textShadowRadius:10,
    textShadowColor:'dimgray'
  },  
  background: {
    width: _screen.width,
    height: _screen.height,
    paddingVertical:20
  },
  backgroundImage: {
    opacity:0.5
  },
  imagesContainer: {
    flex:0.85, alignItems:'center', justifyContent:'space-evenly'
  },
  image: {
    width: 250,
    height:150,
    borderRadius:7
  },
  imageSelected: {
    width: 320,
    height:200,
    borderRadius:7,
    borderColor:'firebrick',
    borderWidth:3
  },
  text: {
    color: 'white',
    textAlign: 'center',
    textShadowRadius:10,
    textShadowColor:'dimgray'
  },
  button:{
    width:300, height:50, alignSelf: 'center',
    marginBottom:5
  }
});

export default CharSelection;
