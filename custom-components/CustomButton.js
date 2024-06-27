import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';


// This is the button I made. Also RectButton of GestureHandler can be handy.

function CustomButton({title, onPress, fontSize, fontWeight, backgroundColor, style, thin, disabled}) {
    if (disabled) 
        return (
            <View style={[styles.container,  backgroundColor && {backgroundColor}, style && style]} >
                <Text style={[styles.text, thin && styles.thin, fontSize && {fontSize}, fontWeight && {fontWeight}]}>
                    {title} 
                </Text>
            </View>
        )
    else 
        return (
            <TouchableOpacity 
                style={[styles.container,  backgroundColor && {backgroundColor}, style && style]}
                onPress={onPress}
                >
                <Text style={[styles.text, thin && styles.thin, fontSize && {fontSize}, fontWeight && {fontWeight}]}>
                    {title} 
                </Text>
            </TouchableOpacity>
        )
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 5,
        paddingVertical:7,
        paddingHorizontal: 15,
        width: 'auto',
        backgroundColor: 'transparent'
    },
    text: {
        fontSize: 16,
        fontFamily: 'Lexend-SemiBold',
        color: 'white',
        textTransform: 'none',
    },
    thin: {
        fontFamily: 'Lexend-Regular'
    }
})


export default CustomButton;