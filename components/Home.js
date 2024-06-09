import React, {useEffect, useState} from 'react';
import { Text, StyleSheet, View, SafeAreaView, TextInput, Dimensions, Image, ImageBackground } from 'react-native';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, Card, Chip, ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { tags } from '../utils/Tags';
import { userAddnlInfo} from '../App';
import {  auth, placesRef, toursRef, storiesRef, db } from '../firebase';
import { _screen } from '../utils/Urls';
import { categoryMap, personaMap } from '../utils/ShortNameMaps';
import { collection, getDocs } from 'firebase/firestore';
import { darkTheme } from '../utils/Theme';
import { useFocusEffect } from '@react-navigation/native';


const Home = ({navigation, route}) => {

    const [locations, setLocations] = useState([]);
    const [locationsFiltered, setLocationsFiltered] = useState([])
    const [tours, setTours] = useState([]);
    const [toursFiltered, setToursFiltered] = useState([]);
    const [stories, setStories] = useState([]);
    const [storiesFiltered, setStoriesFiltered] = useState([]);
    const [loadingLocations, setLoadingLocations ] = useState(true);
    const [loadingTours, setLoadingTours ] = useState(true);
    const [loadingStories, setLoadingStories ] = useState(true);
    const [notifications, setNotifications ] = useState([]);  // only unread notifications actually
    const [category, setCategory] = useState(tags[0])
    const [refreshing, setRefreshing] = useState(false)
    const [persona, setPersona ] = useState(userAddnlInfo.value.persona);
    

    useFocusEffect(
      React.useCallback(()=>{
        getNotifications()
      }, [route]
      )
    )

    useFocusEffect(
      React.useCallback(()=>{
        setPersona(userAddnlInfo.value.persona)
      }, [userAddnlInfo.value.persona]
      )
    )
    
    useEffect(() => {         // Apparently this does not run on each navigate between tabs, but the above ones do        
        getStories()
        getLocations()
        getTours()
        getNotifications()
    }, []);

    useEffect(()=> {
      handleClickTag(category)
    }, [locations, tours, stories])

    
    const getLocations = () => {
      let arr = []
      return getDocs(placesRef)
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
      return getDocs(toursRef)
        .then(result => {
          result.docs.map(doc => arr.push(doc.data()));
          setTours(arr);
        })
        .catch(err => console.log(err.toString()))
        .finally(setLoadingTours(false));
    };

    const getStories = () => {
      let arr = []
      return getDocs(storiesRef)
        .then(result => {
          result.docs.map(doc => arr.push(doc.data()));
          setStories(arr);
        })
        .catch(err => console.log(err.toString()))
        .finally(setLoadingStories(false));
    };

    const getNotifications = () => {
      getDocs(collection(db, 'users/' + auth.currentUser.uid + '/notifications'))
        .then(snapshot => {
          let arr = []
          snapshot.forEach(
            s => {
              if(s.data().unread)
                arr.push(s.data())
            }
          )
          setNotifications(arr)
        })
        .catch(err => console.log(err.toString()));
    }

    function handleClickTag(title) {
        setCategory(title)

        switch (title){
            case "Trendler":
                setLocationsFiltered(locations.filter(loc => loc.categories.includes("trend")));
                setToursFiltered(tours.filter(tour => tour.categories.includes("trend")));
                setStoriesFiltered(stories.filter(story => story.categories.includes('trend')))
                break;
            case "Gizemli":
                setLocationsFiltered(locations.filter(loc => loc.categories.includes("myst")))
                setToursFiltered(tours.filter(tour => tour.categories.includes("myst")))
                setStoriesFiltered(stories.filter(story => story.categories.includes('myst')))
                break;
            case "Bana Yakın":
                setLocationsFiltered(locations.filter(loc => loc.location === userAddnlInfo.value.location))
                setToursFiltered(tours.filter(tour => tour.location === userAddnlInfo.value.location))
                setStoriesFiltered(stories.filter(story => story.location === userAddnlInfo.value.location))
                break;
            case "Güncel":
                setLocationsFiltered(locations)
                setToursFiltered(tours)
                setStoriesFiltered(stories)
                break;
        }
    }

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);      
    }, []);

     useEffect(() => {
       if (refreshing){ 
        Promise.all([getLocations(), getStories(), getTours(), getNotifications()]).finally(setRefreshing(false))
       }        
     }, [refreshing]);

    const {container, text, scrollView, topButtonContainer, searchBarContainer, titleText, searchBar,
        textInput, chipContainer, chip, chipSelected, placesHeader, placesContainer, sectionTitle, locationCard,
        locationImage, locationInfo, toursContainer, toursHeader, tourCard, tourInfo, tourImage,
        tourLeader, leaderImage, storyCard, storyChip} = styles

    return (
      <View style={container}>
        <ScrollView contentContainerStyle={scrollView} showsVerticalScrollIndicator={false} 
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} /* progressBackgroundColor='black' colors={['white','gray']} */  />} >
          <ImageBackground
            blurRadius={2}
            style={{width: '110%'}}
            imageStyle={{left: -30, bottom: -80, opacity:0.7}}
            source={(persona === 'myst') ? require('../assets/images/persona-myst.png') : persona === 'hist' ? require('../assets/images/persona-hist.png') : require('../assets/images/persona-adv.png')}>
            <View style={topButtonContainer}>
              <Image source={require('../assets/images/odisea-logo1.png')} style={{width:28, height:40, marginBottom:4}} resizeMode='contain' />
              <View>
                <Text style={[text]} onPress={() => {navigation.push('Bildirimler')}}>
                  <Icon name={'notifications-none'} size={36} style={{position:'absolute', top:0, left:0}} />
                </Text>
                {notifications.length > 0 && <View style={styles.blueDot}></View> }
              </View>
            </View>
          </ImageBackground>

          <View style={searchBarContainer}>
            <Text style={titleText}>Karanlığa Hoşgeldin</Text>
            <View style={searchBar}>
              <TextInput style={textInput} />
              <Icon name="search" size={28} color={'black'}></Icon>
            </View>
          </View>

          <View style={{paddingLeft:15}}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={chipContainer}>
              {tags
                .sort(tag => {
                  return tag === category ? -1 : 1;
                })
                .map((item, index) => {
                  return (
                    <Chip
                      key={index}
                      style={item === category ? chipSelected : chip}
                      textStyle={[{fontSize: 14, color: darkTheme.textColor, fontFamily:'Lexend-SemiBold'}]}
                      onPress={() => {
                        handleClickTag(item);
                      }}>
                      {item}
                    </Chip>
                  );
                })}
            </ScrollView>

            <HeaderSection titleText="Rotanı Belirleyecek Konumlar" />
            {loadingLocations ? (
              <ActivityIndicator />
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={placesContainer}>
                {locationsFiltered.map((item, index) => {
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

            <HeaderSection titleText="Kaşiflerin Birleştiği Turlar" />

            {loadingTours ? (
              <ActivityIndicator />
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={placesContainer}>
                {toursFiltered.map((item, index) => {
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

            <HeaderSection titleText="Karanlık Hikayeler" />
            {loadingStories ? (
              <ActivityIndicator />
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={placesContainer}>
                {storiesFiltered.map((item, index) => {
                  return (
                    <Card key={index} style={storyCard}>
                      <View style={{height: '50%'}}>
                        <Image
                          source={{uri: item.thumbUrl}}
                          style={[locationImage, {height: '100%'}]}
                        />
                      </View>
                      <View style={{padding: 5, height: '50%'}}>
                        <View style={{height: '67%', overflow: 'hidden'}}>
                          <Text
                            style={[
                              titleText,
                              {fontSize: 16, marginBottom: 0},
                            ]}>
                            {item.name}
                          </Text>
                          <Text numberOfLines={2} style={text}>
                            {item.body}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            height: 'auto',
                            marginVertical: 5,
                            alignItems: 'center'
                          }}>
                          {item.categories.map((category, ind) => {
                            return (
                              <Chip
                                key={ind}
                                style={storyChip}
                                textStyle={{
                                  fontSize: 10,
                                  color: darkTheme.textColor,
                                  fontFamily: 'Lexend-Light'
                                }}>
                                {categoryMap[category]}
                              </Chip>
                            );
                          })}
                        </View>
                      </View>
                    </Card>
                  );
                })}
              </ScrollView>
            )}
          </View>

          <View style={styles.missionsContainer}>
            <HeaderSection titleText="Görevler" />
            <Image
              style={styles.missionImage}
              source={require('../assets/images/splash.jpg')}
            />
            <Text style={[text, {textAlign: 'center', fontSize:14}]}>
              Topluluk liderleri tarafından düzenlenen 10 etkinliğe katıl
            </Text>
            <ProgressBar
              /* Bu çok kötü, kullanmayalım */ visible={false}
              style={{height: 20, borderRadius: 10}}
              progress={0.7}
              color={darkTheme.primary}
            />

            <Card /* yerine bunu yaptım */ style={styles.missionBar}>
              <Text style={styles.missionBarText}>7/10</Text>
              <Card style={styles.missionBarFill}></Card>
            </Card>
          </View>
        </ScrollView>
      </View>
    );
}

export const HeaderSection = (props) => { return (
    <View style={styles.placesHeader}>
    <Text style={styles.sectionTitle} onPress={props.onPress}> {props.titleText} </Text>
    <Text style={styles.sectionTitle}>
      <Icon name="chevron-right" color="white" size={26} />
    </Text>
  </View>
)}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    textShadowColor: 'rgb(50,50,50)',
    textShadowRadius: 10,
    fontFamily: 'Lexend-Light',
    fontSize:12
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  scrollView: {
    width: _screen.width
  },
  topButtonContainer: {
    height: 70,
    width: '90%',
    paddingHorizontal:10,
    flexDirection:'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  searchBarContainer: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal:15
  },
  titleText: {
    textAlign: 'left',
    fontSize: 24,
    fontFamily: 'Lexend-SemiBold',
    color: 'white',
    marginBottom: 5,
  },
  searchBar: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    height: 45,
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 35,
  },
  textInput: {
    width: '100%',
    fontSize: 18,
    color: 'black'
  },
  chipContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  chip: {
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'white',
  },
  chipSelected: {
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: darkTheme.primary,
  },
  placesHeader: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Lexend-SemiBold'
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
  storyCard: {
    borderRadius: 10,
    width: 160,
    height: 240,
    backgroundColor: 'gray',
    marginRight: 10,
    flex: 1,
    flexDirection: 'column',
  },
  storyChip: {
    borderRadius:16,  // Bunu ortaya çıkan sonuca göre verdim, height verirsek text align sorunu çıkarıyor Chip
    marginRight: 5,
    backgroundColor: 'teal',
    flexShrink:1,
  },
  missionsContainer: {
    height: 350,
    backgroundColor: 'rgb(60, 60, 60)',
    padding: 10,
  },
  missionImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: darkTheme.primary,
    borderWidth: 2,
    marginVertical: 20,
    alignSelf: 'center',
  },
  missionBar: {
    width: _screen.width * 0.9,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'black',
    alignSelf: 'center',
  },
  missionBarFill: {
    position: 'absolute',
    left: 0,
    width: '70%',
    height: '100%',
    backgroundColor: darkTheme.primary,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  missionBarText: {
    zIndex: 1000,
    textAlign: 'center',
    color: 'white',
  },
  blueDot:{
    backgroundColor: darkTheme.primary, 
    width:12, 
    height:12, 
    position:'absolute', 
    left:2, 
    top:2, 
    borderRadius:6
  }
});

export default Home;