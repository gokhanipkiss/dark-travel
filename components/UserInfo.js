import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image } from 'react-native';
import { auth, getUser } from '../firebase';


const UserInfo = () => {

    const [userData, setUserData] = useState({});

    useEffect(() => {       
        getUser(auth.currentUser.uid).then(
            result => setUserData(result)
        ).catch(err => console.log(err));
    }, []);
       

    return (
       <SafeAreaView style={styles.main}>
            <View style={styles.line} >
                <Text style={styles.heading}>
                    İsim:
                </Text>
                <Text style={styles.text}>
                    {auth.currentUser.displayName}
                </Text>
            </View>
            <View style={styles.line} >
                <Text style={styles.heading}>
                    Şehir:
                </Text>
                <Text style={styles.text}>
                    {userData.location ? userData.location.toString() : ''}
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'black',
        padding: 30
      },
    line:{
        flexDirection: 'row',
        marginTop:10
    },
    heading:{
        color: 'white',
        fontWeight:'bold',
        fontSize:20,
        marginEnd: 5
    },
    text:{
        color: 'white',
        fontSize:20
    }
})

export default UserInfo;