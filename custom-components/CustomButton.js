import { TouchableOpacity, StyleSheet, Text } from 'react-native';


function CustomButton({title, onPress, fontSize, backgroundColor}) {

    return (
        <TouchableOpacity 
            style={[styles.container,  backgroundColor && {backgroundColor}]}
            onPress={onPress}
            >
            <Text style={[styles.text, fontSize && {fontSize}]}>
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
        color: 'ivory',
        textTransform: 'none',
    }
})


export default CustomButton;