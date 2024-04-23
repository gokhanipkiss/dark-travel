import React, {useEffect, useState} from 'react';
import { Text, StyleSheet, View, SafeAreaView, TextInput, Dimensions, Image, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, Card, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { tags } from '../utils/Tags';
import axios from 'axios';
import {currentUser} from '../App';
import { getLocations, getTours, getUser } from '../firebase';


const Home = () => {

    const [locations, setLocations] = useState([]);
    const [locationsFiltered, setLocationsFiltered] = useState([])
    const [tours, setTours] = useState([]);
    const [toursFiltered, setToursFiltered] = useState([]);
    const [stories, setStories] = useState([]);
    const [loadingLocations, setLoadingLocations ] = useState(true);
    const [loadingTours, setLoadingTours ] = useState(true);
    const [category, setCategory] = useState(tags[0])


    useEffect(() => {
        //console.log("current user : %O", currentUser.value )
        
        _getLocations()
        _getTours()        
    }, []);

    async function _getLocations () {
        let arr = []
        let result = await getLocations();
        if (result.docs){
            result.docs.map(doc => arr.push(doc.data()))
            setLocations(arr)
            setLoadingLocations(false)
            handleClickTag(category)
        }
    }


    async function _getTours () {
        let arr = []
        let result = await getTours();
        if (result.docs){
            result.docs.map(doc => arr.push(doc.data()))
            setTours(arr)
            setLoadingTours(false)
            handleClickTag(category)
        }
    }

    function handleClickTag(title) {
        setCategory(title)

        switch (title){
            case "Trendler":
                setLocationsFiltered(locations.filter(loc => loc.categories.includes("trend")));
                setToursFiltered(tours.filter(tour => tour.categories.includes("trend")));
                break;
            case "Gizemli":
                setLocationsFiltered(locations.filter(loc => loc.categories.includes("myst")))
                setToursFiltered(tours.filter(tour => tour.categories.includes("myst")))
                break;
            case "Bana Yakın":
                setLocationsFiltered(locations.filter(loc => loc.location === currentUser.value.location))
                setToursFiltered(tours.filter(tour => tour.location === currentUser.value.location))
                break;
            case "Güncel":
                setLocationsFiltered(locations)
                setToursFiltered(tours)
                break;
        }
    }

    const {container, text, scrollView, topButtonContainer, searchBarContainer, titleText, searchBar,
        textInput, chipContainer, chip, chipSelected, placesHeader, placesContainer, sectionTitle, locationCard,
        locationImage, locationInfo, toursContainer, toursHeader, tourCard, tourInfo, tourImage,
        tourLeader, leaderImage} = styles

    return (
      <View style={container}>
        <ScrollView contentContainerStyle={scrollView}>
          <View style={topButtonContainer}>

          </View>
          
          <View style={searchBarContainer}>
            <Text style={titleText}>Karanlığa Hoşgeldin</Text>
            <View style={searchBar} >
                <TextInput style={textInput} />
                <Icon name='search' size={28} color={'black'}></Icon>
            </View>
          </View>

          <ScrollView horizontal style={chipContainer}>
            {tags.sort(tag => {return (tag === category) ? -1 : 1}).map( (item, index) => { return (
                <Chip key={index} style={item === category ? chipSelected : chip} 
                        textStyle={{fontSize:16, color:'white'}}  onPress={() => {handleClickTag(item)}}>
                    {item}
                </Chip>)
            }
            )}
          </ScrollView>

          <View style={placesHeader}>
            <Text style={sectionTitle}>
                Rotanı Belirleyecek Konumlar
            </Text>
            <Text style={sectionTitle}>
                <Icon name="chevron-right" color='white' size={26} />
            </Text>
          </View>
          { loadingLocations ?
            <ActivityIndicator /> :
            (<ScrollView horizontal style={placesContainer}>
                {locationsFiltered.map((item, index) => {return (
                    <Card key={index} style={locationCard}>
                        <Image source={require('../assets/images/splash.jpg')} style={locationImage} />
                        <View style={locationInfo}>
                            <Text style={[titleText, {fontSize:16, marginBottom:0}]}>
                                {item.name}
                            </Text>
                            <View style={{flexDirection:'row'}}>
                                <Icon name='location-on' color='teal' size={20}/>
                                <Text style={text}>{item.location}</Text>
                            </View>
                        </View>
                    </Card>
                )})}
            </ScrollView>)
          }

          <View style={placesHeader}>
            <Text style={sectionTitle}>
                Kaşiflerin Birleştiği Turlar
            </Text>
            <Text style={sectionTitle}>
                <Icon name="chevron-right" color='white' size={26} />
            </Text>
          </View>
          { loadingTours ?
            <ActivityIndicator /> :
            (<ScrollView horizontal style={placesContainer}>
                {toursFiltered.map((item, index) => {return (
                    <Card key={index} style={tourCard}>
                        <ImageBackground source={require('../assets/images/splash.jpg')} style={tourImage} borderRadius={10}>
                            <View style={tourLeader}>
                                <Image source={require('../assets/images/avatar4_.jpg')} style={leaderImage} />
                                <View>
                                    <Text style={[titleText, {fontSize:16, marginBottom:0}]}>
                                        {item.leader}                                    
                                    </Text>
                                    <Text style={text}>
                                        {item.leaderTitle}
                                    </Text>
                                </View>
                            </View>
                            <View style={tourInfo}>
                                <Text style={[titleText, {fontSize:16, marginBottom:0}]}> {item.name} </Text>                                
                                <Text style={text}> {item.body} </Text>
                            </View>
                            
                        </ImageBackground>
                    </Card>
                )})}
            </ScrollView>)
          }


          
          

        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color:'white'
    },
    container: {
        flex:1,
        alignItems:'center',
        backgroundColor:'black'
    },
    scrollView: {
        width:Dimensions.get('window').width,
        paddingHorizontal:20
    },
    topButtonContainer:{
        height: 80,
        padding:20
    },
    searchBarContainer: {
        width:'100%',
        paddingVertical: 10,
        
    },
    titleText: {
        textAlign: 'left',        
        fontSize:24,
        fontWeight: 'bold',
        color:'white',
        marginBottom:10
    },
    searchBar: {
        flexDirection:'row',
        flex:1,
        width: '100%',
        height: 45,
        backgroundColor: 'white',
        borderRadius: 15,
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:10,
        paddingRight:35
    },
    textInput: {
        width: '100%',
        fontSize: 18
    },
    chipContainer: {
        paddingVertical: 10,
        flexDirection: 'row'
    },
    chip: {
        height:40,
        borderRadius: 20,
        justifyContent:'center',
        marginRight:10,
        backgroundColor:'transparent',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'white'
    },
    chipSelected: {
        height:40,
        borderRadius: 20,
        justifyContent:'center',
        marginRight:10,
        backgroundColor:'firebrick'
    },
    placesHeader: {
        marginTop:10,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    sectionTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    placesContainer: {
        paddingVertical:10
    },
    locationCard: {
        borderRadius:10,
        width:150,
        height:150,
        backgroundColor: 'gray',
        marginRight:10
    },
    locationImage: {
        width: 150,
        height: 100,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    locationInfo: {
        padding:5
    },
    toursHeader: {
    },
    toursContainer: {

    },
    tourCard: {
        width:200,
        height:240,
        marginRight:10,
        borderRadius:10
    },    
    tourImage: {
        width:'100%',
        height: '100%',
        justifyContent: 'flex-end',
        borderRadius:10
    },
    tourInfo: {
        padding: 5
    },
    tourLeader: {
       flexDirection:'row',
       padding: 5
    },
    leaderImage: {
        width:30,
        height:30,
        borderRadius:15
    }
    
})

export default Home;