import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator,DrawerContentScrollView } from '@react-navigation/drawer'
import CompanyDetails from '../screens/companydetails'
import Dashboard from '../screens/dashbord'

const CustomDrawer = () => {
    const Drawer = createDrawerNavigator()
  return (
    <Drawer.Navigator
      DrawerType='slide'
      overlayColor='transparent'
      drawerStyle={{flex:1,
      width:'65%',
      paddingRight:20,
      backgroundColor:'transparent'}} 
      sceneContainerStyle={{
        backgroundColor:'transparent'
      }}
      initialRouteName='Dashborad'>
        <Drawer.Screen name='CompanyDetails'>
            {props=><Dashboard {...props}/>}
     </Drawer.Screen>

    </Drawer.Navigator>
  )
}

export default CustomDrawer

const styles = StyleSheet.create({})