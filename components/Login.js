import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../custom-components/CustomButton';

const Login = () => {

    const [ username, setUsername ] = useState ( "" );
    const [ password, setPassword ] = useState ( "" );

    const onChangeUserName = () => {

    }

    const onChangePassword = () => {

    }

    const handleSubmit = () => {
        console.log('Pressed')
    }

    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.header}>
                <Text style={styles.titleText}>
                    Giriş
                </Text>
            </View>
            <View>
            <TextInput
                style={styles.input}
                onChangeText={onChangeUserName}
                placeholder='Kullanıcı Adı'
                value={username}
            />
             <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                placeholder='Şifre'
                value={password}
            />
            <CustomButton 
                title="Giriş Yap" 
                onPress={handleSubmit} 
                fontSize={20} 
                backgroundColor={'slategray'}
            />

            <Text style={styles.infoText}>Kaydolmak için tıklayın</Text>
      
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex:1,
        justifyContent:'space-around'
    },
    input: {
        width:200,
        backgroundColor:'ivory',
        fontSize: 20,
        marginBottom:20,
        borderRadius:5
    },
    header: {
        
    },
    titleText:{
        textAlign:"center",
        fontSize: 30,
        color: 'ivory',
    },
    infoText: {
        marginTop: 10,
        color: 'ivory',
        fontSize: 15
    }
})

export default Login