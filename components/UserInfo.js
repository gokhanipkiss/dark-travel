import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image } from 'react-native';
import { auth, getUser } from '../firebase';
import { IconButton } from 'react-native-paper';
import { userAddnlInfo } from '../App';


const UserInfo = () => {       


    return (
       <SafeAreaView style={styles.main}>
            <View style={styles.line} >
                <Text style={styles.heading}>
                    İsim:
                </Text>
                <Text style={styles.text}>
                    {auth.currentUser.displayName}
                </Text>
                <Text style={styles.pencil}>
                    <IconButton  icon='pencil' size={26} iconColor='white' onPress={()=>{console.log("pressed")}} />
                </Text>
            </View>
            <View style={styles.line} >
                <Text style={styles.heading}>
                    Şehir:
                </Text>
                <Text style={styles.text}>
                    {userAddnlInfo.value.location || ''}
                </Text>
                <Text style={styles.pencil}>
                    <IconButton  icon='pencil' size={26} iconColor='white' onPress={()=>{console.log("pressed")}} />
                </Text>
            </View>
            <View style={styles.line} >
                <Text style={styles.heading}>
                    Yaş:
                </Text>
                <Text style={styles.text}>
                    {userAddnlInfo.value.age || ''}
                </Text>
                <Text style={styles.pencil}>
                    <IconButton  icon='pencil' size={26} iconColor='white' onPress={()=>{console.log("pressed")}} />
                </Text>
            </View>
            <View style={styles.line} >
                <Text style={styles.heading}>
                    Cinsiyet:
                </Text>
                <Text style={styles.text}>
                    {userAddnlInfo.value.sex || ''}
                </Text>
                <Text style={styles.pencil}>
                    <IconButton  icon='pencil' size={26} iconColor='white' onPress={()=>{console.log("pressed")}} />
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
        marginTop:10,
        alignItems:'center'
    },
    pencil:{
        textAlign:'right',
        flexGrow:3
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