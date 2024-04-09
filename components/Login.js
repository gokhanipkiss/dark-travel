import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
  Alert
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../custom-components/CustomButton';
import {Checkbox, IconButton} from 'react-native-paper';
import {currentUser, isLoggedIn} from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { mockJsonUrl } from '../utils/Urls';


const errorMessages= {
    emailErrorTitle: "Bu e-posta ile herhangi bir kayıt bulunmadı",
    passwordErrorTitle: "Hatalı şifre",
    connectionErrorTitle: "Bağlantı hatası"
}

const Login = () => {
  //TODO: Let's use useForm hook instead
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword ] = useState(false);

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

  const getUsers = async () => {
    setLoading(true);
    try {
      let response = await axios.get(
        '/api/users',
      );
      if (response.data) {
        console.log('Response : %O', response.data);
        setUsers(response.data);
        checkUserAndPassword(response.data);
      }
    } catch (err) {
      showAlert('connection');
    }
    setLoading(false);
  };

  const onChangeEmail = value => {
    setEmail(value);
  };

  const onChangePassword = value => {
    setPassword(value);
  };

  //TODO: "Show Password" button

  const onChangeRemember = () => {
    let oldValue = !!remember;
    setRemember(!oldValue);
  };

  function toggleShowPassword () {
    setShowPassword(!showPassword)
  }

  function checkUserAndPassword(usersData) {
    let users_ = usersData || users;
    let user = users_.find(i => i.email === email);
    if (user) {        
        if (user.password === password){
          isLoggedIn.value = true;
          currentUser.value = user
        } 
        else showAlert('password')
        
    } else showAlert('email')
  }

  const handleSubmit = async () => {
    if (users.length === 0) {
      // if fetched once, no need to fetch again
      getUsers();
    } else {
      checkUserAndPassword();
    }
    await AsyncStorage.setItem('email', remember ? email : '');
  };

  function showAlert(type) {
    console.log(type)
    const {emailErrorTitle, passwordErrorTitle, connectionErrorTitle} = errorMessages;
     Alert.alert(
        type === 'email' ? emailErrorTitle : (type === 'password' ? passwordErrorTitle : connectionErrorTitle),
        "",
        [
            {
                text: 'Tamam',
                onPress: () => {}
            }
        ],
        {
            cancelable: true,
            onDismiss: () => {}
        }
     )
  }
 
  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.titleText}>Giriş</Text>
      </View>
      <View>
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
          <IconButton icon={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color={'black'} onPress={toggleShowPassword} />          
        </View>
        <View style={styles.remember}>
          <Checkbox
            color="white"
            status={remember ? 'checked' : 'unchecked'}
            onPress={onChangeRemember}
          />
          <Text style={styles.infoText}>Beni hatırla</Text>
        </View>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <CustomButton
            title="Giriş Yap"
            onPress={handleSubmit}
            fontSize={20}
            backgroundColor={'slategray'}
            style={styles.submitButton}
          />
        )}

        <Text style={styles.infoText}>Kaydolmak için tıklayın</Text>
      </View>
    </View>
  );
};

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

export default Login;
