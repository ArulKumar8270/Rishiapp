import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Sucsuss } from '../assets'
import { fonts } from '../../config'
import { SIZES } from '../styles/config'


const AppliedSucsuss = ({navigation}) => {
 useEffect(()=>{
  setTimeout(()=>{
    navigation.navigate('Dashbord')
    },2000)
  })
  return (
    <ImageBackground source={require('../assets/Background.png')} style={styles.Container}>
      <View
        style={{
          height: '50%',
          width: '70%', 
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius:50,
          elevation: 5, // Add elevation for shadow effect
          shadowColor: '#000', // Shadow color
          shadowOffset: { width: 0, height: 2 }, // Shadow offset
          shadowOpacity: 5.25, // Shadow opacity
          shadowRadius: 3.84, // Shadow radius
        }}>
        <Image source={Sucsuss} style={{ height: 200, width: 200 ,marginTop:-40}} />
        <Text style={{marginTop:-30, color:'#28B463',fontFamily:fonts.CircularStdBlack, fontSize:SIZES.h2}}>
          Applied Sucsussfully
        </Text>
      </View>
    </ImageBackground>
  )
}

export default AppliedSucsuss

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})