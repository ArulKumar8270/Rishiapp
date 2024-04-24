import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, TouchableOpacity, View } from 'react-native';
//import Homee from './bottomscreen/home';
import Notify from '../bottomscreen/notify';
import Chat from '../bottomscreen/chat';
import Profile from '../bottomscreen/profile';
import Dashboard from './dashbord';
import Home from './Home';
import Post from './post';
//import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
 

const 
Bottomtab = ({navigation}) => {
  return (
    <Tab.Navigator screenOptions={{tabBarShowLabel:false,headerShown:false}}>
        <Tab.Screen name="Home" component={Home} options={{
      tabBarIcon: ({ focused, color, size }) => (
        <Image
          source={focused ? require('../assets/home.png') : require('../assets/home.png')}
          style={{ width: size * 0.7, height: size * 0.7, tintColor: color  }}
        />
      ),
    }}/>
        {/* <Tab.Screen name="Chat" component={Chat} options={{
      tabBarIcon: ({ focused, color, size }) => (
        <Image
          source={focused ? require('../assets/message.png') : require('../assets/message.png')}
          style={{ width: size * 0.81, height: size * 0.8, tintColor: color  }}
        />

      ), 

    }}/> */}
  
        <Tab.Screen name='Notification' component={Notify}options={{
          
      tabBarIcon: ({ focused, color, size }) => (
        <Image
          source={focused ? require('../assets/notification.png') : require('../assets/notification.png')}
          style={{ width: size * 0.7, height: size * 0.8, tintColor: color  }}
        />
      ),
    }}/>
        <Tab.Screen name="Profile" component={Profile} options={{
      tabBarIcon: ({ focused, color, size }) => (
        <Image
          source={focused ? require('../assets/profileimage.png') : require('../assets/profileimage.png')}
          style={{ width: size * 0.7, height: size * 0.75, tintColor: color  }}
        />
      ),
    }}/>
    </Tab.Navigator>
    );
};
export default Bottomtab;  
