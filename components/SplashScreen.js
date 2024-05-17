import React from 'react';
import { SafeAreaView, View, Image, ImageBackground, Text, StyleSheet, Dimensions } from 'react-native';
import { _screen } from '../utils/Urls';

const SplashScreen = () => {
    return (
        <SafeAreaView>
            <ImageBackground source={require('../assets/images/splash.jpg')} style={styles.image}>
                <View style={styles.container}>                    
                    <Text style={styles.title}>odisea</Text>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: _screen.width,
        height: _screen.height,
        opacity:0.7
    },
    container: {
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center'
    },
    title: {
        marginBottom: 200,
        fontSize: 50,
        fontFamily: 'sans-serif-condensed',
        fontWeight: 'bold',
        color:'black'
    }

})

export default SplashScreen