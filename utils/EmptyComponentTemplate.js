import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, Button, ScrollView, ImageBackground } from 'react-native';


const Template = () => {

    return (
       
        <View style={styles.main}>
            <Text style={styles.text}>

            </Text>
        </View>

    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'black',
        paddingHorizontal: 15,
        paddingTop:15
      },
    text: {
        color:'white'
    },
})

export default Template;