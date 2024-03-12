import React, { useState } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { View, Text, StyleSheet, Image, Button } from 'react-native';



const slides = [
    {
        key: 'slide1',
        title: 'Welcome to My App',
        text: 'This is the first slide',
        image: {uri: 'https://picsum.photos/200/400'  } //require('./images/slide1.png'),
    },
    {
        key: 'slide2',
        title: 'Discover Amazing Features',
        text: 'This is the second slide',
        image: {uri: 'https://picsum.photos/201/400'  } //require('./images/slide2.png'),
    },
    {
        key: 'slide3',
        title: "Let's get started!",
        text: '',
        image: {uri: 'https://picsum.photos/200/401'  } //require('./images/slide2.png'),
    },
];


const Intro = (props) => {

    const renderSlide = ({ item }) => {
        return (
            
            <View style={styles.slideContainer}>
                <Image source={item.image} style={styles.image} />
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
    
    const handleDone = () => {
        props.closeIntro();
    }

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
        fontSize: 24,
        marginTop: 16,
    },
    text: {
        color: 'beige',
        fontSize: 16,
        marginTop: 8,
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