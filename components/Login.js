import React, { useState } from 'react';
import {View, Text, StyleSheet} from 'react-native'

const Login = () => {
    return (
        <View>
            <Text style={styles.text}>Login</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text:{
        color: 'beige',
        fontSize: 20
    }
})

export default Login