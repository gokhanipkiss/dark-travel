import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Alert, TextInput, Button, ActivityIndicator} from 'react-native';
import CustomButton from '../custom-components/CustomButton';
import {IconButton} from 'react-native-paper';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';


const SignUp = ({navigation}) => {
   
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
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

  function toggleShowPassword () {
    setShowPassword(!showPassword)
  }

  const handleSubmit = () => {
    setLoading(true);
    if ( name.replace(/\s/g,"") == "" ){
      Alert.alert('Hata', 'İsim boş olamaz.')
      setLoading(false)
    }
    else
      signUp(email, password, name)
  };

  const signUp = (email, password, name) => {
    createUserWithEmailAndPassword(auth, email, password).then(
        (credentials) => {
            updateProfile(auth.currentUser, {
              displayName: name
            })            
            console.log(credentials.user)
            Alert.alert("Başarı", "Kullanıcı başarıyla kaydedildi." /* , signUpSuccessButton */ )
        }
    ).catch(err => {
        if (err.toString().includes("weak-password"))
            Alert.alert("Hata", "Şifre yeterince güçlü değil.")
        else if (err.toString().includes("already-in-use"))
            Alert.alert("Hata", "Kullanıcı zaten mevcut.")
        else if (err.toString().includes("invalid"))
            Alert.alert("Hata", "E-posta adres biçimi geçersiz.")
        else
            console.log(err)
        }
    ).finally(
      setLoading(false)
    )
  }

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
            onChangeText={onChangeEmail}
            placeholder="E-posta"
            value={email}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeName}
            placeholder="İsim"
            value={name}
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
            <IconButton icon={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color={'black'} onPress={toggleShowPassword} />          
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
      justifyContent: 'space-around',
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
    infoText: {
      color: 'white',
      fontSize: 15,
    },
    remember: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: -20,
      marginBottom: 30,
    },
    submitButton: {
      marginBottom: 10,
    },
  });


export default SignUp;