import React from 'react';
import { Text, StyleSheet, View, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const Home = () => {


    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>
                Home Page
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignContent:'center',
        justifyContent:'center',
        backgroundColor:'black'
    },
    titleText: {
        textAlign: 'center',
        fontSize:24,
        color:'ivory'
    },
    text: {
        color:'ivory'
    }
})

export default Home;