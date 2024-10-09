// JobAppliedScreen.js

import { faLocationDot, faShareNodes, faSuitcase, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { BookmarkIcon } from '../assets/svg';
import HomeBody from './HomeBody';
import { fonts } from '../../config';
import { SIZES } from '../styles/config';

const JobAppliedScreen = ({navigation,route}) => {
    const [jobs, setJobs] = useState([]);
    const {params} = route;
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        jobDetailsApi()
      },[])
    const jobDetailsApi = useCallback(async (values) => {
        setLoading(true);
        try {
          const response = await axios.get('https://rishijob.com/backend/api/v1/jobs');
  
          setJobs(response.data.data.data)
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



    const renderJobItem = ({item }) => (
        <TouchableOpacity style={styles.item} 
            >
           <View style={{ flexDirection: 'row',justifyContent:'space-between' }}>
        <View style={{width:'90%'}}>
          {/* <Text style={styles.title}>{item.title}</Text> */}
          <Text style={styles.roll}>{item.jobTitle}</Text>
          <Text style={styles.company}>{item.companyName}</Text>
          <Text style={styles.details}>{`Name : ${item.name}` }</Text>
          <Text style={styles.details}>{`Date : ${item.updatedAt}` }</Text>
          <Text style={styles.details}>{`Location : ${item.jobLocation}` }</Text>
          <Text style={styles.details}>{`Phone Number : ${item.phoneNumber}` }</Text>
          <Text style={styles.details}>{`Status : ${item.jobStatus}` }</Text>
          
        </View>
      
      </View>
          </TouchableOpacity>
    );

    return (
        <HomeBody
        navigation={navigation}
        title={'Applied Jobs'}
        postJobDashbord={true}
        isLoading={isLoading}
      >
        <View style={styles.container}>
            <FlatList
                data={jobs}
                extraData={jobs}
                renderItem={renderJobItem}
                keyExtractor={item => item.id}
            />
        </View>
        </HomeBody>
    );
};

const styles = StyleSheet.create({
    container: {
      justifyContent: 'flex-start', // Align items to the top of the container
      marginBottom: "35%",
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

export default JobAppliedScreen;
