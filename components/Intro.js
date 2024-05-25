import React, { useState } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { View, Text, StyleSheet, Image, Button, ImageBackground } from 'react-native';


const slides = [
    {
        key: 'slide1',
        title: 'Seyahatin karanlık tarafına hoş geldin!',
        text: '',
        image: require('../assets/images/onboarding1.png')
    },
    {
        key: 'slide2',
        title: '',
        text: 'Gizemli ve korkunç yerlere keşfe çık. Perili savaş alanlarından terkedilmiş hapishanelere kadar, bilinmezlik heyecanını seven herkes için burada bir şeyler var.',
        image: require('../assets/images/onboarding2.png'),
    },
    {
        key: 'slide3',
        title: '',
        text: 'Benzersiz ilgi alanlarına sahip insanlarla bir araya gel. Gizem ve keşif tutkunu diğer gezginlerle tanış, maceranı paylaş ve karanlık yerleri birlikte keşfet.',
        image: require('../assets/images/onboarding3.png'),
    },
    {
        key: 'slide4',
        title: 'Gerçeklerle yüzleşmeye hazır mısın?',
        text: '',
        image: require('../assets/images/odisea-logo1.png')
    },
];


const Intro = (props) => {

    const renderSlide = ({ item }) => {
        return (
                        
            <View style={styles.slideContainer}>                
                <Image source={item.image} style={(item.key !== 'slide4') ? styles.image : null} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}>{item.text}</Text>                
                <Text>
                    {/* {(item.key !== 'slide3') ?                        
                        <View style={styles.buttonContainer}>
                            <Button title='Skip' color={'black'} onPress={handleDone} />
                            <Button title='Next' color={'black'} onPress={handleNext} />
                        </View>                        
                        :
                        <View style={styles.buttonContainer}>
                            <Button title='Done' color={'black'} onPress={handleDone} />
                        </View>
                    } */}
                </Text>                
            </View>
           
        );
    }; 
    
    // const handleDone = () => {
    //     props.closeIntro();
    // }

    const renderDoneButton = () => {
        return <Button title='Done' color={'black'} onPress={props.closeIntro} />
    }

    return (
        <AppIntroSlider
            data={slides}
            renderItem={renderSlide}
            showNextButton={true}
            showDoneButton={true}            
            renderDoneButton={renderDoneButton}
            dotStyle={styles.dot}
        />
    )
}

const styles = StyleSheet.create({
    slideContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    image: {
        width: 200,
        height: 400,
    },
    title: {
        color: 'beige',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Lexend-SemiBold',
        marginTop: 16,
        marginHorizontal:5
    },
    text: {
        color: 'beige',
        fontSize: 16,
        fontFamily: 'Lexend-SemiBold',
        textAlign: 'center',
        marginTop: 8,
        marginHorizontal:5
    },
    buttonContainer: {
        width:200,
        marginTop:60,
        marginBottom: -60,
        flex:0.2,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    dot: {
        backgroundColor: 'dimgray'
    }
});

export default Intro