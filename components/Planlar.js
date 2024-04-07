import React from 'react';
import { Text, StyleSheet, View, SafeAreaView } from 'react-native';

const Planlar = () => {


    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>
                Planlar
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
        color:'white'
    },
    text: {
        color:'white'
    }
})

export default Planlar;