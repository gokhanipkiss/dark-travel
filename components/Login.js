import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
  Alert, Dimensions, Image
} from 'react-native';
import CustomButton from '../custom-components/CustomButton';
import {Checkbox, IconButton, Modal, PaperProvider, Portal} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, getUser, signIn } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { _screen } from '../utils/Urls';
import { darkTheme } from '../utils/Theme';



const Login = ({navigation, route}) => {
  //TODO: Let's use useForm hook instead
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword ] = useState(false);

  const [forgotModalOpen, setForgotModalOpen ] = useState(false);
  const [emailToSend, setEmailToSend ] = useState('');

  async function getStorage() {
    const result = await AsyncStorage.getItem('email');
    if (result !== undefined && result !== null) {
      setEmail(result);
      setRemember(true);
    }
  }

  useEffect(() => {
    getStorage();
  }, []);

  const handleSignUp = () => {
    navigation.push('SignUp')
  }

  const onChangeEmail = value => {
    setEmail(value);
  };

  const onChangePassword = value => {
    setPassword(value);
  };
  
  const onChangeRemember = () => {
    let oldValue = !!remember;
    setRemember(!oldValue);
  };

  function toggleShowPassword () {
    setShowPassword(!showPassword)
  } 
  
  function handleResetPassword () {   
    sendPasswordResetEmail(auth, emailToSend)
      .then(() => {
        Alert.alert('Başarı','Şifre yenileme talimatı e-posta adresinize gönderildi.')
        setEmailToSend('')
      })
      .catch((error) => {
        Alert.alert('Hata', error.toString())
      });
  }

  const handleSubmit = () => {
    AsyncStorage.setItem('email', remember ? email : '');
    signIn(email, password, navigation)
  };  
 
  return (
    <PaperProvider>
      <View style={styles.main}>
        <View style={styles.header}>
          <Image source={require('../assets/images/odisea-logo1.png')} />
          <Text style={styles.titleText}>odisea</Text>
          <View style={{marginTop:50}}>
            <TextInput
              style={[styles.input, styles.textInput]}
              onChangeText={onChangeEmail}
              placeholder="E-posta"
              placeholderTextColor='gray'
              value={email}
            />
            <View
              style={[
                styles.input, styles.textInput,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                },
              ]}>
              <TextInput
                style={{fontSize: 18, width: '85%', color:'white', fontFamily:'Lexend-Light'}}
                onChangeText={onChangePassword}
                placeholder="Şifre"
                placeholderTextColor='gray'
                value={password}
                textContentType="password"
                secureTextEntry={!showPassword}
              />
              <IconButton
                icon={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                iconColor={'gray'}
                onPress={toggleShowPassword}
              />
            </View>
            <View style={styles.remember}>
              <Checkbox
                color="white"
                status={remember ? 'checked' : 'unchecked'}
                onPress={onChangeRemember}
              />
              <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                <View >
                  <Text style={styles.infoText}> Beni hatırla </Text>
                </View>
                <View >
                  <Text style={[styles.infoText, {textDecorationLine: 'underline'}]} onPress={()=>{setForgotModalOpen(true)}}>Şifremi unuttum</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
       
        <View>
        {loading ? (
            <ActivityIndicator />
          ) : (
            <CustomButton
              title="Giriş Yap"
              onPress={handleSubmit}
              fontSize={18}
              backgroundColor={darkTheme.primary}
              style={styles.submitButton}
            />
          )}
          

          <Text style={[styles.infoText, {textDecorationLine: 'underline', textAlign:'center'}]} onPress={handleSignUp}>
            Kaydolmak için tıklayın
          </Text>
        </View>
      </View>
      <Portal>
          <Modal
            visible={forgotModalOpen}
            onDismiss={()=>{setForgotModalOpen(false)}}
            contentContainerStyle={styles.modalContainer}>
            <Text style={styles.modalHeading}> E-posta adresinizi girin: </Text>
            <TextInput
              style={styles.modalInput}
              value={emailToSend}
              onChangeText={ (value) => {setEmailToSend(value)} }
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 20,
              }}>              
              <CustomButton title='Vazgeç' onPress={() => {setForgotModalOpen(false) } } thin backgroundColor={darkTheme.secondary} fontSize={13} />
              <CustomButton title='Tamam' onPress={handleResetPassword} thin backgroundColor={darkTheme.primary} fontSize={13} />
            </View>
          </Modal>
      </Portal>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: darkTheme.backgroundColor
  },
  input: {
    width: _screen.width * 0.9,
    backgroundColor: darkTheme.backgroundColor,
    fontSize: 18,
    fontFamily: 'Lexend-Light',
    marginBottom: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: darkTheme.borderColor,
    color: darkTheme.textColor
  },
  textInput: {
    paddingLeft: 8
  },
  header: {
    alignItems:'center'
  },
  titleText: {
    textAlign: 'center',
    fontSize: 30,
    color: darkTheme.textColor,
    fontFamily: 'Lexend-SemiBold'
  },
  infoText: {
    color: darkTheme.textColor,
    fontSize: 15,
    fontFamily: 'Lexend-Light'
  },
  remember: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -20,
    marginBottom: 30,
  },
  submitButton: {
    marginBottom: 10,
    height:42,
    width: _screen.width * 0.9
  },
  modalContainer: {
    margin:30,
    backgroundColor: 'ivory',
    paddingVertical:100,
    paddingHorizontal:50,
    borderRadius:10
  },
  modalHeading: {
    color:'black',
    fontFamily: 'Lexend-SemiBold',
    marginBottom:5
  },
  modalInput: {
    backgroundColor: 'lightgray',
    borderRadius: 5,
    fontFamily: 'Lexend-Regular',
    paddingHorizontal:7,
    color: 'black'
  }
});

export default Login;
