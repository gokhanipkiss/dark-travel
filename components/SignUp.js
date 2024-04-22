import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Alert, TextInput, Button, ActivityIndicator} from 'react-native';
import CustomButton from '../custom-components/CustomButton';
import {IconButton} from 'react-native-paper';
import { signUp } from '../firebase';


const SignUp = ({navigation}) => {
   
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword ] = useState(false);

  const onChangeEmail = value => {
    setEmail(value);
  };

  const onChangePassword = value => {
    setPassword(value);
  };
  
  const onChangeName = value => {
    setName(value);
  };

  const onChangeCity = value => {
    setCity(value)
  }

  function toggleShowPassword () {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async () => {
    setLoading(true);
    if ( name.replace(/\s/g,"") == "" ){
      Alert.alert('Hata', 'İsim boş olamaz.')
      setLoading(false)
    }
    else if ( city.replace(/\s/g,"") == "" ){
      Alert.alert('Hata', 'Şehir boş olamaz.')
      setLoading(false)
    }
    else{
      let result = await signUp(email, password, name, city);
      if (result)
        setLoading(false)
    }
  };  

  // const signUpSuccessButton =
  //   [
  //     {
  //       text: 'Devam',
  //       onPress: () => navigation.push('Login'),
  //     },
  // ]

    return (
        <View style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.titleText}>Kaydol</Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={onChangeName}
            placeholder="İsim"
            value={name}
          />
           <TextInput
            style={styles.input}
            onChangeText={onChangeCity}
            placeholder="Şehir"
            value={city}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            placeholder="E-posta"
            value={email}
          />
          <View style={[styles.input, {flexDirection: 'row', justifyContent:'space-between', alignItems:'center'} ]}>
            <TextInput
              style={{fontSize:20, width:150}}
              onChangeText={onChangePassword}
              placeholder="Şifre"
              value={password}
              textContentType="password"
              secureTextEntry={!showPassword}
            />
            <IconButton icon={showPassword ? "eye-off-outline" : "eye-outline"} size={24} iconColor='gray' onPress={toggleShowPassword} />          
          </View>
          
          {loading ? (
          <ActivityIndicator />
          ) : (
            <CustomButton
              title="Gönder"
              onPress={handleSubmit}
              fontSize={20}
              backgroundColor={'slategray'}
              style={styles.submitButton}
            />) 
          }
          
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    main: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: 'black',
      color: 'white',
    },
    input: {
      width: 200,
      backgroundColor: 'white',
      fontSize: 20,
      marginBottom: 20,
      borderRadius: 5,
    },
    header: {},
    titleText: {
      textAlign: 'center',
      fontSize: 30,
      color: 'white',
    },
    submitButton: {
      marginBottom: 10,
      marginTop: 30
    },
  });


export default SignUp;