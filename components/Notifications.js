import React, {useState, useEffect} from 'react';
import { Button, SafeAreaView, View, Text, StyleSheet, Image, Alert, TextInput, Dimensions } from 'react-native';
import { auth, db, getUser, storage } from '../firebase';
import { IconButton } from 'react-native-paper'
import { userAddnlInfo } from '../App';
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { darkTheme } from '../utils/Theme';
import CustomButton from '../custom-components/CustomButton';
import { ref } from 'firebase/storage';
import { _screen } from '../utils/Urls';
import { ScrollView } from 'react-native-gesture-handler';


const Notifications = ({navigation}) => {

    const [notifications, setNotifications] = useState([]);
    const [selectedId, setSelectedId ] = useState(null);

    useEffect(() => {
        getNotifications()
    }, []);

    

    const getNotifications = () => {
      getDocs(collection(db, 'users/' + auth.currentUser.uid + '/notifications'))
      .then(snapshot => {
        let arr = []
        snapshot.forEach(
          s => {
            //console.log('%O',s.id)
            arr.push({...s.data(), id: s.id })
          }
        )
        setNotifications(arr)
        console.log('array: %O', arr)
      })
      .catch(err => console.log(err.toString()));
      }

    const toggleSelectNotification = (id) => {
      if(selectedId !== id){
        setSelectedId(id)
      }
      else
        setSelectedId(null)
    }

    const handleRead = (id) => {
      const notificationRef = doc(db, 'users/' + auth.currentUser.uid + '/notifications/' + id)
      setDoc(notificationRef, {unread: false}, {merge: true}
        ).then(() =>
          getNotifications()
        ).catch(err =>
          Alert.alert('Hata', err)
        )
    }

    const handleDelete = (id) => {
      
      Alert.alert('Uyarı','Bildirimi silmek istiyor musunuz?',[{text:'Vazgeç', onPress:()=>{}}, {text:'Tamam', onPress:()=>doDelete(id)}])
      
    }

    const doDelete = (id) => {
      let notificationRef = doc(db, 'users/' + auth.currentUser.uid + '/notifications/' + id)
      deleteDoc(notificationRef
        ).then(()=> {
          
          getNotifications()
        }
        ).catch((err)=>console.log(err))
    } 

    const NotificationLine = ({notification, index}) => {
      return (
          <View style={[styles.line, index === 0 && styles.firstLine]}>
            <View style={styles.lineLeft} onTouchStart={() => {
                toggleSelectNotification(notification.id)
                if (notification.unread)
                  handleRead(notification.id)
                }
              }
              >
              <Text style={[styles.heading, notification.unread && styles.headingUnread]}>
                {notification.title}
              </Text>
              <Text style={[styles.text, notification.unread && styles.textUnread]} ellipsizeMode="tail" numberOfLines={(notification.id !== selectedId) ? 1 : undefined}>
                {notification.body}
              </Text>
            </View>
            <View style={styles.lineRight}>
              <Text style={styles.text}>
                <IconButton
                  icon="delete-outline"
                  size={26}
                  iconColor="white"
                  onPress={() => {
                    handleDelete(notification.id)
                  }}
                />
              </Text>
            </View>
          </View>
      );
    };

    return (
      <View style={[styles.main, notifications.length === 0 && {justifyContent:'center'}]}>
        {notifications.length > 0 ? (
          <ScrollView style={styles.scrollView} >
            {notifications.map((item, index) => {
              return <NotificationLine key={item.id} notification={item} index={index} />;
            })}
          </ScrollView>
        ) : (
          <Text style={[styles.heading, {textAlign:'center'}]}>Hiç bildiriminiz bulunmuyor.</Text>
        )}
      </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'black',
        width:_screen.width,
        justifyContent: 'flex-start'
      },
    scrollView: {
        paddingVertical:10,
        paddingHorizontal:5,
    },
    line: {
        flexDirection: 'row',
        width:'100%',        
        paddingHorizontal: 5,
        paddingVertical:2,
        alignItems:'center',
        borderColor:'gray',
        borderBottomWidth:1,
        justifyContent:'space-between',
        marginVertical:1
    },
    firstLine: {
        borderTopWidth:1,
    },
    lineLeft: {
         width:'85%'
    },    
    lineRight: {
         width: '10%'           
    },
    trash:{
        textAlign:'right'        
    },
    heading:{
        color: 'white',
        fontFamily: 'Lexend-Light',
        fontSize:18,
        lineHeight: 30        
    },
    text:{
        color: 'white',
        fontSize:15,
        fontFamily: 'Lexend-Thin'
    },
    textUnread: {
        fontFamily: 'Lexend-SemiBold'
    },
    headingUnread: {
        fontFamily: 'Lexend-Bold'
    }
})

export default Notifications;