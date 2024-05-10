import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, Button, Alert } from 'react-native';
import { auth } from '../firebase';
import { updatePassword } from 'firebase/auth';
import CustomButton from '../custom-components/CustomButton';
import { Modal, PaperProvider, Portal, TextInput } from 'react-native-paper';


const Account = () => {

    const [modalOpen, setModalOpen ] = useState(false);
    const [password, setPassword ] = useState('');
    const [password2, setPassword2 ] = useState('');

    function toggleModal(value) {
        setModalOpen(value)
    }

    function handleChangeValue(value) {
        setPassword(value)
    }

    function handleChangeValue2(value) {
      setPassword2(value)
  }

  function clearFields () {
    setPassword('');
    setPassword2('')
  }

    function handleSubmit() {
      if (password !== password2) {
        Alert.alert('Hata', 'Girilen şifreler birbirinden farklı.')
      }
      else {
      updatePassword(auth.currentUser, password).then(()=>{
        Alert.alert('Başarı', 'Parolanız başarıyla değiştirildi.')
        toggleModal(false);
        clearFields()
      }
      ).catch(err => {
        if (err.toString().includes('recent'))
          Alert.alert('Hata', 'Şifre değişimi için yakın zamanda giriş yapılmış olması gerekir.')
    })
    }
    }

    return (
      <PaperProvider>
        <View style={styles.main}>
          <View style={{flexDirection: 'row', margin:40}}>
            <Text style={styles.text}>E-posta:</Text>
            <Text style={styles.text}> {auth.currentUser.email}</Text>
          </View>

          <CustomButton
            backgroundColor="slategrey"
            title="Şifre Değiştir"
            onPress={()=>{toggleModal(true)}}
            style={{margin:40}}
          />

          <Portal>
            <Modal
              visible={modalOpen}
              onDismiss={()=>toggleModal(false)}
              contentContainerStyle={styles.modalContainer}>
              <Text style={styles.modalHeading}>Yeni şifre girin:</Text>
              <TextInput
                style={styles.modalInput}
                value={password}
                onChangeText={handleChangeValue}
                secureTextEntry
              />
              <Text style={styles.modalHeading}>Yeni şifreyi tekrar girin:</Text>
              <TextInput
                style={styles.modalInput}
                value={password2}
                onChangeText={handleChangeValue2}
                secureTextEntry
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 20,
                }}>
                <Button title="Tamam" onPress={handleSubmit} />
                <Button title="Vazgeç" onPress={()=>toggleModal(false)} />
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
        paddingHorizontal: 15,
        paddingTop:15
      },
    text: {
        color:'white',
        fontSize:18
    },
    modalContainer: {
        margin:30,
        backgroundColor: 'white',
        paddingVertical:100,
        paddingHorizontal:50
    },
    modalHeading: {

    },
    modalInput: {

    }
})

export default Account;