import React, {useState, useEffect} from 'react';
import { TextInput, View, Text, StyleSheet, Image, Button, ScrollView, ImageBackground, Alert } from 'react-native';
import { darkTheme } from '../utils/Theme';
import CustomButton from '../custom-components/CustomButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon_ from 'react-native-vector-icons/MaterialCommunityIcons';
import { Checkbox, Chip } from 'react-native-paper';
import { categoryMap, citiesOfTurkey } from '../utils/ShortNameMaps';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase';


const Plan = ({navigation}) => {

    const [page, setPage ] = useState(1);
    const [type, setType ] = useState(0);
    const [planCity, setPlanCity ] = useState('');
    const [randomCity, setRandomCity ] = useState(false);
    const [categories, setCategories ] = useState([]);
    const [datePickerIsVisible, setDatePickerIsVisible ] = useState(false);
    const [startDate, setStartDate ] = useState(null);
    const [endDate, setEndDate ] = useState(null);
    const [isEndDate, setIsEndDate ] = useState(false);
    const [suggestions, setSuggestions ] = useState([]);
    const [addedStops, setAddedStops ] = useState([]);
    const [planName, setPlanName ] = useState();
    const [isCustom, setIsCustom ] = useState(false);
    const [loading, setLoading ] = useState(false);

    const titleMap = {
        1: 'Plan Türünü Belirle',
        2: 'Detayları Gir',
        3: 'Rotanı Oluştur',
        4: 'İşte Planın!'
    }

    const handleSelectType = (value) => {
        setType(value)        
        setIsCustom(value === 1)
    }

    const handleSelectCat = (cat) => {
        let arr = [...categories];
        if(arr.includes(cat)){
            arr.splice(arr.indexOf(cat), 1)
        }
        else {
            if (arr.length < 6)
                arr.push(cat)
        }
        setCategories(arr)
    }

    const handleRollDice = () => {
        let arr = Object.keys(categoryMap);
        let result = [];
        let maxCount = Math.ceil(Math.random()*6);
        for (i = 0; i < maxCount; i++){
            let key = arr[Math.floor(Math.random() * arr.length)];
            result.push(key)
        }
        setCategories(result)
    } 

    const handleChangeText = (value) => {
        setPlanCity(value)
        if (randomCity)
            setRandomCity(false)
    }

    const onChangeRandomCity = () => {        
        setPlanCity(randomCity ? '' : citiesOfTurkey[Math.floor(Math.random() * citiesOfTurkey.length)])        
        setRandomCity(!randomCity)
    }

    const toggleDatePicker = (value) => {
        setDatePickerIsVisible(value)
    }

    const handleConfirmDate = (value) => {
        if (isEndDate)
            setEndDate(value)
        else
           setStartDate(value)
        
        toggleDatePicker(false)
        //console.log(value.toDateString())
    }

    const getSuggestions = () => {        // Let's fetch the locations based on City and Category
        let arr = []
        const q = query(collection(db, 'places'), where('location', "==", planCity));  // TODO: There is an upper/lowercase problem. Also add category to query.
        return getDocs(q)
          .then(result => {
            result.docs.map(doc => {
              let obj = {...doc.data()}   // Because this damn firestore holds the id outside the table!
              obj.id = doc.id;
              arr.push(obj)
            });
            setSuggestions(arr);
            console.log('locatio: %O', arr)
          })
          .catch(err => console.log(err.toString()))
          .finally(setLoading(false));
      };

    const addStop = (item) => {
        if (!addedStops.includes(item))
            setAddedStops([...addedStops, item])
        setSuggestions(suggestions.filter(i => i.id !== item.id))
    }

    const removeStop = (item) => {
        setAddedStops(addedStops.filter(i => i.id !== item.id))
        if (!suggestions.includes(item))
            setSuggestions([...suggestions, item])
    }

    const submitPlan = () => {
        let routeIds = addedStops.map(i => {return i.id})
        let plan = {
            uid: auth.currentUser.uid,
            name: planName, location: planCity, 
            startDate: startDate,
            endDate: endDate,
            categories: categories, 
            routeIds,
            planPicUrl: addedStops[0].thumbUrl,
            isCustom: isCustom}
        addDoc(collection(db,'plans'), plan).then(
            () => console.log('plan: %O', plan)
        ).catch(err => console.log(err))
        
    }

    const getLowerSection = () => {
        switch (page) {
            case 1 : return (       // Plan türü
                <View>
                    <TouchableOpacity style={[styles.typeContainer, type === 0 && styles.typeContainerSelected ]} onPress={()=>handleSelectType(0)} >
                        <Image source={require('../assets/images/odisea-logo1.png')} style={styles.typeImage} />
                        <View>
                            <Text style={styles.typeTitle}>
                                Önerilen
                            </Text>
                            <Text style={[styles.text, {color:'black'}]}>
                                Sana uygun planı biz oluşturalım, sen düzenle
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.typeContainer, type === 1 && styles.typeContainerSelected ]} onPress={()=>handleSelectType(1)} >
                        <Image source={require('../assets/images/adventure.png')} style={styles.typeImage} />
                        <View>
                            <Text style={styles.typeTitle}>
                                Kendi Planını Yap
                            </Text>
                            <Text style={[styles.text, {color:'black'}]}>
                                İster tek başına, ister arkadaşlarınla gitmek istediğin mekanları ekle ve keşfet.
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.typeContainer, styles.disabled, type === 2 && styles.typeContainerSelected ]} disabled >
                        <Image source={require('../assets/images/odisea-logo1.png')} style={styles.typeImage} />
                        <View>
                            <Text style={styles.typeTitle}>
                                Lider
                            </Text>
                            <Text style={[styles.text, {color:'black'}]}>
                                
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.typeContainer, styles.disabled, type === 3 && styles.typeContainerSelected ]} disabled >
                        <Image source={require('../assets/images/odisea-logo1.png')} style={styles.typeImage} />
                        <View>
                            <Text style={styles.typeTitle}>
                                Komünite Lideri
                            </Text>
                            <Text style={[styles.text, {color:'black'}]}>
                                
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
            
            case 2 : return (       // Detaylar
             <View style={styles.detailsSection}>
                <View style={styles.searchBarContainer}>
                    <Text style={[styles.titleText, {fontSize:16}]}>Planın için şehir belirle*</Text>
                    <View style={styles.searchBar}>
                        <TextInput style={styles.textInput} placeholder='Şehir Ara' value={planCity} onChangeText={handleChangeText} />
                        <Icon name="search" size={28} color={'black'}></Icon>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}} >
                        <Checkbox
                            color="white"
                            status={randomCity ? 'checked' : 'unchecked'}
                            onPress={onChangeRandomCity}
                        />
                        <Text style={styles.text} onPress={onChangeRandomCity} >Yakınımdaki bir konumdan rastgele seç </Text>
                    </View>
                </View>                   
                <View style={styles.themesContainer}>
                    <Text style={[styles.titleText, {fontSize:16}]}>Tema Seç</Text>                    
                    <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
                    <Text style={styles.text}> 
                        En fazla 6 kategori seç veya zar at 
                    </Text>
                    <Icon_ name='dice-multiple' size={24} color={'white'} onPress={handleRollDice} />
                    </View>
                    <View style={styles.chipContainer}>
                        { Object.keys(categoryMap).map( (cat, index) => {return (
                            <Chip key={index} style={categories.includes(cat) ? styles.categoryChipSelected : styles.categoryChip} 
                                  textStyle={[{fontSize: 14, color: 'white', fontFamily:darkTheme.fontLight}]}
                                  onPress={()=>handleSelectCat(cat)}    >
                                <Text style={{fontSize:14, lineHeight:17}}>
                                    {categoryMap[cat]}                                    
                                </Text>
                            </Chip>
                        )})
                        }
                    </View>
                    <View style={styles.searchBarContainer}>
                        <Text style={[styles.titleText, {fontSize: 16}]}>Tarih Belirle </Text>
                        <TouchableOpacity style={styles.dateBarContainer} onPress={()=>{
                            toggleDatePicker(true)
                            setIsEndDate(false)
                            }}  >
                            <TextInput
                                editable={false}
                                style={styles.textInput} placeholder='Başlangıç'
                                value={startDate && startDate.toLocaleDateString()}
                                />
                            <Icon name="calendar-month" size={28} color={'black'}></Icon>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.dateBarContainer} onPress={()=>{
                            toggleDatePicker(true)
                            setIsEndDate(true)
                            }}  >
                            <TextInput
                                editable={false}
                                style={styles.textInput} placeholder='Bitiş'
                                value={endDate && endDate.toLocaleDateString()}
                                />
                            <Icon name="calendar-month" size={28} color={'black'}></Icon>
                        </TouchableOpacity>
                    </View>
                </View>
                <DateTimePickerModal
                    isVisible={datePickerIsVisible}
                    mode="date"
                    onConfirm={handleConfirmDate}
                    onCancel={()=>toggleDatePicker(false)}
                />
             </View>
            )

            case 3: return (        //
                <View>
                    <View style={styles.searchBarContainer}>
                        <Text style={[styles.titleText, {fontSize:16}]}>Plan ismini düzenle</Text>
                        <View style={styles.searchBar}>
                            <TextInput style={styles.textInput} placeholder='Planım' value={planName} onChangeText={(value)=>setPlanName(value)} />
                        </View>
                    </View>
                    <View>
                        { addedStops.map((item, index) => {return (
                            <View key={index} style={styles.suggestionContainer}>
                            <Image source={{uri:item.thumbUrl}} style={styles.typeImage} />
                            <View style={{width:'60%'}}>
                                <Text style={{color: 'black', fontFamily: darkTheme.fontRegular}} >
                                    {item.name}
                                    <Text style={{fontFamily: darkTheme.fontLight, color:'dimgray'}}>
                                        {' '} &sdot; {' '}{item.location}
                                    </Text> 
                                </Text>
                                <Text style={[styles.text, {color:'black'}]} numberOfLines={2}>
                                    {item.body}
                                </Text>
                                <View style={{flexDirection:'row', marginTop:5}}>
                                    { item.categories.map((i, ind) => {return (
                                        <Chip key={ind} style={styles.locationChip}>
                                            <Text style={[styles.text, {fontSize:12, lineHeight:13}]}>{categoryMap[i]}</Text>
                                        </Chip>
                                    )})}
                                </View>
                            </View>
                            <Icon name='close' size={30} style={{alignSelf:'center'}} onPress={()=>removeStop(item)} />
                        </View>
                        )})
                        }
                    </View>
                    <View style={{marginTop:20, alignItems:'flex-start', paddingHorizontal:5 }}>
                        <Text style={[styles.titleText, {fontSize:16, marginBottom:5}]}>İşte senin için seçtiklerimiz</Text>
                        { suggestions.map((item, index) => { return (
                            <View style={styles.suggestionContainer}>
                                <Image source={{uri:item.thumbUrl}} style={styles.typeImage} />
                                <View style={{width:'60%'}}>
                                    <Text style={{color: 'black', fontFamily: darkTheme.fontRegular}} >
                                        {item.name}
                                        <Text style={{fontFamily: darkTheme.fontLight, color:'dimgray'}}>
                                            {' '} &sdot; {' '}{item.location}
                                        </Text> 
                                    </Text>
                                    <Text style={[styles.text, {color:'black'}]} numberOfLines={2}>
                                        {item.body}
                                    </Text>
                                    <View style={{flexDirection:'row', marginTop:5}} >
                                        { item.categories.map((i, ind) => {return (
                                            <Chip key={ind} style={styles.locationChip}>
                                                <Text style={[styles.text, {fontSize:12, lineHeight:13}]}>{categoryMap[i]}</Text>
                                            </Chip>                                            
                                        )})}
                                    </View>
                                    
                                </View>
                                <Icon name='add' size={40} style={{alignSelf:'center'}} onPress={()=>addStop(item)} />
                            </View>) }
                        )
                        }

                    </View>
                </View>
            )

            case 4 : return (
                <View style={styles.planContainer}>
                    <View style={styles.imageContainer}>
                        <ImageBackground source={{uri: addedStops[0].thumbUrl}} style={styles.planImage} imageStyle={{borderRadius:10}} >
                            <View style={styles.planImageFooter}>
                                <Text style={[styles.titleText, {textAlign:'left'}]}>{planName}</Text>
                                <Text style={[styles.text, {}]}> <Icon name='location-on' size={18} /> {planCity} </Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <View>
                        <Text style={[styles.titleText, {textAlign:'left', fontSize:18}]}> Gezilecek noktalar </Text>
                        { addedStops.map((item, index) => {return (
                            <View style={styles.suggestionContainer}>
                            <Image source={{uri:item.thumbUrl}} style={styles.typeImage} />
                            <View style={{width:'80%'}}>
                                <Text style={{color: 'black', fontFamily: darkTheme.fontRegular}} >
                                    {item.name}
                                    <Text style={{fontFamily: darkTheme.fontLight, color:'dimgray'}}>
                                        {' '} &sdot; {' '}{item.location}
                                    </Text> 
                                </Text>
                                <Text style={[styles.text, {color:'black'}]} numberOfLines={2}>
                                    {item.body}
                                </Text>
                            </View>
                        </View>
                        )})
                        }
                    </View>
                </View>
            )

        } 
    }

    const handleNext = () => {
        if (page < 4){
            switch (page){
                case 2:
                    getSuggestions()
                    setPage(page + 1)               
                    break;
                case 3: {
                    if (addedStops.length === 0)
                        Alert.alert('Hata','Rotanıza durak eklemediniz')
                    else {
                        submitPlan()
                        setPage(page + 1)
                    }
                    break;
                }
                default:
                    setPage(page + 1)
                    break;    
            }
            
        }
        else
            navigation.navigate('Planlar')
    }

    const checkFields = () => {
        return (randomCity || planCity !== '')
    }


    return (
      <View style={styles.main}>
        <View style={{width:'100%'}}>
          <View style={{alignItems:'flex-start', flexDirection:'row', paddingHorizontal:5, marginBottom:20}}>
            <Icon name='arrow-back' size={26} style={{color:darkTheme.textColor}} onPress={()=>{
                if (page > 1)
                    setPage(page-1)
                else
                    navigation.goBack()
                }}
                />
          </View>
          <View style={{marginBottom:10}}>
            <Text style={styles.titleText}> {titleMap[page]} </Text>
          </View>
        {     
            getLowerSection()
        }
        </View>
        <CustomButton backgroundColor={darkTheme.primary} title={page < 4 ? 'Devam' : 'Planlarım'} style={{width:'100%', height:50}} 
                      onPress={handleNext} disabled={page === 2 && !checkFields()} />
      </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'black',
        paddingHorizontal: 15,
        paddingVertical:20,
        justifyContent:'space-between',
        alignItems:'center'
      },
    text: {
        color:'white',
        fontFamily: darkTheme.fontLight
    },
    titleText: {
        color:'white',
        fontFamily: darkTheme.fontSemiBold,
        fontSize:20,
        textAlign: 'center'
    },
    typeContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        padding:7,
        marginBottom:10,
    },
    typeContainerSelected: {
        backgroundColor: 'teal'
    },
    disabled: {
        opacity: 0.6
    },
    typeImage: {
        width: 75,
        height: 80,
        borderRadius: 10,
        backgroundColor:'black',
        marginRight: 10
    },
    typeTitle: {
        fontFamily: darkTheme.fontSemiBold,
        fontSize:18,
        color: 'black'
    },
    detailsSection: {
        justifyContent:'flex-start',
        width:'100%',        
    },
    searchBarContainer: {
        width: '100%',
        paddingVertical: 0,
        paddingHorizontal:0,
        alignItems:'flex-start',
        marginVertical:15
      },
    searchBar: {
        flexDirection: 'row',
        width: '100%',
        height: 45,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 35,
        marginTop:5
    },
    textInput: {
        width: '100%',
        fontSize: 18,
        color: 'black'
    },
    themesContainer: {
        marginTop:10,
        paddingHorizontal:0,
        alignItems:'flex-start'
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    categoryChip: {
        backgroundColor:'black',
        borderWidth: 1,
        borderColor: 'white',
        height: 30,
        borderRadius:15,
        marginHorizontal: 3,
        marginVertical:5
    },
    categoryChipSelected: {
        backgroundColor: 'teal',
        borderWidth:0,
        height: 30,
        borderRadius:15,
        marginHorizontal: 4,
        marginVertical: 5
    },
    dateBarContainer: {
        flexDirection: 'row',
        width: '92%',   // I don't know why it became so :)
        height: 45,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop:5
    },
    suggestionContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        padding:10,
        width: '100%',
        justifyContent:'space-between',
        marginTop:10      
    },
    planContainer: {
        backgroundColor: 'dimgray',
        borderRadius: 10,
        padding:10
    },
    imageContainer: {
        marginBottom:15    
    },
    planImage: {
        height: 200,
        justifyContent:'flex-end'
    },
    locationChip: {
        backgroundColor: 'teal',
        borderRadius: 14,
        marginRight: 5,
        paddingTop:4
    },
    planImageFooter: {
        backgroundColor: 'dimgray',
        opacity: 0.7,
        height: '30%',
        padding: 5
    }
    
    
})

export default Plan;