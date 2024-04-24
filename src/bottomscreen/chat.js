import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, PermissionsAndroid, Platform, Button } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const App = () => {
  const [currentLongitude, setCurrentLongitude] = useState(null);
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [locationStatus, setLocationStatus] = useState('');

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      position => {
        setLocationStatus('You are Here');
        const { longitude, latitude } = position.coords;
        setCurrentLongitude(longitude);
        setCurrentLatitude(latitude);
        fetchCityName(latitude, longitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const fetchCityName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        'https://maps.googleapis.com/maps/api/geocode/json?address=' + position.latitude + ',' + position.longitude + '&key=' + 'AIzaSyBxhn_OjSzYgB52kpZprW0aONR6IfgNyBk',
      );
      const data = await response.json();
      const addressComponents = data.results[0].address_components;
      let cityName = null;
      for (let component of addressComponents) {
        if (component.types.includes('locality')) {
          cityName = component.long_name;
          break;
        }
      }
      if (cityName) {
        setLocationStatus(`You are in ${cityName}`);
      } else {
        setLocationStatus('City name not found');
      }
    } catch (error) {
      console.error('Error fetching city name:', error);
    }
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      position => {
        setLocationStatus('You are Here');
        const { longitude, latitude } = position.coords;
        setCurrentLongitude(longitude);
        setCurrentLatitude(latitude);
        fetchCityName(latitude, longitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/location.png',
        }}
        style={{ width: 100, height: 100 }}
      />
      <Text style={styles.boldText}>{locationStatus}</Text>
      <Text>Longitude: {currentLongitude || 'loading...'}</Text>
      <Text>Latitude: {currentLatitude || 'loading...'}</Text>
      <View style={{ marginTop: 20 }}>
        <Button title="Refresh" onPress={getOneTimeLocation} />
      </View>
      <Text style={styles.footer}>React Native Geolocation</Text>
      <Text style={styles.footer}>www.aboutreact.com</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    fontSize: 25,
    color: 'red',
    marginVertical: 16,
    textAlign: 'center',
  },
  footer: {
    fontSize: 16,
    textAlign: 'center',
    color: 'grey',
  },
});

export default App;
