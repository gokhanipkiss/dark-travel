import React, {useEffect, useState} from 'react';
import { Text, StyleSheet, View, SafeAreaView, Image, ImageBackground } from 'react-native';
import { HeaderSection } from './Home';
import { ActivityIndicator, Card } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Timestamp, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db, placesRef, plansRef, toursRef } from '../firebase';
import CustomButton from '../custom-components/CustomButton';
import { darkTheme } from '../utils/Theme';

const Planlar = () => {

    const [locations, setLocations] = useState([]);    
    const [tours, setTours] = useState([]);
    const [plans, setPlans ] = useState([]);
    const [loadingLocations, setLoadingLocations] = useState(true);
    const [loadingTours, setLoadingTours ] = useState(true);
    const [loadingPlans, setLoadingPlans ] = useState(true);

    const getLocations = () => {
        let arr = []
        getDocs(placesRef)
          .then(result => {
            result.docs.map(doc => {
              let obj = {...doc.data()}   // Because this damn firestore holds the id outside the table!
              obj.id = doc.id;
              arr.push(obj)
            });
            setLocations(arr);
            //console.log('locations: %O', arr)
          })
          .catch(err => console.log(err.toString()))
          .finally(setLoadingLocations(false));
      };
  
      const getTours = () => {
        let arr = []
        getDocs(toursRef)
          .then(result => {
            result.docs.map(doc => arr.push(doc.data()));
            setTours(arr);
          })
          .catch(err => console.log(err.toString()))
          .finally(setLoadingTours(false));
      };

      const getPlans = () => {
        let arr = []
        getDocs(plansRef)
          .then(result => {
            result.docs.map(docm => {
              let obj = {...docm.data()}
              obj.id = docm.id;
              getDoc(doc(db, 'places/' + obj.routeIds[0])).then(   // Because this damn firestore does not return collections of a document in .data()!
                (res) => {
                    obj.picUrl = res.data().thumbUrl
                    arr.push(obj)
                    setPlans(arr)
                    console.log(arr)
                }
              ).catch(err => console.log(err))
            })            
          })
          .catch(err => console.log(err.toString()))
          .finally(setLoadingPlans(false));

      }

    useEffect(() => {
        getLocations();
        getTours();
        getPlans()
    }, []);

    const {text,  titleText, locationCard, locationImage, locationInfo, tourCard, tourInfo, tourImage,
            tourLeader, leaderImage, placesContainer } = styles

    return (
        <View style={styles.container}>
            <ScrollView>
                
                { plans.length > 0 &&
                  (
                    plans.map(
                        (item, index) => { return (
                            <View style={styles.planCard} >
                                <View >
                                    <Image style={styles.planImage} source={item.picUrl ? {uri:item.picUrl} : require('../assets/images/image-not-found.png')} />
                                </View>
                                <View style={styles.planRight}>
                                    <Text style={styles.planTitle}> {item.name} </Text>
                                    <Text style={styles.text}> { item.startDate.toDate().toDateString() } - { item.endDate.toDate().toDateString() } </Text>
                                </View>
                            </View> )
                        }
                    )
                  )
                }

                <CustomButton title={'Yeni Plan Oluştur'} backgroundColor={darkTheme.primary} />
                
                <HeaderSection titleText="Beğenebileceğin Öneriler" />
                {loadingLocations ? (
                <ActivityIndicator />
                ) : (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={placesContainer}>
                    {locations.map((item, index) => {
                    return (
                        <Card key={index} style={locationCard} onPress={()=>{
                        navigation.navigate('LocationDetail', {place: item})
                        }}>
                        <Image
                            source={{uri: item.thumbUrl}}
                            style={locationImage}
                        />
                        <View style={locationInfo}>
                            <Text
                            style={[titleText, {fontSize: 16, marginBottom: 0}]}>{item.name}</Text>
                            <View style={{flexDirection: 'row'}}>
                            <Icon name="location-on" color="teal" size={20} />
                            <Text style={text}>{item.location}</Text>
                            </View>
                        </View>
                        </Card>
                    );
                    })}
                </ScrollView>
                )}

                <HeaderSection titleText="Beğenebileceğin Turlar" />
                {loadingTours ? (
                <ActivityIndicator />
                ) : (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={placesContainer}>
                    {tours.map((item, index) => {
                    return (
                        <Card key={index} style={tourCard}>
                        <ImageBackground
                            source={{uri: item.thumbUrl}}
                            style={tourImage}
                            borderRadius={10}>
                            <View style={tourLeader}>
                            <Image
                                source={require('../assets/images/avatar4_.jpg')}
                                style={leaderImage}
                            />
                            <View>
                                <Text
                                style={[
                                    titleText,
                                    {fontSize: 16, marginBottom: 0},
                                ]}>
                                    {item.leader}
                                </Text>
                                <Text style={text}>{item.leaderTitle}</Text>
                            </View>
                            </View>
                            <View style={tourInfo}>
                            <Text
                                style={[
                                titleText,
                                {fontSize: 16, marginBottom: 0},
                                ]}>
                                {item.name}
                            </Text>
                            <Text style={text}>{item.body} </Text>
                            </View>
                        </ImageBackground>
                        </Card>
                    );
                    })}
                </ScrollView>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'black',
        padding:10
    },
    titleText: {
        textAlign: 'center',
        fontSize:24,
        color:'white'
    },
    text: {
        color:'white',
        fontFamily: darkTheme.fontLight
    },
    planTitle: {
        color: 'white',
        fontSize: 20,
        fontFamily: darkTheme.fontSemiBold
    },
    planCard: {
        flexDirection:'row',
        height:'auto',
        marginBottom:10
    },
    planImage: {
        width: 100,
        height: 120,
        borderRadius:10
    },
    planRight: {
        padding: 5
    },
    placesContainer: {
        paddingVertical: 10
      },
      locationCard: {
        borderRadius: 10,
        width: 150,
        height: 150,
        backgroundColor: 'gray',
        marginRight: 10,
      },
      locationImage: {
        width: 'auto',
        height: 100,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },
      locationInfo: {
        padding: 5,
      },
      toursHeader: {},
      toursContainer: {},
      tourCard: {
        width: 200,
        height: 240,
        marginRight: 10,
        borderRadius: 10,
      },
      tourImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        borderRadius: 10,
      },
      tourInfo: {
        padding: 5,
      },
      tourLeader: {
        flexDirection: 'row',
        padding: 5,
      },
      leaderImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight:5
      },
})

export default Planlar;