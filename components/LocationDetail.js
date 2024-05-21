import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image } from 'react-native';


const LocationDetail = ({navigation, route}) => {

    return (
       
        <View style={styles.main}>
            <Text style={[styles.text, {fontSize:22}]}>
                Location Detail ( {route.params.location} )
            </Text>
        </View>
        
    );
}

const styles = StyleSheet.create({
    main: {
        flex:1,
        backgroundColor:'black',
        justifyContent:'center',
        alignItems:'center'
    },
    text: {
        color: 'white',
        textShadowColor: 'dimgray',
        textShadowRadius: 10
    }
})

export default LocationDetail;