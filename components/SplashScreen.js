import React from 'react';
import { SafeAreaView, View, Image, ImageBackground, Text, StyleSheet, Dimensions } from 'react-native';
import { _screen } from '../utils/Urls';
import { darkTheme } from '../utils/Theme';

const SplashScreen = () => {
    return (
        <SafeAreaView>
            <ImageBackground blurRadius={10} source={require('../assets/images/background1.png')} style={styles.image}>
                <View style={styles.container}>
                    <Image source={require('../assets/images/odisea-logo1.png')} />                    
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
        opacity:0.7,
        backgroundColor:darkTheme.backgroundColor
    },
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    title: {
        marginBottom: 100,
        fontSize: 50,
        fontFamily: 'Lexend-SemiBold',
        color: darkTheme.textColor
    }

})

export default SplashScreen