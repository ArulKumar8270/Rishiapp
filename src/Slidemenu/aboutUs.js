import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import configStyle from './configStyle'
import { ScrollView } from 'react-native-gesture-handler'
import { fonts } from '../../config'

const AboutUs = () => {
  return (
    <View style={{flex:1}}>
      <Text style={configStyle.heading1}>About Us</Text>
      <ScrollView style={configStyle.container}>
        <View >
          <Text style={[configStyle.heading2,{textAlign:'center'}]}>Why We are Most Popular</Text>
          <Text style={configStyle.body}>At Rishijobs, our mission is to help people get jobs. We have more than ~13,000 global employees passionately pursuing this purpose and improving the recruitment journey through real stories and data. We foster a collaborative workplace that strives to create the best experience for job seekers.</Text>
           <Image source={require('../assets/jobs.png')} style={configStyle.image}/>
           <View style={styles.table}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Image source={require('../assets/certificate-37-32.png')} style={styles.icon}/>
          <Text style={styles.text}>Trusted & Quality Job</Text>
        </View>
        <View style={styles.cell}>
          <Image source={require('../assets/building-27-32.png')} style={styles.icon}/>
          <Text style={styles.text}>Top Companies</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Image source={require('../assets/money-35-32.png')} style={styles.icon}/>
          <Text style={styles.text}>No Extra Charge</Text>
        </View>
        <View style={styles.cell}>
          <Image source={require('../assets/new-customers-1-32.png')} style={styles.icon}/>
          <Text style={styles.text}>International Job</Text>
        </View>
      </View>
    </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default AboutUs

const styles = StyleSheet.create({
  table: {
    width: '100%',
    padding: 10,
    borderWidth:1,
    borderColor:'#ccc',
    borderRadius:20,
    marginVertical:20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginBottom: 10,
    marginVertical:20,
    
  },
  cell: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight:50,
    marginRight:50
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    fontFamily:fonts.CircularStdBook,
    color:'#273746'

  },
})