import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TextInput, TouchableOpacity,Image,Dimensions,PermissionsAndroid, Alert,Linking} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'; // Corrected icon import
import HomeBody from './HomeBody';
import { fonts } from "../../config";
import { faShareNodes } from '@fortawesome/free-solid-svg-icons/faShareNodes';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot';
import { faWallet } from '@fortawesome/free-solid-svg-icons/faWallet';
import { faSuitcase } from '@fortawesome/free-solid-svg-icons/faSuitcase';
import { SIZES, fontSize } from '../styles/config';
import { MaterialIcons } from '@expo/vector-icons';
import { RateingIcon,Rate, BookmarkIcon, BackIcon, CurrentLocation } from '../assets/svg';
import { Drawer } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import RowBottomsheetContent from './rbsheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import { CustomTextInput } from '../assets/textinput';
import Geolocation from '@react-native-community/geolocation';
import { err } from 'react-native-svg';
import axios from 'axios';

const Dashboard = ({ navigation }) => {
  const searchsheet=useRef();
  const windowHeight = Dimensions.get('window').height;
  const [dataValue, setDataValue] = useState(null)
  const initialData = [
    {
      key: '1',
      title: 'Item 1',
      Role:'UI/UX designer',
      company: 'Zoho',
      experience: '3 years',
      image: require('../assets/zoho.png'),
      rateing: require('../assets/rate.png'),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat, diam eget pellentesque luctus.',
      salarydetails:'3-4 Lacs PA',
      Opennings:'No of oppenings',
      location:'Chennai',
      salaryPA:'20,00,000',
      interviewType:'Walk-in',
      MustSkill:'html,css,javascript,bootstrap',
      BasicSkills:'Knowledge of front end frameworks/libraries : Next.js,React.js , JavaScript/CSResponsive design to support different deviceKnowledge of Rest APICI/CD experience',
      IndustryType:'IT services & Consulting',
      Department:'Role of Department',
      EmploymentType:'Fulltime',
      Education:'MCA ,Msc,computer science, BE computer sceience'
    },

    {
      key: '2',
      title: 'Item 2',
      Role: 'Front-end devloper',
      company: 'Zoho',
      experience: '3 years',
      image: require('../assets/zoho.png'),
      rateing: require('../assets/rate.png'),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat, diam eget pellentesque luctus.',
      salarydetails:'3-4 Lacs PA',
      Opennings:'No of oppenings',
      location:'madurai',
      salaryPA:'00,00,000',
      interviewType:'Walk-in',
      MustSkill:'MustSkill',
      BasicSkills:'Basicskills',
      IndustryType:'IT services & Consulting',
      Department:'Role of Department',
      EmploymentType:'Fulltime',
      Education:'MCA ,Msc,computer science, BE computer sceience'
    },
    {
      key: '3',
      title: 'Item 3',
      Role: 'React devloper',
      company: 'Zoho',
      experience: '3 years',
      image: require('../assets/zoho.png'),
      rateing: require('../assets/rate.png'),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat, diam eget pellentesque luctus.',
      salarydetails:'3-4 Lacs PA',
      Opennings:'No of oppenings',
      location:'banglore',
      salaryPA:'00,00,000',
      interviewType:'Walk-in',
      MustSkill:'MustSkill',
      BasicSkills:'Basicskills',
      IndustryType:'IT services & Consulting',
      Department:'Role of Department',
      EmploymentType:'Fulltime',
      Education:'MCA ,Msc,computer science, BE computer sceience'
    },
    {
      key: '4',
      title: 'Item 4',
      Role: 'react-native devloper',
      company: 'Zoho',
      experience: '3 years',
      image: require('../assets/zoho.png'),
      rateing: require('../assets/rate.png'),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat, diam eget pellentesque luctus.',
      salarydetails:'3-4 Lacs PA',
      Opennings:'No of oppenings',
      location:'chennai',
      salaryPA:'00,00,000',
      interviewType:'Walk-in',
      MustSkill:'MustSkill',
      BasicSkills:'Basicskills',
      IndustryType:'IT services & Consulting',
      Department:'Role of Department',
      EmploymentType:'Fulltime',
      Education:'MCA ,Msc,computer science, BE computer sceience'
    },
    {
      key: '5',
      title: 'Item 5',
      Role: 'Digital Marketing',
      company: 'Zoho',
      experience: '3 years',
      image: require('../assets/zoho.png'),
      rateing: require('../assets/rate.png'),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat, diam eget pellentesque luctus.',
      salarydetails:'3-4 Lacs PA',
      Opennings:'No of oppenings',
      location:'banglore',
      salaryPA:'00,00,000',
      interviewType:'Walk-in',
      MustSkill:'MustSkill',
      BasicSkills:'Basicskills',
      IndustryType:'IT services & Consulting',
      Department:'Role of Department',
      EmploymentType:'Fulltime',
      Education:'MCA ,Msc,computer science, BE computer sceience'
    },
    {
      key: '6',
      title: 'Item 6',
      Role: 'web design',
      experience: '3 years',
      company: 'Zoho',
      image: require('../assets/zoho.png'),
      rateing: require('../assets/rate.png'),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat, diam eget pellentesque luctus.',
      salarydetails:'3-4 Lacs PA',
      experience:'experience',
      Opennings:'No of oppenings',
      location:'chennai',
      salaryPA:'00,00,000',
      interviewType:'Walk-in',
      MustSkill:'MustSkill',
      BasicSkills:'Basicskills',
      IndustryType:'IT services & Consulting',
      Department:'Role of Department',
      EmploymentType:'Fulltime',
      Education:'MCA ,Msc,computer science, BE computer sceience'
    },
    {
      key: '7',
      title: 'Item 7',
      Role: 'sales engineer',
      experience: '3 years',
      company: 'Zoho',
      image: require('../assets/zoho.png'),
      rateing: require('../assets/rate.png'),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat, diam eget pellentesque luctus.',
      salarydetails:'3-4 Lacs PA',
      experience:'experience',
    Opennings:'No of oppenings',
    location:'coaimbatore',
    salaryPA:'00,00,000',
    interviewType:'Walk-in',
    MustSkill:'MustSkill',
    BasicSkills:'Basicskills',
    IndustryType:'IT services & Consulting',
      Department:'Role of Department',
      EmploymentType:'Fulltime',
      Education:'MCA ,Msc,computer science, BE computer sceience'
    },
    {
      key: '8',
      title: 'Item 8',
      Role: 'project associator',
      experience: '3 years',
      company: 'Zoho',
      image: require('../assets/zoho.png'),
      rateing: require('../assets/rate.png'),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat, diam eget pellentesque luctus.',
      salarydetails:'3-4 Lacs PA',experience:'experience',
      Opennings:'No of oppenings',
      location:'ooty',
      salaryPA:'00,00,000',
      interviewType:'Walk-in',
      MustSkill:'MustSkill',
      BasicSkills:'Basicskills',
      IndustryType:'IT services & Consulting',
      Department:'Role of Department',
      EmploymentType:'Fulltime',
      Education:'MCA ,Msc,computer science, BE computer sceience'
    }
  ];
  // const validData = [{ key: '1', title: 'Job Applied', color: '#2E86C1' },
  // { key: '2', title: 'Interview', color: '#F06292' }]

  const [data, setData] = useState(dataValue);
  const [searchLocation, setSearchLocation] = useState('');
  const [searchText, setSearchText] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [fullTimeCheckBox, setFullTimeCheckBox] = useState(false);
  const [partTimeCheckBox, setPartTimeCheckBox] = useState(false);
  const [fullPartTimeCheckBox, setFullPartTimeCheckBox] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [filterData, setFilterData]=useState(dataValue)
  const [currentLocation, setCurrentLocation] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  // Function to get permission for location
  const requestLocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Cool Photo App Location Permission',
                message: 'Cool Photo App needs access to your Location',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location permission granted');
            setPermissionGranted(true);
            getCurrentLocation();
        } else {
            console.log('Location permission denied');
            setPermissionGranted(false);
            Alert.alert('Location Permission Denied', 'Please enable location permission to use this feature.');
        }
    } catch (err) {
        console.warn(err);
    }
};

