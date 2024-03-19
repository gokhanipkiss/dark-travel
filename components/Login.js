import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, TextInput, Button, ActivityIndicator} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../custom-components/CustomButton';
import axios from 'axios';
import { Checkbox } from 'react-native-paper';
import { isLoggedIn } from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = () => {

    //TODO: Let's use useForm hook instead
    const [ username, setUsername ] = useState ( "" );
    const [ password, setPassword ] = useState ( "" );
    const [users, setUsers] = useState([]);
    const [loading, setLoading ] = useState(false);
    const [remember, setRemember ] = useState(false);

    async function getStorage () {
        const result = await AsyncStorage.getItem('username');
        if (result !== undefined && result !== null){
            setUsername(result)
            setRemember(true)
            //console.log("remembered user:" + result)
        }
    }

    useEffect(() => {
        getStorage()
    }, []);

    const getUsers = async () => {
        setLoading(true)
        let response = await axios.get('https://my-json-server.typicode.com/gokhanipkiss/mockJson/users');
        if (response.data) {
            console.log("Response : %O", response.data)
            setUsers(response.data)
        }
        else {
            console.log("Error: Could not get users")
        }
        setLoading(false);
    }    

    const onChangeUserName = (value) => {
        setUsername(value)
    }

    const onChangePassword = (value) => {
        setPassword(value)
    }

    //TODO: "Show Password" button

    const onChangeRemember = () => {        
        let oldValue = !!remember;
        setRemember(!oldValue)
    }

    const handleSubmit = async () => {
        if (users.length === 0) {
            await getUsers();       // if fetched once, no need to fetch again
        }

        await AsyncStorage.setItem('username', remember ? username : '')

        let user = users.find(i => i.name === username);        
        if (user){
            if(user.password === password)
                isLoggedIn.value = true;
            else
                console.log("Kullanici veya sifre hatali")
                //TODO : View on screen
        }
        else {
            let user = users.find(i => i.email === username);
             
            if(user && (user.password === password))
                isLoggedIn.value = true;
            else
                console.log("Kullanici veya sifre hatali")
                //TODO : View on screen
        }
    }

    return (
      <View style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.titleText}>Giriş</Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={onChangeUserName}
            placeholder="Kullanıcı adı/e-posta"
            value={username}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            placeholder="Şifre"
            value={password}
            textContentType="password"
            secureTextEntry
          />
          <View style={styles.remember}>
            <Checkbox
              color='ivory'
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
    backgroundColor: 'ivory',
    fontSize: 20,
    marginBottom: 20,
    borderRadius: 5,
  },
  header: {},
  titleText: {
    textAlign: 'center',
    fontSize: 30,
    color: 'ivory',
  },
  infoText: {
    color: 'ivory',
    fontSize: 15,
  },
  remember: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:-20,
    marginBottom:30
  },
  submitButton: {
    marginBottom:10
  }
});

export default Login