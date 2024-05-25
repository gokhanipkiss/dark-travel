import { TouchableOpacity, StyleSheet, Text } from 'react-native';


function CustomButton({title, onPress, fontSize, fontWeight, backgroundColor, style, thin}) {

    return (
        <TouchableOpacity 
            style={[styles.container,  backgroundColor && {backgroundColor}, style && style]}
            onPress={onPress}
            >
            <Text style={[styles.text, thin && styles.thin, fontSize && {fontSize}, fontWeight && {fontWeight}]}>
                 {title} 
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 5,
        paddingVertical:5,
        paddingHorizontal: 10,
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