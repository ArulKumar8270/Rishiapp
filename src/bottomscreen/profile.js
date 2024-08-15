import { Dimensions, FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PencilIcon } from '../assets/svg';
import { fonts } from '../../config';
import RBSheet from 'react-native-raw-bottom-sheet';
import { SIZES } from '../styles/config';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import axios from 'axios';

const Profile = ({navigation}) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    ProfileDetails();
  }, []);

  const ProfileDetails = useCallback(async () => {
    try {
      const response = await axios.get(`https://rishijob.com/backend/api/v1/customers/id`);
      console.log('API Response:', response.data.data);
      setUserDetails(response.data.data); // Ensure you access the correct data structure
    } catch (error) {
      if (error.response) {
        console.error('Server error:', error.response.data);
        Alert.alert('Error', error.response.data.message || 'An error occurred. Please try again.');
      } else if (error.request) {
        console.error('Network error:', error.request);
        Alert.alert('Error', 'No response from the server. Please check your internet connection and try again.');
      } else {
        console.error('Error:', error.message);
        Alert.alert('Error', 'An error occurred. Please try again.');
      }
    }
  }, []);
  const renderUser = ({ item }) => (
    <View>
      <Text style={styles.Detailtext}>{item.FirstName}</Text>
      <Text style={styles.Detailtext}>{item.Qualification}</Text>
      <Text style={styles.Detailtext}>{item.Gender}</Text>
      <Text style={styles.Detailtext}>{item.MobileNumber}</Text>
      <Text style={styles.Detailtext}>{item.Email}</Text>
      <Text style={styles.Detailtext}>{item.Resume}</Text>
    </View>
  );

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'basic', title: 'Basic Details' },
    { key: 'professional', title: 'Professional Details' }
  ]);

  const BasicDetailsRoute = () => (
    <View style={styles.FlatList}>
      <FlatList
        data={userDetails}
        renderItem={renderUser}
        keyExtractor={item => item.id}
        style={styles.FlatListItems}
      />
    </View>
  );

  const ProfessionalDetailsRoute = () => (
    <View style={styles.professionalDetailsContainer}>
      <Text style={styles.Detailtext}>Professional details content here</Text>
    </View>
  );

  const renderScene = SceneMap({
    basic: BasicDetailsRoute,
    professional: ProfessionalDetailsRoute,
  });

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/Background.png')} style={styles.imageBackground}>
        <Image source={require('../assets/dp.png')} style={styles.dp} />
        <View style={styles.nameContainer}>
          <Text style={styles.text}>firstname</Text>
          <Text style={styles.text}>lastname</Text>
        </View>
        <View style={styles.emailContainer}>
          <View>
            <Text style={styles.text}>email</Text>
            <Text style={styles.text}>mobilenumber</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('ProfileUpdate')}>
            <PencilIcon height={20} width={20} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabbar}
            labelStyle={styles.label} 

          />
        )}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    alignItems: 'center',
    padding: 20,
  },
  dp: {
    width: 80,
    height: 80,
    borderRadius: 40, // corrected to make it circular
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '56%',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  emailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    fontFamily: fonts.CircularStdBlack,
  },
  Detailtext: {
    fontFamily: fonts.CircularStdBook,
    fontSize: SIZES.body1,
    color: '#000',
    marginVertical: 10,
  },
  FlatList: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 20,
    margin: 20,
    borderRadius: 30,
  },
  professionalDetailsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  tabbar: {
    backgroundColor: '#fff',
  },
  indicator: {
    backgroundColor: '#000',
  },
  label: {
    color: '#660000',
    fontFamily: fonts.CircularStdBlack,
  },
});
