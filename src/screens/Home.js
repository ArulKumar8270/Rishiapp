import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,SafeAreaView,Dimensions,Button } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { fonts } from '../../config';
import { SIZES, fontSize } from '../styles/config';
 

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.innerContainer}>
 
     

        <Text style={{ fontSize: fontSize.header1, color: '#411004', fontFamily: fonts.CircularStdBlack }}>Welcome Buddy!</Text>
        <Text style={{ color: '#411004',fontFamily: fonts.CircularStdMedium }}>We Help You To Find A Suitable Job For You</Text>
        <Animatable.View animation="slideInUp" style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
        <Image source={require('../assets/chair.jpg')} style={styles.image} />
        </Animatable.View>
        <LinearGradient colors={['#440217', '#CF577D', '#440217']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1.5 }}
          locations={[0, 0.5, 1]}
          style={styles.buttonEmployee}
        >
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: 'white', fontSize: 10, fontFamily: fonts.CircularStdBlack }}>Employee Login</Text>
           </TouchableOpacity></LinearGradient>
           <LinearGradient colors={['#440217', '#CF577D', '#440217']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1.5 }}
          locations={[0, 0.5, 1]}
          style={styles.buttonPostJOB}
        >
          <TouchableOpacity onPress={() => navigation.navigate('Postlogin')}>
            <Text style={{ color: 'white', fontSize: 10, fontFamily: fonts.CircularStdBlack }}>Employer Login</Text>
           </TouchableOpacity></LinearGradient>
           {/* <View style={[{flexDirection:'row',justifyContent:'space-between'}]}>
            <TouchableOpacity><Text style={styles.loginside}>Employee Login</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.loginside}>Post Job</Text></TouchableOpacity>
           </View> */}
      
      <Text id='bottom' style={styles.bottom}>Rishi Job</Text>
      
   </SafeAreaView>

  )
}

const styles = StyleSheet.create({
    innerContainer: {
      flex: 1,
      //justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    width:SIZES.width,
    height:SIZES.height,
    paddingTop:"20%"
    },
  textmain: {
    color: '#411004',
    fontSize: 20,
    fontFamily: 'CircularStd-BookItalic'

  },
  image: {
    height: "405%", 
    width: '81.5%',
    marginTop:'12%',
    marginBottom:'10%'
  },
  buttonEmployee: {
    width: '30%',
    height:30,
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 90,
    marginTop: '90%',
    shadowOffset: { width: -2, height: 4 },
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 6,
    justifyContent:'center'

  },
  buttonPostJOB: {
    width: '30%',
    height:30,
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 90,
    marginTop: '5%',
    shadowOffset: { width: -2, height: 4 },
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 6,
    justifyContent:'center'
  },
  bottom: {
    marginTop:"27%",
    color: '#411004',
    fontWeight: 'bold',
    fontFamily: fonts.CircularStdMedium,
   },
   loginside:{
    fontFamily:fonts.CircularStdBlack, 
    marginHorizontal:20,
    color:'#440217',
    borderBottomWidth:1,
    borderBlockColor:'#440217'
   }

})
export default Home;

