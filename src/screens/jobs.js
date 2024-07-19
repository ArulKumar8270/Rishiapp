import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import axios from 'axios'; // Assuming you are using axios for API calls
import HomeBody from './HomeBody';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLocationDot, faShareNodes, faSuitcase, faWallet } from '@fortawesome/free-solid-svg-icons';
import { fonts } from '../../config';
import { SIZES } from '../styles/config';
import { BookmarkIcon } from '../assets/svg';

const Jobs = ({navigation,route}) => {
    const {params} = route;
    console.log('----------000000000-----',params.response.data)
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = useCallback(async (values) => {
    console.log('',values)
    setLoading(true);
    try {
      const response = await axios.get(`https://rishijob.com/backend/api/v1/courses`);
      setLoading(false);
     setJobs(response.data.data.data)
    } catch (error) {
      setLoading(false);
     
        Alert.alert('Login Failed', 'An error occurred. Please try again.');
    }
  }, [navigation, ]);

  const renderJobItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={()=>{
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
    title={'Jobs'}
    jobsHeader ={true}
    isLoading={loading}
  >
      <FlatList
        data={jobs}
        renderItem={renderJobItem}
        keyExtractor={item => item.id} // Assuming `id` is a unique identifier for each job
      />
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

export default Jobs;
