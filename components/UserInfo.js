import React, {useState, useEffect} from 'react';
import { Button, SafeAreaView, View, Text, StyleSheet, Image, Alert, TextInput } from 'react-native';
import { auth, db, getUser, storage } from '../firebase';
import { IconButton, Modal, PaperProvider, Portal } from 'react-native-paper';
import { userAddnlInfo } from '../App';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { updateCurrentUser, updateProfile } from 'firebase/auth';
import { darkTheme } from '../utils/Theme';
import CustomButton from '../custom-components/CustomButton';
// import DocumentPicker from 'react-native-document-picker';
import { launchImageLibrary } from 'react-native-image-picker';
// import RNFS from 'react-native-fs'
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from 'firebase/storage';


const UserInfo = ({navigation}) => {       

    const [modalOpen, setModalOpen ] = useState(false);
    const [editProperty, setEditProperty] = useState('');
    const [editValue, setEditValue ] = useState('');
    const [uploading, setUploading ] = useState(false);

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

    async function handleUploadImage() {
      try {
        // const pickedFile = await DocumentPicker.pickSingle({
        //   type: [DocumentPicker.types.images],
        // });

        let res = await launchImageLibrary()
        

        // await RNFS.readFile(pickedFile.uri, 'ascii').then(data => {
        
        if (res && !res.didCancel){
          setUploading(true)
          let file = res.assets[0];
          let id = auth.currentUser.uid;
          const storageRef = ref(storage, 'avatars/' + id + (file.fileName.split('.')[1]));
          
          const response = await fetch(file.uri);
          const blob = await response.blob();

          // Base64 formatted string
          //const message2 = '5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
          // uploadString(storageRef, data, 'raw' ,{contentType:'image/jpeg'}).then((snapshot) => {
          //   console.log('Uploaded a base64 string!');
          // });

          uploadBytes(storageRef, blob).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(url => {
              updateProfile(auth.currentUser, {
                photoURL: url
              })
              .then(()=>{
                userAddnlInfo.value.photoURL = url;
                updateDoc(doc(db,'users',auth.currentUser.uid), 'photoURL', url).then(() =>
                {
                  Alert.alert('Başarı', 'Profil resmi başarıyla değiştirildi.')
                })
              }
              ).catch(err => Alert.alert('Hata','Kullanıcı bilgileri güncellenemedi: ' + err)
              ).finally(
                () => setUploading(false)
              )
            })
            }
            ).catch(error => Alert.alert('Hata','Kullanıcı bilgileri güncellenemedi: ' + error))
        }
        else if (res && res.errorMessage){
          Alert.alert('Hata', errorMessage)
        }

      } catch (er) {
        Alert.alert('Hata', 'Resim yüklenemedi: ' + er);
      }
      //TODO : Insert Progress indicator
    }

    return (
      <PaperProvider>
        <View style={styles.main}>
          <InfoLine type="name" heading="İsim" />
          <InfoLine type="location" heading="Şehir" />
          <InfoLine type="age" heading="Yaş" />
          <InfoLine type="sex" heading="Cinsiyet" />

          <CustomButton disabled={uploading} title={uploading ? 'Yükleniyor... ' : 'Profil resmi değiştir'} thin backgroundColor={uploading ? '#00e6e6' : 'teal'} onPress={handleUploadImage} style={{width:200, marginTop:30, paddingVertical:10}} />

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
      color:'black',
      fontFamily: 'Lexend-SemiBold',
      marginBottom: 5
    },
    modalInput: {
      backgroundColor: 'lightgray',
      borderRadius:5,
      fontFamily: 'Lexend-Regular',
      color: 'black',
      paddingHorizontal:7
    }
})

export default UserInfo;