const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation({ latitude, longitude });
            console.log('Current location:', latitude, longitude);
        },
        error => {
            console.error('Error getting current position:', error);
            Alert.alert('Error', error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
};

const jobDetailsApi = useCallback(async (values) => {
  setLoading(true);
  try {
    const response = await axios.get('https://rishijob.com/backend/api/v1/jobs');
    console.log('=================',response.data)
    setDataValue(response.data.data.data)
    setLoading(false);
  } catch (error) {
    setLoading(false);
   

    if (error.response) {
      // Server responded with a status other than 200 range
      console.error('Server error:', error.response.data);
      Alert.alert('Login Failed', error.response.data.message || 'An error occurred. Please try again.');
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network error:', error.request);
      Alert.alert('Login Failed', 'No response from the server. Please check your internet connection and try again.');
    } else {
      // Something else happened in setting up the request
      console.error('Error:', error.message);
      Alert.alert('Login Failed', 'An error occurred. Please try again.');
    }
  }
}, [navigation]);
useEffect(() => {
  jobDetailsApi()
},[])

const openMaps = () => {
    if (currentLocation) {
        const { latitude, longitude } = currentLocation;
        const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        Linking.openURL(url);
    } else {
        Alert.alert('Location not available', 'Please enable location to use this feature.');
    }
};

//function of search
  const handleSearch = (text,location) => {
    setData(text);
    setSearchLocation(location);
    const filtered = dataValue.filter(item =>
      item.Role.toLowerCase().includes(text.toLowerCase()) &&
      item.location.toLowerCase().includes(location.toLowerCase())
    );
    setFilterData(filtered);
  };
  useEffect(() => {
    setFilterData(dataValue);
  }, []);
  const handleSearchPress = () => {
    // Perform search logic here, if needed
    // For now, let's just call handleSearch with the current value of 'data'
    handleSearch(data, searchLocation);
    searchsheet.current.close()
  };

  const renderdata = ({ item }) => (
    <View style={styles.validcontainer}>
      <Text style={[styles.valid, { backgroundColor: item.color }]}>{item.title}</Text>
    </View>
  )
  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    // Clear the timer on unmount to avoid memory leaks
    return () => clearTimeout(timer);
  }, []);
  const renderItem = ({ item }) => (
   
    <TouchableOpacity style={styles.item} onPress={()=>{
      navigation.navigate('CompanyDetails',{item})
  }
      }>
      <View style={{ flexDirection: 'row',justifyContent:'space-between' }}>
        <View style={{width:'90%'}}>
          {/* <Text style={styles.title}>{item.title}</Text> */}
          <Text style={styles.roll}>{item.jobTitle}</Text>
          <Text style={styles.company}>{item.companyName}</Text>
          <Text style={styles.details}>{item.companyName}</Text>
          <View style={styles.description}><FontAwesomeIcon icon={faLocationDot} color='#808B96'/><Text style={styles.details}>{item.jobLocation}</Text></View>
          <View style={styles.description}><FontAwesomeIcon icon={faSuitcase} color='#808B96'/><Text style={styles.details}>{item.experience}</Text></View>
          <View style={styles.description}><FontAwesomeIcon icon={faWallet} color='#808B96'/><Text style={styles.details}>{item.salarydetails}</Text></View>
        </View>
        <View style={{flexDirection:'column', justifyContent:'space-between'}}>
          <Image source={item.image} style={styles.logo} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <TouchableOpacity><View><FontAwesomeIcon icon={faShareNodes} /></View></TouchableOpacity>
            <TouchableOpacity><View><BookmarkIcon height={20} width={20} color={'#2C3E50'}/></View></TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );


  return (
    <HomeBody
      navigation={navigation}
      mainDashbord={true}
      title={'Dashboard'}
      isMainPage={true}
      isLoading={isLoading}
    >
      <TouchableOpacity onPress={()=>searchsheet.current.open()} activeOpacity={1}>
      <View style={[styles.searchContainer, isSearchFocused && styles.searchContainerFocused]}>
        <FontAwesomeIcon icon={faSearch} size={20} style={styles.searchIcon} />
        <Text>search here...</Text>
   
       
      </View>
      </TouchableOpacity>
      <RBSheet
        ref={searchsheet}
        height={windowHeight}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}>
          <View style={styles.searchbottomsheet}>
            <TouchableOpacity onPress={()=>searchsheet.current.close()} style={{marginVertical:20}}><BackIcon color={'#000'} height={25} width={25}/></TouchableOpacity>
            <Text style={{fontFamily:fonts.CircularStdMedium,fontSize:SIZES.body1,color:'#440217'}}>
              Search jobs and companies here
            </Text>
            <CustomTextInput
            placeholder={'search jobs'}
            inputStyle={{fontFamily:fonts.CircularStdBook,fontSize:SIZES.body2}}
            value={data}
            onChangeText={text => handleSearch(text, searchLocation)}/> 
            <CustomTextInput
            placeholder={'Location'}
            inputStyle={{fontFamily:fonts.CircularStdBook,fontSize:SIZES.body2}}
            onChangeText={location => handleSearch(data, location)}
            value={searchLocation}
            />
            <TouchableOpacity style={{flexDirection:'row',marginBottom:'10%'}} onPress={requestLocationPermission} ><CurrentLocation height={22} width={22} style={{marginHorizontal:5}}/><Text style={{color:'red',fontFamily:fonts.CircularStdMedium,fontSize:SIZES.body2}}>Current Location</Text></TouchableOpacity>
             <TouchableOpacity style={styles.button} onPress={handleSearchPress}><Text style={{ fontFamily: fonts.CircularStdMedium, color: '#fff' }}>search</Text></TouchableOpacity>
          </View>
          </RBSheet>
      

      
      <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10,width:'94%'}}>
      <View style={{ marginLeft: '5%' ,borderWidth:1,borderRadius:5,padding:20,paddingHorizontal:35,backgroundColor:"#440217"}}>
          <Text style={{ fontFamily: fonts.CircularStdBook, color: '#fff' }}>Job Applied</Text>
        </View>
        <View style={{ marginLeft: '5%' ,borderWidth:1,borderRadius:5,padding:20,paddingHorizontal:43,backgroundColor:"#440217"}}>
          <Text style={{ fontFamily: fonts.CircularStdBook, color: '#fff' }}>Interview</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '2%', marginBottom: '2%' }}>
        <TouchableOpacity style={{ marginLeft: '5%' }}>
          <Text style={{ fontFamily: fonts.CircularStdBook, color: 'black' }}>Recomended for you</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginRight: '5%' }}>
          <Text style={{ fontFamily: fonts.CircularStdBook, color: 'black' }}>more</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.container}>
         <FlatList
            data={ filterData|| dataValue}
            extraData={filterData || dataValue}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
            contentContainerStyle={styles.flatListContent}
          />
        </View>
      </ScrollView>
      
    </HomeBody>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start', // Align items to the top of the container
    marginBottom: '70%',
  },
  item: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#5DADE2',
    // Make the logo image round
  },
  rate:{
    width: 15,
    height: 15,
   borderColor:'black',
   borderWidth:2
  },
  title: {
    //marginTop:-50,
    fontSize: 16,
    fontFamily: fonts.CircularStdBook,
    marginBottom: 5,
  },
  roll: {
    fontSize: SIZES.h1,
    fontFamily: fonts.CircularStdBlack,
    color: '#555',
    marginBottom: 5,
  },
  details: {
    fontSize: SIZES.body3,
    fontFamily: fonts.CircularStdBook,
    color: '#555',
    marginBottom: 5,
    marginLeft:4
  },

  company: {
    fontSize: SIZES.h2,
    fontFamily: fonts.CircularStdBlack,
    color: '#555',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    fontFamily: fonts.CircularStdBook,
    color: '#777',
  },
  validcontainer: {
    flex: 1,
    alignItems: "center",
    marginTop: '1%',
    //margin: 8,
    marginLeft: '5%',
    marginRight: "5%",

  },
  valid: {
    backgroundColor: '#B2BABB',
    color: '#fff',
    fontFamily: fonts.CircularStdBlack,
    paddingVertical: '20%',
    paddingHorizontal: '10%',
    width: '100%',
    textAlign: 'center',
    borderRadius: 20,
  },
  flatListContent: {
    flexGrow: 1, // Allow FlatList to take up all available space
    justifyContent: 'flex-start', // Align items to the top of the FlatList
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '3%',
    marginLeft: '6%',
    marginRight: '5%',
    marginBottom: '2%',

  },
  checkboxLabel: {
    marginLeft: '2%',
    marginRight: '1%',
    fontFamily: fonts.CircularStdBook
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '1%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: '3%',
    paddingHorizontal: '2%',
    backgroundColor: '#D7DBDD',
    width: '90%',
    alignSelf: 'center',
    //justifyContent: 'center',
    fontFamily: fonts.CircularStdBook
  },
  searchbottomsheet:{
    flex:1,
    padding:15,
    //alignItems:'center'
  },
  searchContainerFocused: {
    backgroundColor: '#fff',
    borderColor: '#3498DB'
  },
  searchIcon: {
    color: 'gray',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  description:{
    flexDirection:'row',
  },
  button: {
    backgroundColor: '#0277BD',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
  }
});

export default Dashboard;
