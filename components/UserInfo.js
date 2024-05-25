import React, {useState, useEffect} from 'react';
import { Button, SafeAreaView, View, Text, StyleSheet, Image, Alert, TextInput } from 'react-native';
import { auth, db, getUser } from '../firebase';
import { IconButton, Modal, PaperProvider, Portal } from 'react-native-paper';
import { userAddnlInfo } from '../App';
import { doc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { darkTheme } from '../utils/Theme';
import CustomButton from '../custom-components/CustomButton';


const UserInfo = ({navigation}) => {       

    const [modalOpen, setModalOpen ] = useState(false);
    const [editProperty, setEditProperty] = useState('');
    const [editValue, setEditValue ] = useState('');

    const InfoLine = (props) => {
        return (
            <View style={styles.line} >
            <Text style={styles.heading}>
                {props.heading}:
            </Text>
            <Text style={styles.text}>
                {props.type === 'name' ? auth.currentUser.displayName : (userAddnlInfo ? userAddnlInfo.value[props.type] : '')}
            </Text>
            <Text style={styles.pencil}>
                <IconButton  icon='pencil' size={26} iconColor='white' onPress={()=>{handleOpenEdit(props.type)}} />
            </Text>
        </View>
        )
    }

    async function handleEdit () {
        if (editProperty !== 'name')        // Because user name is in a different table
        {   
            let obj = userAddnlInfo.value;
            obj[editProperty] = editValue;
            setDoc(doc(db, 'users', auth.currentUser.uid), obj)
              .then(() => {
                console.log('Data edit successful');
                getUser(auth.currentUser.uid)
                  .then(result => {
                    userAddnlInfo.value = result;
                  })
                  .catch(err => console.log(err.toString()));
              })
              .catch(err =>
                Alert.alert('Hata', 'Güncelleme yapılamadı: ' + err.toString()),
              )
              .finally(handleCloseEdit());
        }
        else {
            updateProfile(auth.currentUser, {displayName: editValue}).then(()=>
                {auth.updateCurrentUser({...auth.currentUser, displayName: editValue});
                navigation.push('Profil Bilgileri')
                }
            ).catch(err =>
                Alert.alert('Hata', 'Güncelleme yapılamadı: ' + err.toString()),
            ).finally(
                handleCloseEdit()
            )
        }
    }
   

    function handleOpenEdit (type) {
        setModalOpen(true)
        setEditProperty(type)   // then see useEffect below
    }

    useEffect(() => {       // I've placed useEffect here because it's just a callback to the function above
        setEditValue(editProperty === 'name' ? auth.currentUser.displayName : (userAddnlInfo.value[editProperty] || ''))
    }, [editProperty]);

    function handleCloseEdit () {
        setModalOpen(false)
    }

    function handleChangeValue (value) {
        setEditValue(value)
    }

    return (
      <PaperProvider>
        <View style={styles.main}>
          <InfoLine type="name" heading="İsim" />
          <InfoLine type="location" heading="Şehir" />
          <InfoLine type="age" heading="Yaş" />
          <InfoLine type="sex" heading="Cinsiyet" />

          <Portal>
            <Modal
              visible={modalOpen}
              onDismiss={handleCloseEdit}
              contentContainerStyle={styles.modalContainer}>
              <Text style={styles.modalHeading}>
                Yeni değer girin:
              </Text>
              <TextInput 
                style={styles.modalInput}
                value={editValue}
                onChangeText={handleChangeValue}
              />
              <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:20}}>
                <CustomButton title='Vazgeç' onPress={handleCloseEdit} thin backgroundColor={darkTheme.secondary} fontSize={13} />
                <CustomButton title='Tamam' onPress={handleEdit} thin backgroundColor={darkTheme.primary} fontSize={13} />
              </View>
              
            </Modal>
          </Portal>
        </View>
      </PaperProvider>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'black',
        padding: 30
      },
    line:{
        flexDirection: 'row',
        marginTop:10,
        alignItems:'center'
    },
    pencil:{
        textAlign:'right',
        flexGrow:3
    },
    heading:{
        color: 'white',
        fontFamily: 'Lexend-SemiBold',
        fontSize:18,
        marginEnd: 5
    },
    text:{
        color: 'white',
        fontSize:18,
        fontFamily: 'Lexend-Light'
    },
    modalContainer: {
        margin:30,
        backgroundColor: 'ivory',
        paddingVertical:100,
        paddingHorizontal:50,
        borderRadius:10
    },
    modalHeading: {
      fontFamily: 'Lexend-SemiBold',
      marginBottom:5
    },
    modalInput: {
      backgroundColor: 'lightgray',
      borderRadius:5,
      fontFamily: 'Lexend-Regular',
      paddingHorizontal:7
    }
})

export default UserInfo;